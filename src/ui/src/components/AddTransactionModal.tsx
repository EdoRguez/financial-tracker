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
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import type { Transaction } from "../types/Transaction";
import { useModalStore } from "../store/modalStore";

interface AddTransactionModalProps {
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  onAddTransaction,
}) => {
  const { isOpen, modalType, closeModal } = useModalStore();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"Send" | "Receive">("Send");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTransaction({
      amount: Number.parseFloat(amount),
      type,
      date,
      description,
    });
    closeModal();
    setAmount("");
    setType("Send");
    setDate("");
    setDescription("");
  };

  return (
    <Modal
      isOpen={isOpen && modalType === "addTransaction"}
      onClose={closeModal}
      size={["full", "md"]}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Transaction</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Type</FormLabel>
                <Select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as "Send" | "Receive")
                  }
                >
                  <option value="Send">Send</option>
                  <option value="Receive">Receive</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={closeModal}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit">
              Add Transaction
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddTransactionModal;
