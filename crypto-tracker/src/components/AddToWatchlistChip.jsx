import { Avatar, Chip, IconButton, Badge } from "@mui/material";
import { Add, Star } from "@mui/icons-material";
import React from "react";

const AddToWatchlistChip = () => {
  return (
    <IconButton>
      <Star sx={{ color: "chip.watch" }} />
    </IconButton>
  );
};

export default AddToWatchlistChip;
