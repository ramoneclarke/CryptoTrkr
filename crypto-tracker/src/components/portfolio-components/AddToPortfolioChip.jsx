import { IconButton } from "@mui/material";
import { AccountBalanceWallet } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";
import moment from "moment";
import { DataContext } from "../../context/DataContext";

const AddToPortfolioChip = ({ cellValues, enqueueSnackbar }) => {
  const useUserContext = useContext(UserContext);
  const {
    portfolio,
    transactionHistory,
    portfolioTransactions,
    dispatchUserContext,
    portfolioBalance,
  } = useUserContext;
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
      // dispatchUserContext({
      //   type: "removeFromPortfolio",
      //   payload: cellValues.id,
      // });

      dispatchUserContext({
        type: "addTransaction",
        payload: {
          id: cellValues.id,
          type: "buy",
          quantity: 30,
          currency: "usd",
          date: moment(),
        },
      });
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
    // portfolio.includes(cellValues.id)
    //   ? toggleWatchCoin("remove", cellValues.id, cellValues.row.name)
    //   : toggleWatchCoin("add", cellValues.id, cellValues.row.name);
  };

  // useEffect(() => {
  //   console.log(portfolio);
  // }, [portfolio]);

  // const toggleWatchCoin = (action, id, coinName) => {
  //   let message = "";
  //   action === "remove"
  //     ? (message = (
  //         <Stack direction="row" alignItems="center" justifyContent="center">
  //           <VisibilityOff sx={{ mr: "0.5rem" }} />
  //           {`${coinName} has been removed from your watchlist`}
  //         </Stack>
  //       ))
  //     : (message = (
  //         <Stack direction="row" alignItems="center" justifyContent="center">
  //           <Visibility sx={{ mr: "0.5rem" }} />
  //           {`${coinName} has been added to your watchlist`}
  //         </Stack>
  //       ));

  // enqueueSnackbar(message, {
  //   // TransitionComponent: Zoom,
  //   preventDuplicate: true,
  //   sx: {
  //     "& .SnackbarContent-root": {
  //       color: "text.primary",
  //       backgroundColor: "secondary.dark",
  //     },
  //     "& .SnackbarItem-wrappedRoot": {
  //       borderRadius: "22px",
  //     },
  //   },
  // });

  // };

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
