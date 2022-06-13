import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import AddToWatchListHeaderButton from "../watchlist-components/AddToWatchListHeaderButton";
import AddToWatchListPopUpBox from "../watchlist-components/AddToWatchListPopUpBox";
import CurrencySelector from "../shared-components/CurrencySelector";
import FilterSearchBar from "../shared-components/FilterSearchBar";
import PageTitle from "./PageTitle";

const WatchListHeader = ({
  setFilterText,
  open,
  handleClickOpen,
  handleClose,
  selectedValue,
  setSelectedValue,
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
        alignItems: {
          md: "flex-end",
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
      <AddToWatchListHeaderButton handleClickOpen={handleClickOpen} />
      <AddToWatchListPopUpBox
        onClose={handleClose}
        open={open}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
      {!isSmallDevice && (
        <Stack width="600px" alignItems="center" justifyContent="center">
          <PageTitle title="Watch List" />
        </Stack>
      )}
    </Box>
  );
};

export default WatchListHeader;
