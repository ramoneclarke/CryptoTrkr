import React from "react";
import { useState } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const AppContext = createContext();

const initialState = {
  settings: {
    activeCurrency: { code: "usd", symbol: "$" },
  },
  transaction: {
    transactionOpen: false,
    transactionStepNum: 0,
  },
  alert: {
    priceError: false,
    priceHelperText: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setActiveCurrency":
      return {
        ...state,
        settings: {
          ...state.settings,
          activeCurrency: action.payload,
        },
      };
    case "handleTransactionClickOpen":
      return {
        ...state,
        transaction: {
          transactionOpen: true,
          transactionStepNum: action.payload,
        },
      };
    case "handleTransactionClose":
      return {
        ...state,
        transaction: {
          transactionOpen: false,
          transactionStepNum: 0,
        },
      };
    case "setTransactionStepNum":
      return {
        ...state,
        transaction: {
          ...state.transaction,
          transactionStepNum: action.payload,
        },
      };
    case "setPriceHelperText":
      return {
        ...state,
        alert: {
          ...state.alert,
          priceHelperText: action.payload,
        },
      };
    case "setPriceError":
      return {
        ...state,
        alert: {
          ...state.alert,
          priceError: action.payload,
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
  const [currencies] = useState(supportedCurrencies);

  const { settings, transaction, alert } = state;
  const { priceError, priceHelperText } = alert;

  // Set initial settings
  useEffect(() => {
    dispatchAppContext({
      type: "setActiveCurrency",
      payload: supportedCurrencies.usd,
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        settings,
        supportedCurrencies,
        transaction,
        priceError,
        priceHelperText,
        dispatchAppContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
