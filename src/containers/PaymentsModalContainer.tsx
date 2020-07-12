import React from 'react';
import { take } from 'rxjs/operators';
import { apiService } from '../apis/api-service';
import { PaymentsModal } from '../components/PaymentsModal';
import { useAppConfigContext } from '../contexts/AppConfigContext';
import { usePaymentsContext } from '../contexts/PaymentsContext';
import { useTableConfigContext } from '../contexts/TableConfigContext';

export const PaymentsModalContainer = () => {
  const {
    state: { payment, modalType },
    dispatcher,
  } = usePaymentsContext();
  const { adjustEnabled } = useTableConfigContext();
  const { endpoints } = useAppConfigContext();

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
    let endpoint: string, actionType: 'APPLY_CREDIT' | 'PAY';
    if (modalType === 'adjustment') {
      endpoint = endpoints.creditPost.endpoint;
      actionType = 'APPLY_CREDIT';
    } else {
      endpoint = endpoints.paymentPost.endpoint;
      actionType = 'PAY';
    }
    apiService
      .post(endpoint)
      .pipe(take(1))
      .subscribe(() => {
        dispatcher({ type: actionType });
      });
  }, [
    modalType,
    dispatcher,
    endpoints.creditPost.endpoint,
    endpoints.paymentPost.endpoint,
  ]);

  return (
    <PaymentsModal
      payment={payment}
      modalType={modalType}
      onCancel={cancel}
      onSubmit={submit}
    />
  );
};
