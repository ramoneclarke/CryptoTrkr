import { Dialog, DialogTitle } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { UserContext } from "../../context/UserContext";
import BuySellToggleButton from "./BuySellToggleButton";
import TransactionStep from "./TransactionStep";

const AddTransaction = ({
  onClose,
  selectedCoin,
  setSelectedCoin,
  open,
  transactionStepNum,
  setTransactionStepNum,
}) => {
  const useDataContext = useContext(DataContext);
  const { coinData } = useDataContext;
  const useUserContext = useContext(UserContext);
  const { dispatchUserContext, portfolio } = useUserContext;

  const [transactionTitle, setTransactionTitle] = useState("");

  // Change title

  useEffect(() => {
    if (transactionStepNum === 1) {
      setTransactionTitle("Add Transaction");
    } else if (transactionStepNum === 2 || transactionStepNum === 3) {
      setTransactionTitle(selectedCoin.name);
    }

    return () => {
      setTransactionTitle("Add Transaction");
    };
  }, [selectedCoin.name, transactionStepNum]);

  // For coin selector step
  const [filterText, setFilterText] = useState("");
  const [filteredCoinData, setFilteredCoinData] = useState([]);

  // Apply filter search to market data
  useEffect(() => {
    let filtered = coinData.filter((coin) =>
      coin.name.toLowerCase().startsWith(filterText)
    );
    setFilteredCoinData(filtered);
  }, [coinData, filterText]);

  const handleClose = () => {
    onClose(selectedCoin);
    setFilterText("");
    // setTransactionStep(1);
  };

  const handleListItemClick = (value) => {
    if (portfolio.hasOwnProperty(value.id) === false) {
      dispatchUserContext({ type: "addToPortfolio", payload: value.id });
    }
    setSelectedCoin(value);
    setFilterText("");
    setTransactionStepNum(2);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth="xl"
      sx={{
        "& ::-webkit-scrollbar": {
          width: "0.4em",
        },
        "& ::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "& ::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
          outline: "1px solid slategrey",
        },
      }}
      PaperProps={{
        sx: {
          height: "70vh",
          width: {
            xs: "90%",
            md: "30rem",
          },
          backgroundColor: "#263238 !important",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "1.8rem", padding: "10px" }}>
        {transactionTitle}
      </DialogTitle>
      {transactionStepNum !== 1 && (
        <BuySellToggleButton
          step={transactionStepNum}
          setStep={setTransactionStepNum}
        />
      )}
      <TransactionStep
        step={transactionStepNum}
        setStep={setTransactionStepNum}
        handleClose={handleClose}
        handleListItemClick={handleListItemClick}
        coinData={coinData}
        filteredCoinData={filteredCoinData}
        filterText={filterText}
        setFilterText={setFilterText}
        selectedCoin={selectedCoin}
      />
    </Dialog>
  );
};

export default AddTransaction;
