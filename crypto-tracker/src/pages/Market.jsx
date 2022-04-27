import {
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import MarketHeader from "../components/layout/MarketHeader";
import MarketTable from "../components/layout/MarketTable";

const Market = () => {
  const theme = useTheme();

  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));

  if (isSmallDevice) {
    return (
      <Box sx={{ width: "100%", height: "100%" }}>
        <h1>Market mobile</h1>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <MarketHeader />
        <MarketTable />
      </Box>
    );
  }
};

export default Market;
