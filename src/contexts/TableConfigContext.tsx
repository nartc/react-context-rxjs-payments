import React from 'react';
import { TableConfig } from '../models/TableConfig';

const TableConfigCtx = React.createContext<TableConfig | undefined>(undefined);

const TableConfigContextProvider: React.FC<TableConfig> = ({
  children,
  ...context
}) => (
  <TableConfigCtx.Provider value={context}>{children}</TableConfigCtx.Provider>
);

const useTableConfigContext: <TModel>() => TableConfig<TModel> = () => {
  const context = React.useContext(TableConfigCtx) as TableConfig;
  if (context === undefined) {
    throw new Error(
      'useTableConfigContext must be used within TableConfigContextProvider',
    );
  }

  return context;
};

export { useTableConfigContext, TableConfigContextProvider };
