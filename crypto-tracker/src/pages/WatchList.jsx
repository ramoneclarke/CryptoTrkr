import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import WatchListHeader from "../components/layout/WatchListHeader";
import MarketTable from "../components/layout/MarketTable";
import { AppContext } from "../context/AppContext";
import { DataContext } from "../context/DataContext";
import { UserContext } from "../context/UserContext";

const WatchList = () => {
  const useDataContext = useContext(DataContext);
  const useAppContext = useContext(AppContext);
  const useUserContext = useContext(UserContext);

  const { coinData, isLoading } = useDataContext;
  const { settings } = useAppContext;
  const { watchList, dispatchUserContext } = useUserContext;

  const { activeCurrency: currency } = settings;

  const [watchListData, setWatchListData] = useState([]);
  const [filteredWatchListData, setFilteredWatchListData] = useState([]);
  const [filterText, setFilterText] = useState("");

  // Fetch coin data from CoinGecko
  useEffect(() => {
    const watchListCoinData = coinData.filter((coin) =>
      watchList.includes(coin.id)
    );
    console.log(watchListCoinData);
    setWatchListData(
      watchListCoinData.map((coin, index) => ({
        id: coin.id,
        rank: index + 1,
        name: coin.name,
        price:
          coin.current_price < 0.01
            ? Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 12,
              }).format(coin.current_price)
            : Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 12,
              }).format(coin.current_price.toFixed(3)),
        "24h":
          coin.price_change_percentage_24h_in_currency === null
            ? coin.price_change_percentage_24h_in_currency
            : coin.price_change_percentage_24h_in_currency.toFixed(2),
        "7d":
          coin.price_change_percentage_7d_in_currency === null
            ? coin.price_change_percentage_7d_in_currency
            : coin.price_change_percentage_7d_in_currency.toFixed(2),
        cap: Intl.NumberFormat("en-IN", {
          maximumSignificantDigits: 12,
        }).format(coin.market_cap),
        volume: Intl.NumberFormat("en-IN", {
          maximumSignificantDigits: 12,
        }).format(coin.total_volume),
        supply:
          coin.total_supply === null
            ? "N/A"
            : Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 12,
              }).format(coin.total_supply),
      }))
    );
  }, [coinData, currency, watchList]);

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
      <WatchListHeader setFilterText={setFilterText} />
      <MarketTable
        data={watchListData}
        filteredData={filteredWatchListData}
        filterText={filterText}
        page="watchlist"
      />
    </Box>
  );
};

export default WatchList;
