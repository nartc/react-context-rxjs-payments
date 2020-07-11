import React, { memo } from 'react';
import { Payment } from '../models/Payment';
import { TableConfig } from '../models/TableConfig';
import { Button, Table } from 'antd';
import { ColumnsType, ColumnType } from 'antd/lib/table';

interface Props {
  payments: Payment[];
  tableConfig: TableConfig<Payment>;
  onPay?: (payment: Payment) => () => void;
}

export const PaymentsTable: React.FC<Props> = memo(
  ({ payments, tableConfig, onPay }) => {
    const columnsRef = React.useRef<ColumnsType<Payment>>(
      tableConfig.columns
        .filter((col) => col.display)
        .map((col) => {
          const column: ColumnType<Payment> = {
            title: col.displayName,
            dataIndex: col.fieldName,
            key: col.fieldName,
            sorter: col.sorter.enabled
              ? (a, b) => {
                  if (col.sorter.sortField) {
                    const { sortField, sortMeta } = col.sorter;
                    if (sortMeta) {
                      return (
                        (a as any)[sortField][sortMeta] -
                        (b as any)[sortField][sortMeta]
                      );
                    }
                    return (a as any)[sortField] - (b as any)[sortField];
                  }
                  return (a as any)[col.fieldName] - (b as any)[col.fieldName];
                }
              : false,
            defaultSortOrder: col.sorter.defaultOrder,
          };

          if (col.filter.enabled) {
            const uniqueValues = [
              ...new Set(
                payments.map((p) => p[col.fieldName as keyof Payment]),
              ),
            ];
            column.filters = uniqueValues.map((val) => ({
              text: val,
              value: val,
            }));
            column.onFilter = (value, record) =>
              (record[col.fieldName as keyof Payment] as any).indexOf(value) ===
              0;
          }

          return column;
        }),
    );

    if (tableConfig.paymentEnabled) {
      columnsRef.current.push({
        title: 'Pay',
        key: 'payAction',
        render: (_, record) => (
          <Button
            onClick={onPay?.(record)}
            type={'primary'}
            disabled={record.amountDue === 0}
          >
            Pay
          </Button>
        ),
      });
    }

    return (
      <Table
        dataSource={payments.map((payment, index) => ({
          ...payment,
          key: index,
        }))}
        columns={columnsRef.current}
        pagination={false}
      />
    );
  },
);
