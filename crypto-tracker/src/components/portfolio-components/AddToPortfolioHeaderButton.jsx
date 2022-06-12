import { AddCircle } from "@mui/icons-material";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const AddToPortfolioHeaderButton = () => {
  const useAppContext = useContext(AppContext);
  const { dispatchAppContext } = useAppContext;

  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<AddCircle sx={{ color: "secondary.main" }} />}
        size={isSmallDevice ? "medium" : "large"}
        onClick={() =>
          dispatchAppContext({ type: "handleTransactionClickOpen", payload: 1 })
        }
        sx={{
          color: "text.primary",
          bgColor: "secondary.dark",
          height: {
            xs: "100%",
            md: "100%",
          },
        }}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddToPortfolioHeaderButton;
