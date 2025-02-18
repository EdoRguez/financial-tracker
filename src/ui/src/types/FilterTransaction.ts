export interface FilterTransaction {
  startDate: string ;
  endDate: string;
  transactionTypeId: number | undefined;
  minAmount: number | undefined;
  maxAmount: number | undefined;
}
