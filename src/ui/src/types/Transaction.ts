export interface Transaction {
  id: number;
  amount: number | undefined;
  type: string;
  date: string;
  description: string;
}
