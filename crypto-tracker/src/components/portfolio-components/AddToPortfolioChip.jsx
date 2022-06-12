import { IconButton } from "@mui/material";
import { AccountBalanceWallet } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { AppContext } from "../../context/AppContext";

const AddToPortfolioChip = ({ cellValues }) => {
  const useUserContext = useContext(UserContext);
  const { portfolio, dispatchUserContext } = useUserContext;
  const useDataContext = useContext(DataContext);
  const { coinData } = useDataContext;
  const useAppContext = useContext(AppContext);
  const { dispatchAppContext } = useAppContext;

  const [chipColor, setChipColor] = useState("chip.watch");

  // Refresh table data to change watchlist/portfolio chip colours on every change
  useEffect(() => {
    if (cellValues.row.portfolioActive) {
      setChipColor("chip.portfolioActive");
    } else {
      setChipColor("chip.portfolio");
    }
  }, [cellValues, setChipColor]);

  const handleCellButtonClick = (event, cellValues) => {
    if (cellValues.id in portfolio) {
      dispatchUserContext({
        type: "setSelectedCoin",
        payload: { id: cellValues.id, name: cellValues.row.name },
      });
      dispatchAppContext({ type: "handleTransactionClickOpen", payload: 2 });
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
        <AccountBalanceWallet sx={{ color: chipColor }} />
      </IconButton>
    </>
  );
};

export default AddToPortfolioChip;
