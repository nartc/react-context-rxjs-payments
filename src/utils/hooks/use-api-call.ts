import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Observable } from 'rxjs';

export function useApiCall<TApiResponse>(
  obs: Observable<TApiResponse>,
  setState: Dispatch<SetStateAction<TApiResponse>>,
): () => void {
  const [retryCount, setRetryCount] = useState(0);
  const obsRef = useRef(obs);

  useEffect(() => {
    const subscription = obsRef.current.subscribe(setState);
    return subscription.unsubscribe.bind(subscription);
  }, [setState, retryCount]);

  return useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);
}
