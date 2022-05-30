import { AddCircle } from "@mui/icons-material";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const AddToWatchListHeaderButton = ({ handleClickOpen }) => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<AddCircle sx={{ color: "secondary.main" }} />}
        size={isSmallDevice ? "medium" : "large"}
        onClick={handleClickOpen}
        sx={{
          color: "text.primary",
          bgColor: "secondary.dark",
          height: {
            xs: "100%",
            md: "100%",
          },
        }}
      >
        Watch
      </Button>
    </Box>
  );
};

export default AddToWatchListHeaderButton;
