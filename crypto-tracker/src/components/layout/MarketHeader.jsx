import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import CurrencySelector from "../CurrencySelector";
import FilterSearchBar from "../FilterSearchBar";

const MarketHeader = () => {
  return (
    // <Grid container mt={5} mb={2}>
    //   {/* <Grid
    //     item
    //     xs={12}
    //     sx={{
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Typography variant="h3">Market</Typography>
    //   </Grid> */}
    //   <Grid item xs={6}>
    //     <FilterSearchBar placeholder="Filter coins..." />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <CurrencySelector currentCurrency={"gbp"} />
    //   </Grid>
    // </Grid>
    <Box mt={5} mb={2}>
      <FilterSearchBar placeholder="Filter coins..." />
    </Box>
  );
};

export default MarketHeader;
