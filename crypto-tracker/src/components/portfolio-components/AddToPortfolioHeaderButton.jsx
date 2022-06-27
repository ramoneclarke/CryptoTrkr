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
        color="primary"
        size={isSmallDevice ? "medium" : "large"}
        onClick={() =>
          dispatchAppContext({ type: "handleTransactionClickOpen", payload: 1 })
        }
        sx={{
          color: "text.primary",
          bgColor: "secondary.dark",
          height: {
            xs: "3.5rem",
            md: "3rem",
          },
        }}
      >
        <AddCircle sx={{ color: "secondary.main" }} />
      </Button>
    </Box>
  );
};

export default AddToPortfolioHeaderButton;
