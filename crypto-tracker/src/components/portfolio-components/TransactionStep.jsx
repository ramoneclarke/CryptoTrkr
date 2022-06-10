import React from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import TransactionForm from "./TransactionForm";
import TransactionCoinSelector from "./TransactionCoinSelector";

const TransactionStep = ({
  step,
  setStep,
  handleClose,
  handleListItemClick,
  coinData,
  filteredCoinData,
  filterText,
  setFilterText,
  selectedCoin,
}) => {
  const useDataContext = useContext(DataContext);
  const { coinPrices } = useDataContext;

  switch (step) {
    case 1:
      return (
        <TransactionCoinSelector
          handleListItemClick={handleListItemClick}
          coinData={coinData}
          filteredCoinData={filteredCoinData}
          filterText={filterText}
          setFilterText={setFilterText}
        />
      );
    case 2:
      return (
        <TransactionForm
          price={coinPrices[selectedCoin.id]}
          id={selectedCoin.id}
          transactionType="buy"
          handleClose={handleClose}
        />
      );

    case 3:
      return (
        <TransactionForm
          price={coinPrices[selectedCoin.id]}
          id={selectedCoin.id}
          transactionType="sell"
          handleClose={handleClose}
        />
      );
    default:
      break;
  }
};

export default TransactionStep;
