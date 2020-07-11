import React from 'react';
import { Payment } from '../models/Payment';
import { TableConfig } from '../models/TableConfig';

const TableConfigCtx = React.createContext<TableConfig<Payment> | undefined>(
  undefined,
);

const TableConfigContextProvider: React.FC<TableConfig<Payment>> = ({
  children,
  ...context
}) => (
  <TableConfigCtx.Provider value={context}>{children}</TableConfigCtx.Provider>
);

const useTableConfigContext = () => {
  const context = React.useContext(TableConfigCtx) as TableConfig<Payment>;
  if (context === undefined) {
    throw new Error(
      'useTableConfigContext must be used within TableConfigContextProvider',
    );
  }

  return context;
};

export { useTableConfigContext, TableConfigContextProvider };
