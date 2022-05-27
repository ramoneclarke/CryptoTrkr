import React from "react";
import { Stack, Typography } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

const PriceChangeText = ({ percentageChange }) => {
  if (percentageChange < 0) {
    return (
      <Stack direction="row">
        <ArrowDropDown sx={{ color: "change.loss" }} />
        <Typography variant="body1" color="change.loss">
          {Math.abs(percentageChange)}%
        </Typography>
      </Stack>
    );
  } else {
    return (
      <Stack direction="row">
        <ArrowDropUp sx={{ color: "change.gain" }} />
        <Typography variant="body1" color="change.gain">
          {Math.abs(percentageChange)}%
        </Typography>
      </Stack>
    );
  }
};

export default PriceChangeText;
