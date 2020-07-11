import React from 'react';
import { PaymentsModal } from '../components/PaymentsModal';
import { usePaymentsContext } from '../contexts/PaymentsContext';
import { useTableConfigContext } from '../contexts/TableConfigContext';

export const PaymentsModalContainer = () => {
  const {
    state: { payment, modalType },
    dispatcher,
  } = usePaymentsContext();
  const { adjustEnabled } = useTableConfigContext();

  React.useEffect(() => {
    if (payment) {
      let type: 'adjustment' | 'payment';
      if (payment.creditBal > 0) {
        type = adjustEnabled ? 'adjustment' : 'payment';
      } else {
        type = 'payment';
      }
      dispatcher({ type: 'SET_MODAL_TYPE', payload: type });
    }
  }, [payment, adjustEnabled, dispatcher]);

  const cancel = React.useCallback(() => {
    dispatcher({ type: 'SET_MODAL_TYPE', payload: undefined });
  }, [dispatcher]);

  const submit = React.useCallback(() => {
    if (modalType === 'adjustment') {
      dispatcher({ type: 'APPLY_CREDIT' });
    } else if (modalType === 'payment') {
      dispatcher({ type: 'PAY' });
    }
  }, [modalType, dispatcher]);

  return (
    <PaymentsModal
      payment={payment}
      modalType={modalType}
      onCancel={cancel}
      onSubmit={submit}
    />
  );
};
