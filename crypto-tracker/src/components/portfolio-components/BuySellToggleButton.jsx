import {
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.1),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const BuySellToggleButton = ({ validateForm, quantity }) => {
  const useAppContext = useContext(AppContext);
  const { dispatchAppContext, transaction } = useAppContext;
  const { transactionStepNum } = transaction;

  const handleType = (event, newStep) => {
    if (newStep !== null) {
      dispatchAppContext({ type: "setTransactionStepNum", payload: newStep });
      // re-validate form on change from buy/sell page
      let step;
      transactionStepNum === 2 ? (step = 3) : (step = 2);
      validateForm("quantity", quantity, step);
    }
  };
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          border: (theme) => `1px solid ${theme.palette.primary.dark}`,
          flexWrap: "wrap",
          width: "15rem",
          mb: 1,
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={transactionStepNum}
          exclusive
          fullWidth
          onChange={handleType}
          aria-label="transaction type"
          color="secondary"
        >
          <ToggleButton
            value={2}
            aria-label="buy"
            disableFocusRipple
            sx={{ color: "text.secondary" }}
            data-test="buy-toggle"
          >
            <Typography>Buy</Typography>
          </ToggleButton>
          <ToggleButton
            value={3}
            aria-label="sell"
            disableFocusRipple
            sx={{ color: "text.secondary" }}
            data-test="sell-toggle"
          >
            <Typography>Sell</Typography>
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </>
  );
};

export default BuySellToggleButton;
