import { IconButton } from "@mui/material";
import { AccountBalanceWallet } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { AppContext } from "../../context/AppContext";

const AddToPortfolioChip = ({ cellValues, handleTransactionClickOpen }) => {
  const useUserContext = useContext(UserContext);
  const { portfolio, dispatchUserContext } = useUserContext;
  const useDataContext = useContext(DataContext);
  const { coinData } = useDataContext;

  const [chipColor, setChipColor] = useState("chip.watch");

  // Refresh table data to change watchlist/portfolio chip colours on every change
  useEffect(() => {
    if (cellValues.row.portfolioActive) {
      setChipColor("chip.watchActive");
    } else {
      setChipColor("chip.watch");
    }
  }, [cellValues]);

  const handleCellButtonClick = (event, cellValues) => {
    if (cellValues.id in portfolio) {
      dispatchUserContext({
        type: "setSelectedCoin",
        payload: { id: cellValues.id, name: cellValues.row.name },
      });
      handleTransactionClickOpen(2);
      dispatchUserContext({
        type: "updateBalance",
        payload: coinData,
      });
    } else {
      dispatchUserContext({
        type: "addToPortfolio",
        payload: cellValues.id,
      });
    }
  };

  return (
    <>
      <IconButton
        onClick={(event) => {
          handleCellButtonClick(event, cellValues);
        }}
      >
        <AccountBalanceWallet sx={{ color: "chip.portfolio" }} />
      </IconButton>
    </>
  );
};

export default AddToPortfolioChip;
