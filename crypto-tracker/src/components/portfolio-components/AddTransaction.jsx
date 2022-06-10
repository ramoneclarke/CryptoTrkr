import { Dialog } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import TransactionStep from "./TransactionStep";

const AddTransaction = ({
  onClose,
  open,
  transactionStepNum,
  setTransactionStepNum,
}) => {
  const useDataContext = useContext(DataContext);
  const { coinData } = useDataContext;

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
    onClose();
    setFilterText("");
    // setTransactionStep(1);
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
      <TransactionStep
        transactionStepNum={transactionStepNum}
        setTransactionStepNum={setTransactionStepNum}
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
