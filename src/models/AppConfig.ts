import { Endpoint } from './Endpoint';

export type Endpoints = 'call2' | 'call3' | 'creditPost' | 'paymentPost';

export interface AppConfig {
  endpoints: { [key in Endpoints]: Endpoint };
}
