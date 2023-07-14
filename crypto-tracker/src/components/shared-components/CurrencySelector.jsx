import { MenuItem, Select } from "@mui/material";
import React from "react";
import { ExpandMore } from "@mui/icons-material";
import useLocalStorage from "../../hooks/useLocalStorage";
import { supportedCurrencies } from "../../utils/currencies";

const CurrencySelector = () => {
  const [activeCurrency, setActiveCurrency] = useLocalStorage(
    "active currency",
    { code: "usd", symbol: "$" }
  );

  const handleChange = (e) => {
    if (e.target.value !== "") {
      setActiveCurrency(supportedCurrencies[e.target.value]);
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
      value={activeCurrency.code}
      onChange={handleChange}
      sx={{
        bgcolor: "secondary.dark",
        minWidth: {
          xs: "20px",
          md: "80px",
        },
        height: {
          xs: "2rem",
          md: "3rem",
        },
        margin: {
          md: "0 1rem 0 1rem",
        },
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
