import type React from "react";
import { useState } from "react";
import {
  Box,
  VStack,
  SimpleGrid,
  Input,
  Select,
  Button,
  Heading,
} from "@chakra-ui/react";
import type { Transaction } from "../types/Transaction";

interface FilterTransactionsProps {
  transactions: Transaction[];
  setFilteredTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const FilterTransactions: React.FC<FilterTransactionsProps> = ({
  transactions,
  setFilteredTransactions,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const handleFilter = () => {
    const filtered = transactions.filter((transaction) => {
      const dateInRange =
        (!startDate || transaction.date >= startDate) &&
        (!endDate || transaction.date <= endDate);
      const typeMatch = !type || transaction.type === type;
      const amountInRange =
        (!minAmount || transaction.amount >= Number.parseFloat(minAmount)) &&
        (!maxAmount || transaction.amount <= Number.parseFloat(maxAmount));

      return dateInRange && typeMatch && amountInRange;
    });

    setFilteredTransactions(filtered);
  };

  return (
    <Box className="mb-4">
      <Heading as="h2" size={["sm", "md"]} className="mb-2">
        Filter Transactions
      </Heading>
      <VStack spacing={4}>
        <SimpleGrid columns={[1, 2]} spacing={4} width="100%">
          <Input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Select
            placeholder="All Types"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Send">Send</option>
            <option value="Receive">Receive</option>
          </Select>
          <Input
            type="number"
            placeholder="Min Amount"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max Amount"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
          />
        </SimpleGrid>
        <Button
          colorScheme="blue"
          onClick={handleFilter}
          width={["100%", "auto"]}
        >
          Apply Filters
        </Button>
      </VStack>
    </Box>
  );
};

export default FilterTransactions;
