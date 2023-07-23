import React from "react";
import { createContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "./AppContext";
import { useContext } from "react";
import { useReducer } from "react";
export const DataContext = createContext();

const initialState = {
  coinData: [],
  tickers: [],
  isLoading: false,
  coinPrices: {},
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
    case "updateCoinPrices":
      return {
        ...state,
        coinPrices: { ...action.payload },
      };
    default:
      return state;
  }
};

const DataContextProvider = ({ children }) => {
  const [state, dispatchDataContext] = useReducer(reducer, initialState);
  const { coinData, isLoading, coinPrices } = state;
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
        console.log(res.data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.activeCurrency.code]);

  // Update coin prices
  useEffect(() => {
    let updatedPrices = coinData.reduce(
      (obj, item) => ({ ...obj, [item.id]: item.current_price }),
      {}
    );
    dispatchDataContext({ type: "updateCoinPrices", payload: updatedPrices });
  }, [coinData]);

  return (
    <DataContext.Provider value={{ coinData, isLoading, coinPrices }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
