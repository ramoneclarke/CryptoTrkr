import { Avatar, Badge, Chip, IconButton } from "@mui/material";
import { Add, AccountBalanceWallet } from "@mui/icons-material";
import React from "react";

const AddToPortfolioChip = () => {
  return (
    <IconButton>
      <AccountBalanceWallet sx={{ color: "chip.portfolio" }} />
    </IconButton>
  );
};

export default AddToPortfolioChip;
