import { Button, Table } from 'antd';
import React, { memo } from 'react';
import { Payment } from '../models/Payment';
import { useTableColumns } from '../utils/hooks/use-table-columns';

interface Props {
  payments: Payment[];
  onPay?: (payment: Payment) => () => void;
}

export const PaymentsTable: React.FC<Props> = memo(({ payments, onPay }) => {
  const tableColumns = useTableColumns(payments, (columns, tableConfig) => {
    if (tableConfig.paymentEnabled) {
      columns.push({
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
  });

  return (
    <Table
      dataSource={payments.map((payment, index) => ({
        ...payment,
        key: index,
      }))}
      columns={tableColumns}
      pagination={false}
    />
  );
});
