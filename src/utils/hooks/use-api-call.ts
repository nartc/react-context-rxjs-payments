import { useCallback, useEffect, useRef, useState } from 'react';
import { Observable } from 'rxjs';

export function useApiCall<TApiResponse>(
  obs: Observable<TApiResponse>,
): { state: TApiResponse; retryFn: () => void } {
  const [state, setState] = useState<TApiResponse>({} as TApiResponse);
  const [retryCount, setRetryCount] = useState(0);
  const obsRef = useRef(obs);

  useEffect(() => {
    const subscription = obsRef.current.subscribe(setState);
    return subscription.unsubscribe.bind(subscription);
  }, [setState, retryCount]);

  return {
    state,
    retryFn: useCallback(() => {
      setRetryCount((prev) => prev + 1);
    }, []),
  };
}
