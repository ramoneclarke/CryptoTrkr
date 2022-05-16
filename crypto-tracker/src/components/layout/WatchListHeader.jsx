import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import AddToWatchListHeaderButton from "../AddToWatchListHeaderButton";
import AddToWatchListPopUpBox from "../AddToWatchListPopUpBox";
import CurrencySelector from "../CurrencySelector";
import FilterSearchBar from "../FilterSearchBar";
import PageTitle from "../PageTitle";

const MarketHeader = ({
  setFilterText,
  open,
  selectedValue,
  handleClickOpen,
  handleClose,
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
      />
      <CurrencySelector />
      <AddToWatchListHeaderButton handleClickOpen={handleClickOpen} />
      <AddToWatchListPopUpBox
        onClose={handleClose}
        selectedValue={selectedValue}
        open={open}
      />
      {!isSmallDevice && (
        <Stack width="600px" alignItems="center" justifyContent="center">
          <PageTitle title="Watch List" />
        </Stack>
      )}
    </Box>
  );
};

export default MarketHeader;
