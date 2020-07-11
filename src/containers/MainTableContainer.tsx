import React, { memo } from 'react';
import {
  PaymentsContextProvider,
  paymentsContextReducer,
} from '../contexts/PaymentsContext';
import { PaymentsModalContainer } from './PaymentsModalContainer';
import { PaymentsTableContainer } from './PaymentsTableContainer';

export const MainTableContainer = memo(() => {
  const [state, dispatcher] = React.useReducer(paymentsContextReducer, {
    payments: [],
  });

  return (
    <PaymentsContextProvider state={state} dispatcher={dispatcher}>
      <PaymentsTableContainer />
      <PaymentsModalContainer />
    </PaymentsContextProvider>
  );
});
