import axios from "axios";
import type { Transaction } from "../types/Transaction";
import { TransactionType } from "../types/TransactionType";

const API_BASE_URL = "http://localhost:5295";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await apiClient.get<Transaction[]>("/api/transactions");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
};

export const addTransaction = async (
  transaction: Omit<Transaction, "id">
): Promise<Transaction> => {
  try {
    const response = await apiClient.post<Transaction>(
      "/api/transactions",
      transaction
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add transaction:", error);
    throw new Error("Failed to add transaction");
  }
};

export const getTransactionTypes = async (): Promise<TransactionType[]> => {
  try {
    const response = await apiClient.get<TransactionType[]>("/api/transactionTypes");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch transaction types:", error);
    throw new Error("Failed to fetch transaction types");
  }
};