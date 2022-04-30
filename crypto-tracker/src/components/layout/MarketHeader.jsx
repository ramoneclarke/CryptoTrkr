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
