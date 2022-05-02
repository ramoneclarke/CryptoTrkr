import { Search } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import React from "react";
import { useState } from "react";

const FilterSearchBar = ({ placeholder, setFilterText }) => {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    event.preventDefault();
    setText(event.target.value);
    setFilterText(event.target.value);
  };

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
      onSubmit={handleSubmit}
    >
      <IconButton>
        <Search sx={{ color: "text.secondary" }} />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        label="Filter"
        value={text}
        onChange={handleChange}
        inputProps={{ "aria-label": "filter" }}
      />
    </Paper>
  );
};

export default FilterSearchBar;
