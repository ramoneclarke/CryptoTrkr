import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import PortfolioHeader from "../components/layout/PortfolioHeader";
import PortfolioTable from "../components/layout/PortfolioTable";
import { AppContext } from "../context/AppContext";
import { DataContext } from "../context/DataContext";
import { UserContext } from "../context/UserContext";
import {
  numberFormatter,
  percentageFormatter,
} from "../utils/numberFormatters";

const Portfolio = () => {
  const useDataContext = useContext(DataContext);
  const useAppContext = useContext(AppContext);
  const useUserContext = useContext(UserContext);

  const { coinData } = useDataContext;
  const { settings } = useAppContext;
  const { portfolio, watchList } = useUserContext;

  const { activeCurrency: currency } = settings;

  const [portfolioData, setPortfolioData] = useState([]);
  const [filteredPortfolioData, setFilteredPortfolioData] = useState([]);
  const [filterText, setFilterText] = useState("");

  // Fetch coin data from CoinGecko
  useEffect(() => {
    const portfolioCoinData = coinData.filter(
      (coin) => coin.id in portfolio && portfolio[coin.id].holdings > 0
    );
    setPortfolioData(
      portfolioCoinData.map((coin, index) => ({
        id: coin.id,
        watchListActive: watchList.includes(coin.id) ? true : false,
        portfolioActive: true,
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
        holdings: portfolio[coin.id].holdings,
        value: numberFormatter(
          portfolio[coin.id].holdings * coin.current_price
        ),
      }))
    );
  }, [coinData, currency, portfolio, watchList]);

  useEffect(() => {
    let filtered = portfolioData.filter((coin) =>
      coin.name.toLowerCase().startsWith(filterText)
    );
    setFilteredPortfolioData(filtered);
  }, [portfolioData, filterText]);

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
      <PortfolioHeader setFilterText={setFilterText} />
      <PortfolioTable
        data={portfolioData}
        filteredData={filteredPortfolioData}
        filterText={filterText}
        page="portfolio"
      />
    </Box>
  );
};

export default Portfolio;
