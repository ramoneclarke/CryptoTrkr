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
      // <Grid
      //   container
      //   sx={{
      //     display: "flex",
      //     justifyContent: "flex-start",
      //     alignItems: "flex-start",
      //   }}
      // >
      //   <Grid item xs={12} height="15%">
      //     <MarketHeader />
      //   </Grid>
      //   <Grid item xs={12} height="85%">
      //     <MarketTable />
      //   </Grid>
      // </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
          // border: "3px solid green",
        }}
      >
        <MarketHeader />
        <MarketTable />
      </Box>
    );
  }
};

export default Market;
