import React from "react";
import { createContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "./AppContext";
import { useContext } from "react";
import { useReducer } from "react";
import { useState } from "react";
export const DataContext = createContext();

const initialState = {
  coinData: [],
  tickers: [],
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setCoinData":
      return {
        ...state,
        coinData: action.payload,
      };
    case "setTickers":
      return {
        ...state,
        tickers: action.payload,
      };
    case "setIsLoading":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const DataContextProvider = ({ children }) => {
  const [state, dispatchDataContext] = useReducer(reducer, initialState);
  const { coinData, isLoading } = state;
  const useAppContext = useContext(AppContext);
  const { settings } = useAppContext;

  const getCoinData = () => {
    if (coinData === []) {
      dispatchDataContext({ type: "setCoinData", payload: [] });
      dispatchDataContext({ type: "setisLoading", payload: true });
    }
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${settings.activeCurrency.code}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h%2C7d`
      )
      .then((res) => {
        dispatchDataContext({ type: "setisLoading", payload: false });
        dispatchDataContext({ type: "setCoinData", payload: res.data });
      })
      .catch((err) => console.log(err));
  };

  // Fetch data

  useEffect(() => {
    getCoinData();
    const interval = setInterval(getCoinData, 30000);
    return () => {
      clearInterval(interval);
    };
  }, [settings.activeCurrency.code]);

  return (
    <DataContext.Provider value={{ coinData, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
