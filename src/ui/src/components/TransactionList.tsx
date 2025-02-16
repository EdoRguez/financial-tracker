import type React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Text, Box } from "@chakra-ui/react";
import type { Transaction } from "../types/Transaction";

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <Box overflowX="auto" className="w-full">
      <Table variant="simple" size={["sm", "md"]}>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Type</Th>
            <Th>Amount</Th>
            <Th display={["none", "table-cell"]}>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction) => (
            <Tr key={transaction.id}>
              <Td>{transaction.date}</Td>
              <Td>{transaction.type}</Td>
              <Td>
                <Text
                  color={
                    transaction.type === "Receive" ? "green.500" : "red.500"
                  }
                >
                  {transaction.type === "Receive" ? "+" : "-"}$
                  {transaction.amount ? transaction.amount.toFixed(2) : "0.00"}
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
