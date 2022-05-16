import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import WatchListEmptyAddButton from "./WatchListEmptyAddButton";
import WatchListEmptyCard from "./WatchListEmptyAddButton";

const DataGridCustomNoRowsOverlay = ({ filterText, page }) => {
  if (page === "market") {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        sx={{ mt: 1 }}
      >
        {filterText === "" ? (
          <CircularProgress size={75} sx={{ color: "text.primary" }} />
        ) : (
          <Typography variant="h4">No results for '{filterText}'</Typography>
        )}
      </Box>
    );
  } else if (page === "watchlist") {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        sx={{ mt: 1 }}
      >
        {filterText === "" ? (
          <Typography>Watchlist empty</Typography>
        ) : (
          <Typography variant="h4">No results for '{filterText}'</Typography>
        )}
      </Box>
    );
  }
};

export default DataGridCustomNoRowsOverlay;
