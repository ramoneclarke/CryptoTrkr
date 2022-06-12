import { Dialog } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { DataContext } from "../../context/DataContext";
import TransactionStep from "./TransactionStep";

const AddTransaction = () => {
  const useDataContext = useContext(DataContext);
  const { coinData } = useDataContext;
  const useAppContext = useContext(AppContext);
  const { dispatchAppContext, transaction } = useAppContext;
  const { transactionOpen, transactionStepNum } = transaction;

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
    dispatchAppContext({ type: "handleTransactionClose" });
    setFilterText("");
  };

  return (
    <Dialog
      onClose={handleClose}
      open={transactionOpen}
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
      <TransactionStep
        transactionStepNum={transactionStepNum}
        handleClose={handleClose}
        coinData={coinData}
        filteredCoinData={filteredCoinData}
        filterText={filterText}
        setFilterText={setFilterText}
      />
    </Dialog>
  );
};

export default AddTransaction;
