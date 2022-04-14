import { Box, Typography } from "@mui/material";
import { StackedLineChart } from "@mui/icons-material";
import React from "react";

const Logo = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      mt="2rem"
      mb="2rem"
    >
      <StackedLineChart sx={{ color: "secondary.light" }} />
      <Typography variant="h5" color="secondary.light">
        CryptoTracker
      </Typography>
    </Box>
  );
};

export default Logo;
