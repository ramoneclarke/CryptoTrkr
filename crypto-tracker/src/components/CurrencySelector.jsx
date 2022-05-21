import { MenuItem, Select } from "@mui/material";
import React from "react";
import { ExpandMore } from "@mui/icons-material";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const CurrencySelector = () => {
  const useAppContext = useContext(AppContext);
  const { settings, supportedCurrencies, dispatchAppContext } = useAppContext;

  const handleChange = (e) => {
    if (e.target.value !== "") {
      dispatchAppContext({
        type: "setActiveCurrency",
        payload: supportedCurrencies[e.target.value],
      });
    }
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
  };
  return (
    <Select
      MenuProps={menuProps}
      IconComponent={ExpandMore}
      value={settings.activeCurrency.code}
      onChange={handleChange}
      sx={{
        bgcolor: "secondary.dark",
        minWidth: {
          xs: "20px",
          md: "80px",
        },
        margin: "0 1rem 0 1rem",
      }}
    >
      {Object.keys(supportedCurrencies).map((currency, index) => (
        <MenuItem value={currency} key={index}>
          {`${supportedCurrencies[currency].symbol} ${currency.toUpperCase()}`}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CurrencySelector;
