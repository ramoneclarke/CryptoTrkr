import { Button } from "@mui/material";
import { AddCircle } from "@mui/icons-material/";
import React from "react";

const WatchListEmptyAddButton = () => {
  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddCircle sx={{ color: "secondary.main" }} />}
        size="large"
        sx={{ color: "text.primary" }}
        onClick={() => alert("clicked")}
      >
        Add to WatchList
      </Button>
    </>
  );
};

export default WatchListEmptyAddButton;
