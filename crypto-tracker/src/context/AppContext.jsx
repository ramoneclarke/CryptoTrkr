import axios from "axios";
import React from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();

const initialState = {
  settings: {
    activeCurrency: "gbp",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setActiveCurrency":
      return {
        settings: {
          ...state.settings,
          activeCurrency: action.payload,
        },
      };
    default:
      return state;
  }
};

const supportedCurrencies = {
  usd: { code: "usd", symbol: "$" },
  eur: { code: "eur", symbol: "€" },
  gbp: { code: "gbp", symbol: "£" },
  jpy: { code: "jpy", symbol: "¥" },
  cny: { code: "cny", symbol: "¥" },
  inr: { code: "inr", symbol: "₹" },
  krw: { code: "krw", symbol: "₩" },
  btc: { code: "btc", symbol: "₿" },
  eth: { code: "eth", symbol: "Ξ" },
  ltc: { code: "ltc", symbol: "Ł" },
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatchAppContext] = useReducer(reducer, initialState);

  const { settings } = state;

  // Fetch supported currencies
  //   useEffect(() => {
  //     axios
  //       .get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  // Set initial settings
  useEffect(() => {
    dispatchAppContext({
      type: "setActiveCurrency",
      payload: supportedCurrencies.gbp,
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        settings,
        supportedCurrencies,
        dispatchAppContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
