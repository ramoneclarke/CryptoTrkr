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
  portfolio: {
    priceErrorPortfolio: false,
    priceHelperTextPortfolio: "",
    quantityErrorPortfolio: false,
    quantityHelperTextPortfolio: "",
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
    case "setPriceHelperTextPortfolio":
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          priceHelperTextPortfolio: action.payload,
        },
      };
    case "setPriceErrorPortfolio":
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          priceErrorPortfolio: action.payload,
        },
      };
    case "setQuantityHelperTextPortfolio":
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          quantityHelperTextPortfolio: action.payload,
        },
      };
    case "setQuantityErrorPortfolio":
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          quantityErrorPortfolio: action.payload,
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

  const { settings, transaction, alert, portfolio } = state;
  const { priceError, priceHelperText } = alert;
  const {
    priceErrorPortfolio,
    priceHelperTextPortfolio,
    quantityErrorPortfolio,
    quantityHelperTextPortfolio,
  } = portfolio;

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
        priceErrorPortfolio,
        priceHelperTextPortfolio,
        quantityErrorPortfolio,
        quantityHelperTextPortfolio,
        dispatchAppContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
