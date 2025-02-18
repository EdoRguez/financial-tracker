import type React from "react";
import { Box, Text } from "@chakra-ui/react";
import type { Transaction } from "../types/Transaction";

interface BalanceProps {
  transactions: Transaction[];
}

const Balance: React.FC<BalanceProps> = ({ transactions }) => {
  const balance = transactions.reduce((acc, transaction) => {
    const amount: number = transaction.amount ?? 0;
    return transaction.transactionTypeId === 2
      ? acc + amount
      : acc - amount;
  }, 0);

  return (
    <Box className="mb-2">
      <Text fontSize={["xl", "2xl"]} fontWeight="bold">
        Balance:{" "}
        <Text as="span" color={balance >= 0 ? "green.500" : "red.500"}>
          ${balance.toFixed(2)}
        </Text>
      </Text>
    </Box>
  );
};

export default Balance;
