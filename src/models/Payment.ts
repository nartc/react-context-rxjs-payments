import { Invoice } from './Invoice';

/**
 * invoiceId: number;
 vendorId: string;
 quantity: number;
 product: string;
 amountBal: number;
 amountDue: number;
 invoiceDate: string;
 */

export interface Payment extends Invoice {
  vendor: string;
  creditBal: number;
}
