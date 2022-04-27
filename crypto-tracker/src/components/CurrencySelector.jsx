import { MenuItem, Select } from "@mui/material";
import React from "react";
import { ExpandMore } from "@mui/icons-material";
import { useState } from "react";

const CurrencySelector = ({ currentCurrency, currencies }) => {
  const [currency, setCurrency] = useState(currentCurrency);

  const handleChange = (e) => {
    setCurrency(e.target.value);
  };

  const menuProps = {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };
  return (
    <Select
      disableUnderline
      // sx={{}}
      MenuProps={menuProps}
      IconComponent={ExpandMore}
      value={currency}
      onChange={handleChange}
      sx={{
        bgcolor: "background.paper",
        minWidth: "80px",
      }}
    >
      <MenuItem value={"usd"}>USD</MenuItem>
      <MenuItem value={"gbp"}>GBP</MenuItem>
      <MenuItem value={"euro"}>Euro</MenuItem>
      <MenuItem value={"cad"}>CAD</MenuItem>
    </Select>
  );
};

export default CurrencySelector;
