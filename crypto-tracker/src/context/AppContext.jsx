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

export const AppContextProvider = ({ children }) => {
  //   const [coinList, setListData] = useState([]);
  //   const [activeCurrency, setActiveCurrency] = useState("");
  //   const [settings, setSettings] = useState({});
  const [state, dispatchAppContext] = useReducer(reducer, initialState);

  const { settings } = state;

  const supportedCurrencies = [
    "usd",
    "eur",
    "gbp",
    "jpy",
    "cny",
    "idr",
    "krw",
    "twd",
    "btc",
    "eth",
    "ltc",
    "bnb",
  ];

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
    dispatchAppContext({ type: "setActiveCurrency", payload: "gbp" });
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
