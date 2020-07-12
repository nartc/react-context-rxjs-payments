import React from 'react';
import { Payment } from '../models/Payment';
import { ContextType } from '../utils/types';

export interface PaymentsContextState {
  payments: Payment[];
  payment?: Payment;
  modalType?: 'adjustment' | 'payment';
}

export type PaymentsContextActions =
  | {
      type: 'SET_PAYMENTS';
      payload: PaymentsContextState;
    }
  | {
      type: 'SET_PAYMENT';
      payload: { payment: Payment; adjustEnabled: boolean };
    }
  | { type: 'SET_MODAL_TYPE'; payload?: 'adjustment' | 'payment' }
  | { type: 'APPLY_CREDIT' }
  | { type: 'PAY' };

const paymentsContextReducer: React.Reducer<
  PaymentsContextState,
  PaymentsContextActions
> = (prevState, action) => {
  switch (action.type) {
    case 'APPLY_CREDIT':
      const creditBal =
        prevState.payment!.creditBal - prevState.payment!.amountDue;
      const payOff = creditBal >= 0;
      const paymentAfterPayoff = {
        ...prevState.payment!,
        amountDue: -creditBal,
        creditBal: 0,
      };

      const _updatedPayment = payOff ? undefined : paymentAfterPayoff;

      const _updatedPayments = prevState.payments.map((payment) => {
        if (payment.invoiceId === prevState.payment!.invoiceId) {
          return payOff
            ? { ...payment, amountDue: 0, creditBal }
            : paymentAfterPayoff;
        }
        return payment;
      });

      return {
        payments: _updatedPayments,
        payment: _updatedPayment,
        modalType: payOff ? undefined : 'payment',
      };
    case 'PAY':
      const updatedPayments = prevState.payments.map((payment) => {
        if (payment.invoiceId === prevState.payment!.invoiceId) {
          return { ...payment, amountDue: 0 };
        }
        return payment;
      });

      return {
        payments: updatedPayments,
        payment: undefined,
        modalType: undefined,
      };
    case 'SET_MODAL_TYPE':
      return {
        ...prevState,
        modalType: action.payload,
      };
    case 'SET_PAYMENT':
      const { payment, adjustEnabled } = action.payload;
      let modalType: 'adjustment' | 'payment';
      if (payment.creditBal > 0) {
        modalType = adjustEnabled ? 'adjustment' : 'payment';
      } else {
        modalType = 'payment';
      }
      return { ...prevState, payment, modalType };
    case 'SET_PAYMENTS':
      return { ...prevState, ...action.payload };
    default:
      return prevState;
  }
};

export type PaymentsContext = ContextType<
  PaymentsContextState,
  typeof paymentsContextReducer
>;
const PaymentsCtx = React.createContext<PaymentsContext | undefined>(undefined);

const PaymentsContextProvider: React.FC<PaymentsContext> = ({
  children,
  ...context
}) => <PaymentsCtx.Provider value={context}>{children}</PaymentsCtx.Provider>;

const usePaymentsContext = () => {
  const context = React.useContext(PaymentsCtx) as PaymentsContext;
  if (context == null) {
    throw new Error(
      'usePaymentsContext must be used within PaymentsContextProvider',
    );
  }
  return context;
};

export { PaymentsContextProvider, usePaymentsContext, paymentsContextReducer };
