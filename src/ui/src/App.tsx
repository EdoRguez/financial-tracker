import { VStack, Heading, Button, Container } from "@chakra-ui/react";
import TransactionList from "./components/TransactionList";
import AddTransactionModal from "./components/AddTransactionModal";
import Balance from "./components/Balance";
import FilterTransactions from "./components/FilterTransactions";
import { useTransactions } from "./hooks/useTransactions";
import { useModalStore } from "./store/modalStore";
import SimpleCard from "./components/cards/SimpleCard";

function App() {
  const {
    transactions,
    transactionTypes,
    addTransaction,
    filteredTransactions,
    setFilteredTransactions,
  } = useTransactions();
  const { openModal } = useModalStore();

  return (
    <Container maxW="container.xl" className="p-4">
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size={["lg", "xl", "2xl"]}>
          Financial Transfer Tracker
        </Heading>
        <Balance transactions={filteredTransactions} />
        <Button
          colorScheme="blue"
          onClick={() => openModal("addTransaction")}
          size="sm"
        >
          Add Transaction
        </Button>
        <SimpleCard>
          <FilterTransactions
            transactions={transactions}
            transactionTypes={transactionTypes}
            setFilteredTransactions={setFilteredTransactions}
          />
        </SimpleCard>
        <SimpleCard>
          <TransactionList transactions={filteredTransactions} transactionTypes={transactionTypes} />
        </SimpleCard>
        <AddTransactionModal onAddTransaction={addTransaction} transactionTypes={transactionTypes} />
      </VStack>
    </Container>
  );
}

export default App;
