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
import {
  largeCurrencyFormatter,
  numberFormatter,
  percentageFormatter,
} from "../utils/numberFormatters";

const WatchList = () => {
  const useDataContext = useContext(DataContext);
  const useAppContext = useContext(AppContext);
  const useUserContext = useContext(UserContext);

  const { coinData } = useDataContext;
  const { settings } = useAppContext;
  const { watchList, portfolio, dispatchUserContext } = useUserContext;

  const { activeCurrency: currency } = settings;

  const [watchListData, setWatchListData] = useState([]);
  const [filteredWatchListData, setFilteredWatchListData] = useState([]);
  const [filterText, setFilterText] = useState("");

  // for Add to watchlist pop up
  const [popUpOpen, setPopUpOpen] = useState(false);

  const handleClickOpen = () => {
    setPopUpOpen(true);
  };

  const handleClickClose = (value) => {
    dispatchUserContext({ type: "addToWatchList", payload: value });
    setPopUpOpen(false);
  };

  const handleClose = () => {
    setPopUpOpen(false);
  };

  // Fetch coin data from CoinGecko
  useEffect(() => {
    const watchListCoinData = coinData.filter((coin) =>
      watchList.includes(coin.id),
    );
    setWatchListData(
      watchListCoinData.map((coin, index) => ({
        id: coin.id,
        watchListActive: true,
        portfolioActive:
          coin.id in portfolio && portfolio[coin.id].holdings > 0
            ? true
            : false,
        rank: index + 1,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        image: coin.image,
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
      })),
    );
  }, [coinData, currency, watchList, portfolio]);

  useEffect(() => {
    let filtered = watchListData.filter((coin) =>
      coin.name.toLowerCase().startsWith(filterText),
    );
    setFilteredWatchListData(filtered);
  }, [watchListData, filterText]);

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
      <WatchListHeader
        setFilterText={setFilterText}
        open={popUpOpen}
        handleClickOpen={handleClickOpen}
        handleClickClose={handleClickClose}
        handleClose={handleClose}
      />
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
