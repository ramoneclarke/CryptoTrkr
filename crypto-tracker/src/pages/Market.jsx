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
      // <Stack direction="row" spacing={2} sx={{ width: "100%", height: "100%" }}>
      //   <Box sx={{ border: "3px solid red" }}></Box>
      //   <Box sx={{ border: "3px solid blue" }}></Box>
      // </Stack>
      <Grid container spacing={0.5} border="3px solid blue">
        <Grid item xs={9} border="3px solid red">
          <MarketHeader />
          <MarketTable />
        </Grid>
        <Grid item xs={3} border="3px solid green">
          Coin info bar
        </Grid>
      </Grid>
    );
  }
};

export default Market;
