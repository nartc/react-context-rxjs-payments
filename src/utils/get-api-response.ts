import { from, Observable, ObservableInput, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { ApiResponse, ApiResponseStatus } from './types';

export function getApiResponse<TData = any>(
  apiCall: Observable<TData> | ObservableInput<TData>,
  initial: TData,
): Observable<ApiResponse<TData>> {
  const obs = apiCall instanceof Observable ? apiCall : from(apiCall);
  return obs.pipe(
    map((data) => ({ status: ApiResponseStatus.Success, data, error: '' })),
    startWith({ status: ApiResponseStatus.Loading, data: initial, error: '' }),
    catchError((err) => {
      console.error('Api Error:', err);
      return of({
        status: ApiResponseStatus.Error,
        data: initial,
        error: err.message,
      });
    }),
  );
}
