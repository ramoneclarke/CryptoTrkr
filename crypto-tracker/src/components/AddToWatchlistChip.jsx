import { IconButton } from "@mui/material";
import { Star } from "@mui/icons-material";
import React from "react";

const AddToWatchlistChip = () => {
  return (
    <IconButton>
      <Star sx={{ color: "chip.watch" }} />
    </IconButton>
  );
};

export default AddToWatchlistChip;
