import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import CurrencySelector from "../shared-components/CurrencySelector";
import FilterSearchBar from "../shared-components/FilterSearchBar";
import PageTitle from "./PageTitle";
import AddToPortfolioHeaderButton from "../portfolio-components/AddToPortfolioHeaderButton";
import AddTransaction from "../portfolio-components/AddTransaction";

const PortfolioHeader = ({
  setFilterText,
  selectedCoin,
  setSelectedCoin,
  transactionOpen,
  handleTransactionClickOpen,
  handleTransactionClose,
  transactionStepNum,
  setTransactionStepNum,
}) => {
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
        flexWrap: {
          xs: "wrap",
          md: "nowrap",
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
      <AddToPortfolioHeaderButton
        handleTransactionClickOpen={handleTransactionClickOpen}
      />
      <AddTransaction
        open={transactionOpen}
        onClose={handleTransactionClose}
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
        transactionStepNum={transactionStepNum}
        setTransactionStepNum={setTransactionStepNum}
      />
      {!isSmallDevice && (
        <Stack width="600px" alignItems="center" justifyContent="center">
          <PageTitle title="My Portfolio" />
        </Stack>
      )}
    </Box>
  );
};

export default PortfolioHeader;
