import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import CurrencySelector from "../CurrencySelector";
import FilterSearchBar from "../FilterSearchBar";

const MarketHeader = () => {
  return (
    <Box
      sx={{
        mt: {
          xs: 2,
          md: 5,
        },
        mb: {
          xs: 1,
          md: 2,
        },
        width: {
          xs: "100%",
        },
        display: "flex",
        justifyContent: {
          xs: "center",
          md: "flex-start",
        },
      }}
    >
      <FilterSearchBar placeholder="Filter coins..." />
    </Box>
  );
};

export default MarketHeader;
