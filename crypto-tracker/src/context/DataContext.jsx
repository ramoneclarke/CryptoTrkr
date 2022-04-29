import React from "react";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "./AppContext";
import { useContext } from "react";
import useFetch from "../utils/useFetch";
export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [coinData, setCoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const useAppContext = useContext(AppContext);
  const { settings } = useAppContext;

  // Fetch data
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${settings.activeCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C%204d`
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [settings.activeCurrency]);

  const { data, loading, error } = useFetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${settings.activeCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C%204d`
  );

  useEffect(() => {
    setCoinData(data);
    setIsLoading(loading);
  }, [data, loading]);

  return (
    <DataContext.Provider value={{ coinData }} loading={{ isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
