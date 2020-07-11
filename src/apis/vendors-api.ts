import { fromFetch } from 'rxjs/fetch';
import { mergeMap } from 'rxjs/operators';
import { Vendor } from '../models/Vendor';

export const vendorsApi = {
  get: (endpoint: string) => {
    return fromFetch('http://localhost:3002' + endpoint).pipe(
      mergeMap<Response, Promise<Vendor[]>>((res) => res.json()),
    );
  },
};
