"use client";

import type React from "react";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  useToast,
} from "@chakra-ui/react";
import type { Transaction } from "../types/Transaction";
import { useModalStore } from "../store/modalStore";
import { validAmount, validLettersAndNumbers } from "../utils/InputUtils";
import { formatAmountStringToNumber, validDate } from "../utils/Utils";
import { TransactionType } from "../types/TransactionType";

interface AddTransactionModalProps {
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void;
  transactionTypes: TransactionType[];
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  onAddTransaction,
  transactionTypes,
}) => {
  const toast = useToast();
  const { isOpen, modalType, closeModal } = useModalStore();

  const [inputAmount, setInputAmount] = useState<string>("");
  const [formData, setFormData] = useState<Omit<Transaction, "id">>({
    amount: undefined,
    transactionTypeId: undefined,
    date: "",
    description: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    amount: false,
    description: false,
    type: false,
    date: false,
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleDescriptionChange = (event: any) => {
    const { name, value } = event.target;
    if (value && !validLettersAndNumbers(value, true)) return;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleNumberChange = (event: any) => {
    const { name, value } = event.target;
    if (value && !validAmount(value)) return;
    setInputAmount(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: formatAmountStringToNumber(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onAddTransaction(formData);
      closeModal();
      clearForm();
    } else {
      toast({
        title: "Error",
        description: "Please fill out all fields correctly.",
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const isFormValid = (): boolean => {
    let valid = true;
    const errors = {
      amount: false,
      description: false,
      type: false,
      date: false,
    };

    if (!formData.amount) {
      errors.amount = true;
      valid = false;
    }
    if (!formData.transactionTypeId) {
      errors.type = true;
      valid = false;
    }
    if (!formData.date || !validDate(formData.date)) {
      errors.date = true;
      valid = false;
    }
    if (
      !formData.description ||
      !validLettersAndNumbers(formData.description, true)
    ) {
      errors.description = true;
      valid = false;
    }

    setValidationErrors(errors);
    return valid;
  };

  const clearForm = () => {
    setInputAmount("");
    setFormData({
      amount: undefined,
      transactionTypeId: undefined,
      date: "",
      description: "",
    });
  };

  const handleCloseModal = () => {
    clearForm();
    setValidationErrors({
      amount: false,
      description: false,
      date: false,
      type: false,
    });
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen && modalType === "addTransaction"}
      onClose={handleCloseModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Transaction</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div className="mt-2">
              <label className="text-sm">
                Amount <span className="text-rose-500">*</span>
              </label>
              <NumberInput
                size="sm"
                value={inputAmount}
                isInvalid={validationErrors.amount}
              >
                <NumberInputField
                  name="amount"
                  onChange={handleNumberChange}
                  maxLength={15}
                />
              </NumberInput>
            </div>
            <div className="mt-2">
              <label className="text-sm">
                Description <span className="text-rose-500">*</span>
              </label>
              <Input
                size="sm"
                name="description"
                value={formData.description}
                onChange={handleDescriptionChange}
                maxLength={50}
                isInvalid={validationErrors.description}
              />
            </div>
            <div className="mt-2">
              <label className="text-sm">
                Type <span className="text-rose-500">*</span>
              </label>
              <Select
                size="sm"
                name="transactionTypeId"
                value={formData.transactionTypeId}
                onChange={handleChange}
                isInvalid={validationErrors.type}
              >
                <option value="">-</option>
                {transactionTypes.map((type: TransactionType) => {
                  return (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div className="mt-2">
              <label className="text-sm">
                Date <span className="text-rose-500">*</span>
              </label>
              <Input
                size="sm"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                isInvalid={validationErrors.date}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleCloseModal} size="sm">
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" size="sm">
              Add Transaction
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddTransactionModal;
