import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { UserContext } from "../../context/UserContext";

const PortfolioBalance = () => {
  const useAppContext = useContext(AppContext);
  const useUserContext = useContext(UserContext);

  const { settings } = useAppContext;
  const { portfolioBalance } = useUserContext;
  const { activeCurrency } = settings;

  return (
    <Box
      sx={{
        width: {
          md: "20rem",
        },
        ml: {
          md: "4rem",
        },
      }}
    >
      <Stack
        px={2}
        sx={{
          justifyContent: { xs: "center", md: "flex-start" },
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        <Typography variant="caption" display="block" color="text.secondary">
          Portfolio value
        </Typography>
        <Typography variant="h4" data-test="portfolio-value">
          {activeCurrency.symbol}
          {portfolioBalance}
        </Typography>
      </Stack>
    </Box>
  );
};

export default PortfolioBalance;
