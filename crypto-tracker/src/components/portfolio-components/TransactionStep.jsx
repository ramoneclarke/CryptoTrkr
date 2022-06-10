import React from "react";
import TransactionForm from "./TransactionForm";
import TransactionCoinSelector from "./TransactionCoinSelector";

const TransactionStep = ({
  transactionStepNum,
  setTransactionStepNum,
  handleClose,
  coinData,
  filteredCoinData,
  filterText,
  setFilterText,
}) => {
  switch (transactionStepNum) {
    case 1:
      return (
        <TransactionCoinSelector
          coinData={coinData}
          filteredCoinData={filteredCoinData}
          filterText={filterText}
          setFilterText={setFilterText}
          setTransactionStepNum={setTransactionStepNum}
        />
      );
    case 2:
      return (
        <TransactionForm
          transactionType="buy"
          handleClose={handleClose}
          transactionStepNum={transactionStepNum}
          setTransactionStepNum={setTransactionStepNum}
        />
      );

    case 3:
      return (
        <TransactionForm
          transactionType="sell"
          handleClose={handleClose}
          transactionStepNum={transactionStepNum}
          setTransactionStepNum={setTransactionStepNum}
        />
      );
    default:
      break;
  }
};

export default TransactionStep;
