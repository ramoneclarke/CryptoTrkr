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
import React, { useContext } from "react";
import {
  DesktopDatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers/";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AppContext } from "../../context/AppContext";
import { UserContext } from "../../context/UserContext";

const AddToPortfolioPopUp = ({
  handleSubmit,
  formValues,
  handleInputChange,
  dateValue,
  handleDateChange,
}) => {
  const useUserContext = useContext(UserContext);
  const { selectedCoin } = useUserContext;
  const useAppContext = useContext(AppContext);
  const {
    settings,
    priceErrorPortfolio: priceError,
    quantityErrorPortfolio: quantityError,
    quantityHelperTextPortfolio: quantityHelperText,
    priceHelperTextPortfolio: priceHelperText,
  } = useAppContext;
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));
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

export default AddToPortfolioPopUp;
