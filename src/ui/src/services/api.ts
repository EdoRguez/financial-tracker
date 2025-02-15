import type { Transaction } from "../types/Transaction";

// Dummy data
const dummyTransactions: Transaction[] = [
  {
    id: 1,
    amount: 1000,
    type: "Receive",
    date: "2023-05-01",
    description: "Salary",
  },
  {
    id: 2,
    amount: 50,
    type: "Send",
    date: "2023-05-02",
    description: "Groceries",
  },
  {
    id: 3,
    amount: 200,
    type: "Send",
    date: "2023-05-03",
    description: "Electricity bill",
  },
  {
    id: 4,
    amount: 300,
    type: "Receive",
    date: "2023-05-04",
    description: "Freelance work",
  },
  {
    id: 5,
    amount: 75,
    type: "Send",
    date: "2023-05-05",
    description: "Internet bill",
  },
];

// Simulated delay to mimic API call latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getTransactions = async (): Promise<Transaction[]> => {
  await delay(500); // Simulate network delay
  return [...dummyTransactions];
};

export const addTransaction = async (
  transaction: Omit<Transaction, "id">
): Promise<Transaction> => {
  await delay(500); // Simulate network delay
  const newTransaction: Transaction = {
    ...transaction,
    id: dummyTransactions.length + 1,
  };
  dummyTransactions.push(newTransaction);
  return newTransaction;
};
