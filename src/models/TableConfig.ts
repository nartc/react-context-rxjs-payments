import { SortOrder } from 'antd/lib/table/interface';

export interface ColumnConfig<TModel = any, TKey extends keyof TModel = any> {
  fieldName: string;
  displayName: string;
  display: boolean;
  filter: {
    enabled: boolean;
    multiple: boolean;
  };
  sorter: {
    enabled: boolean;
    defaultOrder: SortOrder;
    sortField: TKey;
    sortMeta: keyof TModel[TKey];
  };
}

export interface TableConfig<TModel = any, TKey extends keyof TModel = any> {
  paymentEnabled: boolean; //if action enabled is true, then there will be a last column with Button, which when clicked
  // will open the modal - that either shows Adjust / Payment or Both
  adjustEnabled: boolean; // if payment is enabled and Adjustment is enabled, then the user can use Credit. else he can
  // only do payment (using credit card)
  columns: ColumnConfig<TModel, TKey>[];
}
