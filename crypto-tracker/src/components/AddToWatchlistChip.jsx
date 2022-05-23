import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import React from "react";

const AddToWatchlistChip = () => {
  return (
    <IconButton>
      <Visibility sx={{ color: "chip.watch" }} />
    </IconButton>
  );
};

export default AddToWatchlistChip;
