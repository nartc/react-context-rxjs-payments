import React, { memo, useState } from 'react';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiService } from '../apis/api-service';
import { PaymentsTable } from '../components/PaymentsTable';
import { useAppConfigContext } from '../contexts/AppConfigContext';
import { usePaymentsContext } from '../contexts/PaymentsContext';
import { Invoice } from '../models/Invoice';
import { Payment } from '../models/Payment';
import { Vendor } from '../models/Vendor';
import { getApiResponse } from '../utils/get-api-response';
import { useApiCall } from '../utils/hooks/use-api-call';
import { ApiResponseStatus } from '../utils/types';
import { LoadingContainer } from '../utils/ui/LoadingContainer';

function mapToPayments([invoices, vendors]: [Invoice[], Vendor[]]) {
  const payments = invoices.map((invoice) => {
    const foundVendor = vendors.find((vendor) =>
      [vendor.vendorId, vendor.vendorName].includes(invoice.vendorId),
    );
    return {
      ...invoice,
      vendor:
        foundVendor?.vendorName || foundVendor?.vendorId || invoice.vendorId,
      creditBal: foundVendor?.creditBal ?? 0,
    } as Payment;
  });
  return { payments };
}

export const PaymentsTableContainer: React.FC = memo(() => {
  const {
    state: { payments },
    dispatcher,
  } = usePaymentsContext();
  const { endpoints } = useAppConfigContext();

  const [tableLoading, setTableLoading] = useState(true);

  const { state: apiState, retryFn } = useApiCall(
    getApiResponse(
      forkJoin([
        apiService.get<Invoice>(endpoints['call2'].endpoint),
        apiService.get<Vendor>(endpoints['call3'].endpoint),
      ]).pipe(map(mapToPayments)),
      { payments: [] },
    ),
  );

  React.useEffect(() => {
    if (apiState.status === ApiResponseStatus.Success) {
      dispatcher({
        type: 'SET_PAYMENTS',
        payload: apiState.data,
      });
    }
    setTableLoading(
      !Object.keys(apiState).length ||
        apiState.status === ApiResponseStatus.Loading ||
        (apiState.status === ApiResponseStatus.Success && !payments.length),
    );
  }, [apiState, apiState.data, apiState.status, dispatcher, payments.length]);

  const onPayClick = React.useCallback(
    (payment: Payment) => () => {
      dispatcher({ type: 'SET_PAYMENT', payload: payment });
    },
    [dispatcher],
  );

  return (
    <>
      <LoadingContainer
        error={apiState?.error}
        loading={tableLoading}
        retryEnabled={Boolean(
          endpoints['call2'].retryEnabled && endpoints['call3'].retryEnabled,
        )}
        onRetry={retryFn}
      >
        <PaymentsTable payments={payments} onPay={onPayClick} />
      </LoadingContainer>
    </>
  );
});
