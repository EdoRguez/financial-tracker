import type React from "react";
import { useState } from "react";
import { Box, VStack, Input, Select, Button, Heading } from "@chakra-ui/react";
import type { Transaction } from "../types/Transaction";
import { TransactionType } from "../types/TransactionType";
import { FilterTransaction } from "../types/FilterTransaction";
import { validAmount } from "../utils/InputUtils";
import { formatAmountStringToNumber } from "../utils/Utils";

interface FilterTransactionsProps {
  transactions: Transaction[];
  transactionTypes: TransactionType[];
  setFilteredTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const FilterTransactions: React.FC<FilterTransactionsProps> = ({
  transactions,
  transactionTypes,
  setFilteredTransactions,
}) => {
  const [inputMinAmount, setInputMinAmount] = useState<string>("");
  const [inputMaxAmount, setInputMaxAmount] = useState<string>("");
  const [formData, setFormData] = useState<FilterTransaction>({
    startDate: undefined,
    endDate: undefined,
    transactionTypeId: undefined,
    minAmount: undefined,
    maxAmount: undefined,
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleNumberChange = (event: any) => {
    const { name, value } = event.target;
    if (value && !validAmount(value)) return;

    if (name === "minAmount") setInputMinAmount(value);
    if (name === "maxAmount") setInputMaxAmount(value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: formatAmountStringToNumber(value),
    }));
  };

  const handleFilter = () => {
    console.log(formData)
    const filtered = transactions.filter((transaction) => {
      const dateInRange =
        (!formData.startDate || new Date(transaction.date) >= new Date(formData.startDate)) &&
        (!formData.endDate || new Date(transaction.date) <= new Date(formData.endDate));
      const typeMatch = !formData.transactionTypeId || transaction.transactionTypeId === +formData.transactionTypeId;
      const amountInRange =
        (!formData.minAmount || !transaction.amount || transaction.amount >= formData.minAmount) &&
        (!formData.maxAmount || !transaction.amount || transaction.amount <= formData.maxAmount);

      return dateInRange && typeMatch && amountInRange;
    });

    setFilteredTransactions(filtered);
  };

  return (
    <Box className="mb-4">
      <Heading as="h2" size={["sm", "md"]} className="mb-4">
        Filter Transactions
      </Heading>
      <VStack spacing={4}>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="text-sm">
            <label>Start Date</label>
            <Input
              size="sm"
              type="date"
              name="startDate"
              placeholder="Start Date"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="text-sm">
            <label>End Date</label>
            <Input
              size="sm"
              type="date"
              name="endDate"
              placeholder="End Date"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
          <div className="text-sm">
            <label>Type</label>
            <Select
              size="sm"
              name="transactionTypeId"
              placeholder="All Types"
              value={formData.transactionTypeId}
              onChange={handleChange}
            >
              {transactionTypes.map((type: TransactionType) => {
                return (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                );
              })}
            </Select>
          </div>
          <div className="text-sm">
            <label>Min Amount</label>
            <Input
              size="sm"
              type="number"
              name="minAmount"
              placeholder="Min Amount"
              value={inputMinAmount}
              onChange={handleNumberChange}
            />
          </div>
          <div className="text-sm">
            <label>Max Amount</label>
            <Input
              size="sm"
              type="number"
              name="maxAmount"
              placeholder="Max Amount"
              value={inputMaxAmount}
              onChange={handleNumberChange}
            />
          </div>
        </div>
        <Button
          size="sm"
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
