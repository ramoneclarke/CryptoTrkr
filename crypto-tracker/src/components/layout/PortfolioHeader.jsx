import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import CurrencySelector from "../shared-components/CurrencySelector";
import FilterSearchBar from "../shared-components/FilterSearchBar";
import PageTitle from "./PageTitle";
import AddToPortfolioHeaderButton from "../portfolio-components/AddToPortfolioHeaderButton";
import AddTransaction from "../portfolio-components/AddTransaction";
import PortfolioBalance from "../portfolio-components/PortfolioBalance";

const PortfolioHeader = ({ setFilterText }) => {
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
        alignItems: {
          md: "flex-end",
        },
        flexWrap: {
          xs: "wrap",
          md: "nowrap",
        },
      }}
    >
      {isSmallDevice ? (
        <>
          <PortfolioBalance />
          <Stack direction="row" spacing={1} mt="1rem">
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
            <AddToPortfolioHeaderButton />
            <AddTransaction />
          </Stack>
        </>
      ) : (
        <Stack direction="row" alignItems="center">
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
          <Stack height="3.5rem" direction="row" alignItems="center">
            <CurrencySelector />
            <AddToPortfolioHeaderButton />
            <AddTransaction />
          </Stack>
          <PortfolioBalance />
        </Stack>
      )}
    </Box>
  );
};

export default PortfolioHeader;
