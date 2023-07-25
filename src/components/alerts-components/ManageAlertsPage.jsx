import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material/";
import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { DataContext } from "../../context/DataContext";
import { UserContext } from "../../context/UserContext";
import { numberFormatter } from "../../utils/numberFormatters";

const ManageAlertsPage = () => {
  const useUserContext = useContext(UserContext);
  const { alerts, dispatchUserContext } = useUserContext;
  const useDataContext = useContext(DataContext);
  const { coinPrices } = useDataContext;
  const useAppContext = useContext(AppContext);
  const { settings } = useAppContext;

  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));

  const handleCancelAlert = (alertId) => {
    dispatchUserContext({
      type: "removeAlert",
      payload: alertId,
    });
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        "& ::-webkit-scrollbar": {
          width: "0.4em",
        },
        "& ::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "& ::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
          outline: "1px solid slategrey",
          borderRadius: "5px",
        },
      }}
      data-test="manage-alerts-page"
    >
      <TableContainer component={Paper} sx={{ width: "100%", height: "100%" }}>
        <Table
          stickyHeader
          sx={{ width: "100%", maxHeight: "100%", borderCollapse: "collapse" }}
        >
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  borderColor: "text.secondary",
                  bgcolor: "primary.main",
                },
              }}
            >
              {!isSmallDevice && <TableCell sx={{ width: "2rem" }}></TableCell>}
              <TableCell
                sx={{
                  color: "text.secondary",
                  textAlign: { xs: "right", md: "left" },
                }}
              >
                Coin
              </TableCell>
              <TableCell sx={{ color: "text.secondary" }}>
                {isSmallDevice ? "Type" : "Alert Type"}
              </TableCell>
              <TableCell sx={{ color: "text.secondary" }}>
                {isSmallDevice ? "Target" : "Target Price"}
              </TableCell>
              <TableCell sx={{ color: "text.secondary" }}>
                {isSmallDevice ? "Price" : "Current Price"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts.map((coin) => (
              <TableRow
                key={coin.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  borderBottom: "1.2px solid",
                  borderBottomColor: "primary.dark",
                }}
                data-test="alerts-table-row"
              >
                {!isSmallDevice && (
                  <TableCell>
                    <IconButton
                      size="small"
                      color="inherit"
                      onClick={() => handleCancelAlert(coin.id)}
                      data-test="delete-alert-icon"
                    >
                      <Close color="warning" />
                    </IconButton>
                  </TableCell>
                )}
                <TableCell>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    data-test="alerts-coin-cell"
                  >
                    {isSmallDevice && (
                      <IconButton
                        size="small"
                        color="inherit"
                        onClick={() => handleCancelAlert(coin.id)}
                        data-test="delete-alert-icon"
                      >
                        <Close color="warning" />
                      </IconButton>
                    )}
                    {isSmallDevice
                      ? coin.coinSymbol.toUpperCase()
                      : coin.coinName}
                  </Stack>
                </TableCell>
                <TableCell data-test="alerts-type-cell">{coin.type}</TableCell>
                <TableCell data-test="alerts-target-price-cell">
                  {settings.activeCurrency.symbol}
                  {numberFormatter(coin.targetPrice)}
                </TableCell>
                <TableCell>
                  {settings.activeCurrency.symbol}
                  {numberFormatter(coinPrices[coin.coinId])}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageAlertsPage;
