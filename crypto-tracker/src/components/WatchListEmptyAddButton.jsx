import { Box, Button, Paper, Typography } from "@mui/material";
import { AddCircle } from "@mui/icons-material/";
import React from "react";

const WatchListEmptyAddButton = () => {
  return (
    <Box>
      <Button
        variant="text"
        startIcon={<AddCircle sx={{ color: "secondary.main" }} />}
        size="large"
        sx={{ color: "text.primary" }}
      >
        Add to WatchList
      </Button>
    </Box>
  );
};

export default WatchListEmptyAddButton;
