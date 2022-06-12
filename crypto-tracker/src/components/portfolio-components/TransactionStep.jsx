import React from "react";
import TransactionForm from "./TransactionForm";
import TransactionCoinSelector from "./TransactionCoinSelector";

const TransactionStep = ({
  transactionStepNum,
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
        />
      );
    case 2:
      return (
        <TransactionForm transactionType="buy" handleClose={handleClose} />
      );

    case 3:
      return (
        <TransactionForm transactionType="sell" handleClose={handleClose} />
      );
    default:
      break;
  }
};

export default TransactionStep;
