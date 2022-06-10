import {
  Box,
  Button,
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

// const today = new Date()

const TransactionForm = ({ price, id, transactionType, handleClose }) => {
  const useUserContext = useContext(UserContext);
  const {
    dispatchUserContext,
    portfolio,
    portfolioTransactions,
    transactionHistory,
  } = useUserContext;
  const useAppContext = useContext(AppContext);
  const { settings } = useAppContext;

  const [dateValue, setDateValue] = useState(new Date());
  const [formValues, setFormValues] = useState({
    price: price,
    quantity: 0,
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
        id: id,
        type: transactionType,
        quantity: Number(formValues.quantity),
        date: formValues.date,
      },
    });
    handleClose();
    console.log(portfolio);
    console.log(portfolioTransactions);
    console.log(transactionHistory);
  };
  return (
    <Box sx={{ width: "90%", mt: "2rem" }}>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={6} w="100%">
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
  );
};

export default TransactionForm;
