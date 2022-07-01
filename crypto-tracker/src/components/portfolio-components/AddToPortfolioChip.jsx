import { Dialog, IconButton, Stack } from "@mui/material";
import { AccountBalanceWallet } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { AppContext } from "../../context/AppContext";
import { priceRegex } from "../../utils/priceRegex";
import AddToPortfolioPopUp from "./AddToPortfolioPopUp";

const AddToPortfolioChip = ({ cellValues, enqueueSnackbar }) => {
  const useUserContext = useContext(UserContext);
  const { portfolio, dispatchUserContext, selectedCoin } = useUserContext;
  const useAppContext = useContext(AppContext);
  const {
    dispatchAppContext,
    priceErrorPortfolio: priceError,
    quantityErrorPortfolio: quantityError,
  } = useAppContext;
  const useDataContext = useContext(DataContext);
  const { coinPrices } = useDataContext;

  const [chipColor, setChipColor] = useState("chip.watch");
  const [dateValue, setDateValue] = useState(new Date());
  const [formValues, setFormValues] = useState({
    price: coinPrices[selectedCoin.id],
    quantity: "",
    date: dateValue,
  });
  const [transactionStepNum, setTransactionStepNum] = useState(2);
  const [popUpOpen, setPopUpOpen] = useState(false);

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
      setTransactionStepNum(2);
      setPopUpOpen(true);
    } else {
      dispatchUserContext({
        type: "addToPortfolio",
        payload: cellValues.id,
      });
      dispatchUserContext({
        type: "setSelectedCoin",
        payload: { id: cellValues.id, name: cellValues.row.name },
      });
      setTransactionStepNum(2);
      setPopUpOpen(true);
    }
    setFormValues({
      price: coinPrices[cellValues.id],
      quantity: "",
      date: dateValue,
    });
  };

  const handleClose = () => {
    setTransactionStepNum(0);
    setPopUpOpen(false);
    dispatchAppContext({ type: "setPriceErrorPortfolio", payload: false });
    dispatchAppContext({
      type: "setPriceHelperTextPortfolio",
      payload: "",
    });
    dispatchAppContext({
      type: "setQuantityErrorPortfolio",
      payload: false,
    });
    dispatchAppContext({
      type: "setQuantityHelperTextPortfolio",
      payload: "",
    });
  };

  const validateForm = (name, value, stepNum) => {
    if (name === "price") {
      if (value === "") {
        dispatchAppContext({ type: "setPriceErrorPortfolio", payload: true });
        dispatchAppContext({
          type: "setPriceHelperTextPortfolio",
          payload: "Enter the price",
        });
      } else if (!priceRegex.test(value)) {
        dispatchAppContext({ type: "setPriceErrorPortfolio", payload: true });
        dispatchAppContext({
          type: "setPriceHelperTextPortfolio",
          payload: "Invalid format",
        });
      } else {
        dispatchAppContext({ type: "setPriceErrorPortfolio", payload: false });
        dispatchAppContext({
          type: "setPriceHelperTextPortfolio",
          payload: "",
        });
      }
    } else if (name === "quantity") {
      if (
        portfolio[selectedCoin.id] &&
        stepNum === 3 &&
        value > portfolio[selectedCoin.id].holdings
      ) {
        // if a sell transaction, check to ensure the sell quantity is not more than the held quantity
        dispatchAppContext({
          type: "setQuantityErrorPortfolio",
          payload: true,
        });
        dispatchAppContext({
          type: "setQuantityHelperTextPortfolio",
          payload: `You are unable to sell more ${selectedCoin.name} than you hold`,
        });
      } else if (value === "") {
        dispatchAppContext({
          type: "setQuantityErrorPortfolio",
          payload: true,
        });
        dispatchAppContext({
          type: "setQuantityHelperTextPortfolio",
          payload: "Enter the quantity",
        });
      } else if (!priceRegex.test(value)) {
        dispatchAppContext({
          type: "setQuantityErrorPortfolio",
          payload: true,
        });
        dispatchAppContext({
          type: "setQuantityHelperTextPortfolio",
          payload: "Invalid format",
        });
      } else {
        dispatchAppContext({
          type: "setQuantityErrorPortfolio",
          payload: false,
        });
        dispatchAppContext({
          type: "setQuantityHelperTextPortfolio",
          payload: "",
        });
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    validateForm(name, value, transactionStepNum);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleDateChange = (newDate) => {
    setDateValue(newDate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const transactionType = transactionStepNum === 2 ? "buy" : "sell";
    if (!priceError && !quantityError && formValues.quantity !== "") {
      dispatchUserContext({
        type: "addTransaction",
        payload: {
          id: selectedCoin.id,
          type: transactionType,
          quantity: Number(formValues.quantity),
          date: formValues.date,
        },
      });
      handleClose();
      togglePortfolioSnackbar(transactionType, selectedCoin.name);
    } else if (!priceError && !quantityError && formValues.quantity === "") {
      validateForm("quantity", formValues.quantity, transactionStepNum);
    }
  };

  const togglePortfolioSnackbar = (action, coinName) => {
    let message = "";
    action === "buy"
      ? (message = (
          <Stack direction="row" alignItems="center" justifyContent="center">
            <AccountBalanceWallet sx={{ mr: "0.5rem" }} />
            {`${coinName} has been added to your portfolio`}
          </Stack>
        ))
      : (message = (
          <Stack direction="row" alignItems="center" justifyContent="center">
            <AccountBalanceWallet sx={{ mr: "0.5rem" }} />
            {`${coinName} has been removed from your portfolio`}
          </Stack>
        ));

    enqueueSnackbar(message, {
      preventDuplicate: true,
      sx: {
        "& .SnackbarContent-root": {
          color: "text.primary",
          backgroundColor: "secondary.dark",
        },
        "& .SnackbarItem-wrappedRoot": {
          borderRadius: "22px",
        },
      },
    });
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
      <Dialog
        onClose={handleClose}
        open={popUpOpen}
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
        <AddToPortfolioPopUp
          transactionStepNum={transactionStepNum}
          handleSubmit={handleSubmit}
          formValues={formValues}
          handleInputChange={handleInputChange}
          // priceError={priceError}
          // quantityError={quantityError}
          // quantityHelperText={quantityHelperText}
          dateValue={dateValue}
          handleDateChange={handleDateChange}
        />
      </Dialog>
    </>
  );
};

export default AddToPortfolioChip;
