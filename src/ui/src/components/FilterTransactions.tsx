import type React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Input,
  Select,
  Button,
  Heading,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
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
    startDate: '',
    endDate: '',
    transactionTypeId: undefined,
    minAmount: undefined,
    maxAmount: undefined,
  });

  useEffect(() => {
    handleClearFilters();
  }, [transactions]);

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
    const filtered = transactions.filter((transaction) => {
      const dateInRange =
        (!formData.startDate ||
          new Date(transaction.date) >= new Date(formData.startDate)) &&
        (!formData.endDate ||
          new Date(transaction.date) <= new Date(formData.endDate));
      const typeMatch =
        !formData.transactionTypeId ||
        transaction.transactionTypeId === +formData.transactionTypeId;
      const amountInRange =
        (!formData.minAmount ||
          !transaction.amount ||
          transaction.amount >= formData.minAmount) &&
        (!formData.maxAmount ||
          !transaction.amount ||
          transaction.amount <= formData.maxAmount);

      return dateInRange && typeMatch && amountInRange;
    });

    setFilteredTransactions(filtered);
  };

  const handleClearFilters = () => {
    setInputMinAmount("");
    setInputMaxAmount("");
    setFormData({
      startDate: "",
      endDate: "",
      transactionTypeId: 0,
      minAmount: undefined,
      maxAmount: undefined,
    });

    setFilteredTransactions(transactions);
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
            <NumberInput size="sm" value={inputMinAmount}>
              <NumberInputField
                name="minAmount"
                onChange={handleNumberChange}
                maxLength={15}
              />
            </NumberInput>
          </div>
          <div className="text-sm">
            <label>Max Amount</label>
            <NumberInput size="sm" value={inputMaxAmount}>
              <NumberInputField
                name="maxAmount"
                onChange={handleNumberChange}
                maxLength={15}
              />
            </NumberInput>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button variant="ghost" onClick={handleClearFilters} size="sm">
            Clear Filters
          </Button>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={handleFilter}
            width={["100%", "auto"]}
          >
            Apply Filters
          </Button>
        </div>
      </VStack>
    </Box>
  );
};

export default FilterTransactions;
