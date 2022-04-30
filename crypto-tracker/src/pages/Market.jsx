import {
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import MarketHeader from "../components/layout/MarketHeader";
import MarketTable from "../components/layout/MarketTable";
import MarketTableMobile from "../components/layout/MarketTableMobile";
import { AppContext } from "../context/AppContext";
import { DataContext } from "../context/DataContext";

const Market = () => {
  const theme = useTheme();
  const useDataContext = useContext(DataContext);
  const useAppContext = useContext(AppContext);
  const { coinData, isLoading } = useDataContext;
  const { settings } = useAppContext;
  const { activeCurrency: currency } = settings;

  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    setMarketData(
      coinData.map((coin, index) => ({
        id: coin.id,
        rank: index + 1,
        name: coin.name,
        price: `${currency.symbol}${
          coin.current_price < 0.01
            ? Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 12,
              }).format(coin.current_price)
            : Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 12,
              }).format(coin.current_price.toFixed(3))
        }`,
        "24h": coin.price_change_percentage_24h_in_currency.toFixed(2),
        "7d": coin.price_change_percentage_7d_in_currency.toFixed(2),
        cap: `${currency.symbol}${Intl.NumberFormat("en-IN", {
          maximumSignificantDigits: 12,
        }).format(coin.market_cap)}`,
        volume: `${currency.symbol}${Intl.NumberFormat("en-IN", {
          maximumSignificantDigits: 12,
        }).format(coin.total_volume)}`,
        supply: `${
          coin.total_supply === null
            ? "N/A"
            : Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 12,
              }).format(coin.total_supply)
        }`,
      }))
    );
  }, [coinData, currency]);

  // const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));

  // if (isSmallDevice) {
  //   return (
  //     <Box sx={{ width: "100%", height: "100%" }}>
  //       <MarketHeader />
  //       <MarketTableMobile marketData={marketData} />
  //     </Box>
  //   );
  // } else {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "flex-start",
  //         alignItems: "flex-start",
  //         width: "100%",
  //       }}
  //     >
  //       <MarketHeader />
  //       <MarketTable marketData={marketData} />
  //     </Box>
  //   );
  // }

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
      <MarketHeader />
      <MarketTable marketData={marketData} />
    </Box>
  );
};

export default Market;
