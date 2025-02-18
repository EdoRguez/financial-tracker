import type React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Text, Box } from "@chakra-ui/react";
import type { Transaction } from "../types/Transaction";
import { TransactionType } from "../types/TransactionType";

interface TransactionListProps {
  transactions: Transaction[];
  transactionTypes: TransactionType[];
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  transactionTypes,
}) => {
  const getTransactionTypeName = (id: number | undefined): string => {
    const transactionType = transactionTypes.find((x) => x.id === id);
    return transactionType ? transactionType.name : "";
  };

  const isPositiveTransactionType = (id: number | undefined): boolean => {
    const transactionType = transactionTypes.find((x) => x.id === id);
    return transactionType?.id === 2;
  };

  return (
    <Box overflowX="auto" className="w-full">
      <Table variant="simple" size={["sm", "md"]} className="text-sm">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Type</Th>
            <Th>Amount</Th>
            <Th display={["none", "table-cell"]}>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            transactions.length === 0 && (
              <Tr>
                <Td colSpan={4} textAlign="center">No transactions found</Td>
              </Tr>
            )
          }
          {transactions.map((transaction: Transaction) => (
            <Tr key={transaction.id}>
              <Td>{new Date(transaction.date).toLocaleDateString("en-US")}</Td>
              <Td>{getTransactionTypeName(transaction.transactionTypeId)}</Td>
              <Td>
                <Text
                  color={
                    isPositiveTransactionType(transaction.transactionTypeId)
                      ? "green.500"
                      : "red.500"
                  }
                >
                  {isPositiveTransactionType(transaction.transactionTypeId)
                    ? "+"
                    : "-"}
                  ${transaction.amount ? transaction.amount.toFixed(2) : "0.00"}
                </Text>
              </Td>
              <Td display={["none", "table-cell"]}>
                {transaction.description}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TransactionList;
