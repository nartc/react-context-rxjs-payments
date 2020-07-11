export interface Invoice {
  invoiceId: number;
  vendorId: string;
  quantity: number;
  product: string;
  amountBal: number;
  amountDue: number;
  invoiceDate: string;
}
