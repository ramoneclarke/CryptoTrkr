import { Search } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";

const FilterSearchBar = ({ placeholder, setFilterText, ML, MB, width }) => {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    event.preventDefault();
    setText(event.target.value);
    setFilterText(event.target.value);
  };

  const inputRef = React.useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current.focus();
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: width,
        height: "3.5rem",
        ml: ML,
        mb: MB,
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
        inputRef={inputRef}
      />
    </Paper>
  );
};

export default FilterSearchBar;
