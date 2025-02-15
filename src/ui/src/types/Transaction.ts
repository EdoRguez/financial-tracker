export interface Transaction {
  id: number;
  amount: number;
  type: "Send" | "Receive";
  date: string;
  description: string;
}
