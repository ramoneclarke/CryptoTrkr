import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import CurrencySelector from "../shared-components/CurrencySelector";
import FilterSearchBar from "../shared-components/FilterSearchBar";
import PageTitle from "./PageTitle";

const MarketHeader = ({ setFilterText }) => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));
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
      <FilterSearchBar
        placeholder="Filter coins..."
        setFilterText={setFilterText}
        ML={{ md: 3 }}
        MB={{ xs: 1, md: 0 }}
        width={{
          xs: "90%",
          md: 400,
        }}
      />
      <CurrencySelector />
      {!isSmallDevice && (
        <Stack width="600px" alignItems="center" justifyContent="center">
          <PageTitle title="Live Market" />
        </Stack>
      )}
    </Box>
  );
};

export default MarketHeader;
