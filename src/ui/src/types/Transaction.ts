export interface Transaction {
  id: number;
  amount: number | undefined;
  transactionTypeId: number | undefined;
  date: string;
  description: string;
}