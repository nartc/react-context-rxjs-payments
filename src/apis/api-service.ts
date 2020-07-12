import { fromFetch } from 'rxjs/fetch';
import { mergeMap } from 'rxjs/operators';

export const apiService = {
  get: <TModel>(endpoint: string) => {
    return fromFetch('http://localhost:3002' + endpoint).pipe(
      mergeMap<Response, Promise<TModel[]>>((res) => res.json()),
    );
  },
  post: (endpoint: string) => {
    return fromFetch('http://localhost:3002' + endpoint, {
      method: 'POST',
    }).pipe(
      mergeMap<Response, Promise<unknown>>((res) => res.json()),
    );
  },
};
