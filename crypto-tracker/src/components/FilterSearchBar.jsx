import { Search } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import React from "react";

const FilterSearchBar = ({ placeholder }) => {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: {
          xs: "90%",
          md: 400,
        },
        ml: {
          md: 3,
        },
      }}
    >
      <IconButton>
        <Search sx={{ color: "text.secondary" }} />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ "aria-label": "filter" }}
      />
    </Paper>
  );
};

export default FilterSearchBar;
