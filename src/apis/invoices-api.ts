import { fromFetch } from 'rxjs/fetch';
import { mergeMap } from 'rxjs/operators';
import { Invoice } from '../models/Invoice';

export const invoicesApi = {
  get: (endpoint: string) => {
    return fromFetch('http://localhost:3002' + endpoint).pipe(
      mergeMap<Response, Promise<Invoice[]>>((res) => res.json()),
    );
  },
};
