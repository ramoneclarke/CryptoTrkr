import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import MarketHeader from "../components/layout/MarketHeader";
import MarketTable from "../components/layout/MarketTable";
import { AppContext } from "../context/AppContext";
import { DataContext } from "../context/DataContext";
import { UserContext } from "../context/UserContext";
import {
  largeCurrencyFormatter,
  numberFormatter,
  percentageFormatter,
} from "../utils/numberFormatters";

const Market = () => {
  const useDataContext = useContext(DataContext);
  const useAppContext = useContext(AppContext);
  const useUserContext = useContext(UserContext);
  const { coinData, isLoading } = useDataContext;
  const { settings } = useAppContext;
  const { activeCurrency: currency } = settings;
  const { watchList } = useUserContext;

  const [marketData, setMarketData] = useState([]);
  const [filteredMarketData, setFilteredMarketData] = useState([]);
  const [filterText, setFilterText] = useState("");

  // Fetch coin data from CoinGecko
  useEffect(() => {
    setMarketData(
      coinData.map((coin, index) => ({
        id: coin.id,
        active: watchList.includes(coin.id) ? true : false,
        rank: index + 1,
        name: coin.name,
        price: numberFormatter(coin.current_price),
        "24h":
          coin.price_change_percentage_24h_in_currency === null
            ? coin.price_change_percentage_24h_in_currency
            : percentageFormatter(coin.price_change_percentage_24h_in_currency),
        "7d":
          coin.price_change_percentage_7d_in_currency === null
            ? coin.price_change_percentage_7d_in_currency
            : percentageFormatter(coin.price_change_percentage_7d_in_currency),
        cap: largeCurrencyFormatter(coin.market_cap),
        volume: largeCurrencyFormatter(coin.total_volume),
        supply:
          coin.total_supply === null
            ? "N/A"
            : largeCurrencyFormatter(coin.total_supply),
      }))
    );
  }, [coinData, currency, watchList]);

  // Apply filter search to market data
  useEffect(() => {
    let filtered = marketData.filter((coin) =>
      coin.name.toLowerCase().startsWith(filterText)
    );
    setFilteredMarketData(filtered);
  }, [marketData, filterText]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: {
          xs: "center",
          md: "flex-start",
        },
        alignItems: {
          xs: "center",
          md: "flex-start",
        },
        width: "100%",
        height: "100%",
      }}
    >
      <MarketHeader setFilterText={setFilterText} />
      <MarketTable
        data={marketData}
        filteredData={filteredMarketData}
        filterText={filterText}
        page="market"
      />
    </Box>
  );
};

export default Market;
