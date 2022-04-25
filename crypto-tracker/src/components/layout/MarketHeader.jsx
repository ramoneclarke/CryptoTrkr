import { Grid, Typography } from "@mui/material";
import React from "react";

const MarketHeader = () => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Market</Typography>
      </Grid>
      <Grid item xs={6}>
        Search box
      </Grid>
      <Grid item xs={6}>
        Toggle buttons
      </Grid>
    </Grid>
  );
};

export default MarketHeader;
