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

// const today = new Date()

const TransactionForm = ({ transactionType, handleClose }) => {
  const useDataContext = useContext(DataContext);
  const { coinPrices } = useDataContext;
  const useUserContext = useContext(UserContext);
  const { dispatchUserContext, selectedCoin } = useUserContext;
  const useAppContext = useContext(AppContext);
  const { settings, transaction } = useAppContext;
  const { transactionStepNum } = transaction;

  const { enqueueSnackbar } = useSnackbar();

  const [dateValue, setDateValue] = useState(new Date());
  const [formValues, setFormValues] = useState({
    price: coinPrices[selectedCoin.id],
    quantity: 1,
    date: dateValue,
  });

  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
      {transactionStepNum !== 1 && <BuySellToggleButton />}
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
            />
            <TextField
              variant="standard"
              id="quantity-input"
              name="quantity"
              label="Quantity"
              type="number"
              value={formValues.quantity}
              onChange={handleInputChange}
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
