export interface FilterTransaction {
  startDate: string | undefined;
  endDate: string | undefined;
  transactionTypeId: number | undefined;
  minAmount: number | undefined;
  maxAmount: number | undefined;
}
