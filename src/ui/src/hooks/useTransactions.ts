import { useState, useEffect } from "react";
import type { Transaction } from "../types/Transaction";
import {
  getTransactions,
  addTransaction as apiAddTransaction,
  getTransactionTypes,
} from "../services/api";
import { TransactionType } from "../types/TransactionType";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  useEffect(() => {
    fetchTransactions();
    fetchTransactionTypes();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchTransactionTypes = async () => {
    try {
      const data = await getTransactionTypes();
      setTransactionTypes(data);
    } catch (error) {
      console.error("Error fetching transaction types:", error);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    try {
      await apiAddTransaction(transaction);
      fetchTransactions();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return {
    transactions,
    transactionTypes,
    addTransaction,
    filteredTransactions,
    setFilteredTransactions,
  };
};
