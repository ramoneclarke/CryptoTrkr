import {
  Box,
  Button,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { AppContext } from "../../context/AppContext";
import BuySellToggleButton from "./BuySellToggleButton";
import { DataContext } from "../../context/DataContext";
import { useSnackbar } from "notistack";
import { AccountBalanceWallet } from "@mui/icons-material";
import { useEffect } from "react";

const priceRegex = /^[1-9]\d*(\.\d+)?$|^0\.\d+?$/;

const TransactionForm = ({ transactionType, handleClose }) => {
  const useDataContext = useContext(DataContext);
  const { coinPrices } = useDataContext;
  const useUserContext = useContext(UserContext);
  const { dispatchUserContext, selectedCoin, portfolio } = useUserContext;
  const useAppContext = useContext(AppContext);
  const { settings, transaction } = useAppContext;
  const { transactionStepNum } = transaction;

  const { enqueueSnackbar } = useSnackbar();

  const [dateValue, setDateValue] = useState(new Date());
  const [formValues, setFormValues] = useState({
    price: coinPrices[selectedCoin.id],
    quantity: "",
    date: dateValue,
  });
  const [priceHelperText, setPriceHelperText] = useState("");
  const [quantityHelperText, setQuantityHelperText] =
    useState("Enter the quantity");
  const [priceError, setPriceError] = useState(false);
  const [quantityError, setQuantityError] = useState(true);

  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));

  const validateForm = (name, value, stepNum) => {
    if (name === "price") {
      if (value === "") {
        setPriceError(true);
        setPriceHelperText("Enter the quantity");
      } else if (!priceRegex.test(value)) {
        setPriceError(true);
        setPriceHelperText("Invalid format");
      } else {
        setPriceError(false);
        setPriceHelperText("");
      }
    } else if (name === "quantity") {
      if (
        portfolio[selectedCoin.id] &&
        stepNum === 3 &&
        value > portfolio[selectedCoin.id].holdings
      ) {
        // if a sell transaction, check to ensure the sell quantity is not more than the held quantity
        setQuantityError(true);
        setQuantityHelperText(
          `You are unable to sell more ${selectedCoin.name} than you hold`
        );
      } else if (value === "") {
        setQuantityError(true);
        setQuantityHelperText("Enter the quantity");
      } else if (!priceRegex.test(value)) {
        setQuantityError(true);
        setQuantityHelperText("Invalid format");
      } else {
        setQuantityError(false);
        setQuantityHelperText("");
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
    if (!priceError && !quantityError) {
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
    <Box
      sx={{
        width: "inherit",
        height: "inherit",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-Start",
        alignItems: "center",
      }}
    >
      <DialogTitle sx={{ fontSize: "1.8rem" }}>{selectedCoin.name}</DialogTitle>
      {transactionStepNum !== 1 && (
        <BuySellToggleButton
          validateForm={validateForm}
          quantity={formValues.quantity}
        />
      )}
      <Box sx={{ width: "80%", mt: "1.5rem" }}>
        <form onSubmit={handleSubmit}>
          <Stack direction="column" spacing={5} w="100%">
            <TextField
              variant="standard"
              fullWidth
              id="price-input"
              name="price"
              label="Price"
              type="number"
              value={formValues.price}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {settings.activeCurrency.symbol}
                  </InputAdornment>
                ),
              }}
              onChange={handleInputChange}
              error={priceError}
              helperText={priceHelperText}
            />
            <TextField
              variant="standard"
              id="quantity-input"
              name="quantity"
              label="Quantity"
              type="number"
              value={formValues.quantity}
              onChange={handleInputChange}
              error={quantityError}
              helperText={quantityHelperText}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {isSmallDevice ? (
                <MobileDatePicker
                  label="Date"
                  inputFormat="dd/MM/yyyy"
                  value={dateValue}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      {...params}
                      sx={{
                        svg: { color: "chip.default" },
                      }}
                    />
                  )}
                />
              ) : (
                <DesktopDatePicker
                  label="Date"
                  inputFormat="dd/MM/yyyy"
                  value={dateValue}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      {...params}
                      sx={{
                        svg: { color: "chip.default" },
                      }}
                    />
                  )}
                />
              )}
            </LocalizationProvider>
            <Button variant="contained" color="secondary" type="submit">
              Save
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default TransactionForm;
