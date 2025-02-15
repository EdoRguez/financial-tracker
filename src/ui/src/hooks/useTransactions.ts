import { useState, useEffect } from "react";
import type { Transaction } from "../types/Transaction";
import {
  getTransactions,
  addTransaction as apiAddTransaction,
} from "../services/api";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  useEffect(() => {
    fetchTransactions();
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

  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    try {
      const newTransaction = await apiAddTransaction(transaction);
      setTransactions([...transactions, newTransaction]);
      setFilteredTransactions([...filteredTransactions, newTransaction]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return {
    transactions,
    addTransaction,
    filteredTransactions,
    setFilteredTransactions,
  };
};
