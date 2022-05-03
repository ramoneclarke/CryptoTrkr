import { IconButton } from "@mui/material";
import { AccountBalanceWallet } from "@mui/icons-material";
import React from "react";

const AddToPortfolioChip = () => {
  return (
    <IconButton>
      <AccountBalanceWallet sx={{ color: "chip.portfolio" }} />
    </IconButton>
  );
};

export default AddToPortfolioChip;
