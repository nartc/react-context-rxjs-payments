import React, { memo, useState } from 'react';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { invoicesApi } from '../apis/invoices-api';
import { vendorsApi } from '../apis/vendors-api';
import { PaymentsTable } from '../components/PaymentsTable';
import { useAppConfigContext } from '../contexts/AppConfigContext';
import {
  PaymentsContextState,
  usePaymentsContext,
} from '../contexts/PaymentsContext';
import { useTableConfigContext } from '../contexts/TableConfigContext';
import { Invoice } from '../models/Invoice';
import { Payment } from '../models/Payment';
import { Vendor } from '../models/Vendor';
import { getApiResponse } from '../utils/get-api-response';
import { useApiCall } from '../utils/hooks/use-api-call';
import { ApiResponse, ApiResponseStatus } from '../utils/types';
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
  const tableConfig = useTableConfigContext();

  const [apiState, setApiState] = useState<ApiResponse<PaymentsContextState>>(
    {} as ApiResponse,
  );
  const retryFn = useApiCall(
    getApiResponse(
      forkJoin([
        invoicesApi.get(endpoints['call2'].endpoint),
        vendorsApi.get(endpoints['call3'].endpoint),
      ]).pipe(map(mapToPayments)),
      { payments: [] },
    ),
    setApiState,
  );

  React.useEffect(() => {
    if (apiState.status === ApiResponseStatus.Success) {
      dispatcher({
        type: 'SET_PAYMENTS',
        payload: apiState.data,
      });
    }
  }, [apiState.data, apiState.status, dispatcher]);

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
        loading={
          !Object.keys(apiState).length ||
          apiState.status === ApiResponseStatus.Loading ||
          (apiState.status === ApiResponseStatus.Success && !payments.length)
        }
        retryEnabled={Boolean(
          endpoints['call2'].retryEnabled && endpoints['call3'].retryEnabled,
        )}
        onRetry={retryFn}
      >
        <PaymentsTable
          payments={payments}
          tableConfig={tableConfig}
          onPay={onPayClick}
        />
      </LoadingContainer>
    </>
  );
});
