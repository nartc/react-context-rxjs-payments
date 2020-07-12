import { ColumnGroupType, ColumnsType, ColumnType } from 'antd/lib/table';
import React from 'react';
import { useTableConfigContext } from '../../contexts/TableConfigContext';
import { TableConfig } from '../../models/TableConfig';

export function useTableColumns<TModel>(
  data: TModel[],
  extraColumnsFn?: (
    tableColumns: (ColumnGroupType<TModel> | ColumnType<TModel>)[],
    tableConfig: TableConfig<TModel>,
  ) => void,
): (ColumnGroupType<TModel> | ColumnType<TModel>)[] | undefined {
  const tableConfig = useTableConfigContext<TModel>();
  const columnsRef = React.useRef<ColumnsType<TModel>>(
    tableConfig.columns
      .filter((col) => col.display)
      .map((col) => {
        const column: ColumnType<TModel> = {
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
            ...new Set(data.map((p) => p[col.fieldName as keyof TModel])),
          ];
          column.filters = uniqueValues.map((val) => ({
            text: val,
            value: val as any,
          }));
          column.onFilter = (value, record) =>
            (record[col.fieldName as keyof TModel] as any).indexOf(value) === 0;
        }

        return column;
      }),
  );

  extraColumnsFn?.(columnsRef.current, tableConfig);
  return columnsRef.current;
}
