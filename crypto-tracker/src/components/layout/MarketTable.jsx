import React from "react";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import {
  Box,
  Pagination,
  PaginationItem,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSnackbar } from "notistack";
import InfoIcon from "@mui/icons-material/Info";
import AddToWatchlistChip from "../watchlist-components/AddToWatchlistChip";
import AddToPortfolioChip from "../portfolio-components/AddToPortfolioChip";
import DataGridCustomNoRowsOverlay from "../shared-components/DataGridCustomNoRowsOverlay";
import PriceChangeText from "../shared-components/PriceChangeText";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import AddTransaction from "../portfolio-components/AddTransaction";
import { NotificationAdd } from "@mui/icons-material";
import AddAlertChip from "../alerts-components/AddAlertChip";

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="secondary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const supplyColumnDescription =
  "The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.";
const volumeColumnDescription =
  "A measure of how much of a cryptocurrency was traded in the last 24 hours.";
const capColumnDescription =
  "The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market. Market Cap = Current Price x Circulating Supply.";

const MarketTable = ({ data, filteredData, filterText, page }) => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));

  const useAppContext = useContext(AppContext);
  const { settings } = useAppContext;
  const { activeCurrency: currency } = settings;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  let columns;
  if (isSmallDevice) {
    columns = [
      {
        field: "rank",
        headerName: "#",
        width: 10,
        headerClassName: "market-table-header",
      },
      {
        field: "name",
        headerName: "Name",
        width: 150,
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              data-test="coin"
            >
              <p data-test="coin-name">{cellValues.row.symbol}</p>
              <Stack direction="row">
                <AddToWatchlistChip
                  cellValues={cellValues}
                  enqueueSnackbar={enqueueSnackbar}
                />
                <AddToPortfolioChip
                  cellValues={cellValues}
                  enqueueSnackbar={enqueueSnackbar}
                />
                <AddTransaction />
              </Stack>
            </Stack>
          );
        },
      },
      {
        field: "price",
        headerName: "Price",
        width: 100,
        type: "number",
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <div data-test="coin-price">
              {currency.symbol}
              {cellValues.row.price}
            </div>
          );
        },
      },
      {
        field: "24h",
        headerName: "24h %",
        width: 85,
        type: "number",
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <PriceChangeText percentageChange={cellValues.row["24h"]} />
            </Box>
          );
        },
      },
      {
        field: "7d",
        headerName: "7d %",
        width: 85,
        type: "number",
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <PriceChangeText percentageChange={cellValues.row["7d"]} />
            </Box>
          );
        },
      },
      {
        field: "cap",
        width: 150,
        type: "number",
        renderHeader: () => (
          <Stack direction="row" alignItems="center">
            <Typography>Market Cap</Typography>
            <Tooltip title={capColumnDescription} arrow placement="top">
              <InfoIcon fontSize="small" />
            </Tooltip>
          </Stack>
        ),
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <>
              {currency.symbol}
              {cellValues.row.cap}
            </>
          );
        },
      },
      {
        field: "volume",
        width: 150,
        type: "number",
        renderHeader: () => (
          <Stack direction="row" alignItems="center">
            <Typography>Volume(24h)</Typography>
            <Tooltip title={volumeColumnDescription} arrow placement="top">
              <InfoIcon fontSize="small" />
            </Tooltip>
          </Stack>
        ),
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <>
              {currency.symbol}
              {cellValues.row.volume}
            </>
          );
        },
      },
      {
        field: "supply",
        width: 170,
        type: "number",
        renderHeader: () => (
          <Stack direction="row" alignItems="center">
            <Typography>Circulating Supply</Typography>
            <Tooltip title={supplyColumnDescription} arrow placement="top">
              <InfoIcon fontSize="small" />
            </Tooltip>
          </Stack>
        ),
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return <>{cellValues.row.supply}</>;
        },
      },
      {
        field: "alert",
        width: 50,
        headerClassName: "market-table-header",
        renderHeader: (cellValues) => (
          <>
            <Stack direction="row" justifyContent="center" width="200px">
              <NotificationAdd fontSize="small" />
            </Stack>
          </>
        ),
        renderCell: (cellValues) => {
          return (
            <Stack
              direction="row"
              width="100%"
              height="100%"
              alignItems="center"
              justifyContent="center"
            >
              <AddAlertChip
                cellValues={cellValues}
                enqueueSnackbar={enqueueSnackbar}
              />
            </Stack>
          );
        },
      },
    ];
  } else {
    columns = [
      {
        field: "rank",
        headerName: "#",
        flex: 1,
        headerClassName: "market-table-header",
      },
      {
        field: "name",
        headerName: "Name",
        flex: 7,
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <Stack
              direction="row"
              spacing={2}
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              data-test="coin"
            >
              <Stack direction="row" spacing={1} alignItems="flex-end">
                <Typography data-test="coin-name">
                  {cellValues.row.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {cellValues.row.symbol}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5}>
                <AddToWatchlistChip
                  cellValues={cellValues}
                  enqueueSnackbar={enqueueSnackbar}
                  closeSnackbar={closeSnackbar}
                />
                <AddToPortfolioChip
                  cellValues={cellValues}
                  enqueueSnackbar={enqueueSnackbar}
                />
                <AddTransaction />
              </Stack>
            </Stack>
          );
        },
      },
      {
        field: "price",
        headerName: "Price",
        flex: 3,
        type: "number",
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              data-test="coin-price"
            >
              {currency.symbol}
              {cellValues.row.price}{" "}
            </Box>
          );
        },
      },
      {
        field: "24h",
        headerName: "24h %",
        flex: 2,
        type: "number",
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <PriceChangeText percentageChange={cellValues.row["24h"]} />
            </Box>
          );
        },
      },
      {
        field: "7d",
        headerName: "7d %",
        flex: 2,
        type: "number",
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <PriceChangeText percentageChange={cellValues.row["7d"]} />
            </Box>
          );
        },
      },
      {
        field: "cap",
        flex: 4,
        type: "number",
        renderHeader: () => (
          <Stack direction="row" alignItems="center">
            <Typography>Market Cap</Typography>
            <Tooltip title={capColumnDescription} arrow placement="top">
              <InfoIcon fontSize="small" />
            </Tooltip>
          </Stack>
        ),
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <>
              {currency.symbol}
              {cellValues.row.cap}
            </>
          );
        },
      },
      {
        field: "volume",
        flex: 4,
        type: "number",
        renderHeader: () => (
          <Stack direction="row" alignItems="center">
            <Typography>Volume(24h)</Typography>
            <Tooltip title={volumeColumnDescription} arrow placement="top">
              <InfoIcon fontSize="small" />
            </Tooltip>
          </Stack>
        ),
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <>
              {currency.symbol}
              {cellValues.row.volume}
            </>
          );
        },
      },
      {
        field: "supply",
        flex: 4,
        type: "number",
        renderHeader: () => (
          <Stack direction="row" alignItems="center">
            <Typography>Circulating Supply</Typography>
            <Tooltip title={supplyColumnDescription} arrow placement="top">
              <InfoIcon fontSize="small" />
            </Tooltip>
          </Stack>
        ),
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return <>{cellValues.row.supply}</>;
        },
      },
      {
        field: "alert",
        flex: 1.5,
        headerClassName: "market-table-header",
        renderHeader: () => (
          <Stack direction="row" justifyContent="flex-end" width="200px">
            <Typography>Alerts</Typography>
          </Stack>
        ),
        renderCell: (cellValues) => {
          return (
            <Stack
              direction="row"
              width="100%"
              height="100%"
              alignItems="center"
              justifyContent="center"
              data-test="coin-alerts-field"
            >
              <AddAlertChip
                cellValues={cellValues}
                enqueueSnackbar={enqueueSnackbar}
              />
            </Stack>
          );
        },
      },
    ];
  }

  const CustomNoRowsOverlay = () => {
    return <DataGridCustomNoRowsOverlay filterText={filterText} page={page} />;
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
        },
      }}
      data-test="market-table"
    >
      <DataGrid
        rows={filterText === "" ? data : filteredData}
        columns={columns}
        components={{
          Pagination: CustomPagination,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        disableColumnMenu
        disableSelectionOnClick
        sx={{
          border: "None",
          overflow: "hidden",
          "& .market-table-header": {
            color: "text.secondary",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            border: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            border: "none",
          },
          "& .MuiIconButton-root": {
            color: "text.secondary",
          },
          "& .MuiDataGrid-virtualScrollerRenderZone": {
            "& .MuiDataGrid-row": {
              bgcolor: "background.default",
              "&:nth-of-type(2n)": {
                bgcolor: "background.paper",
              },
            },
          },
          "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus-within":
            {
              outline: "none",
            },
        }}
      />
    </Box>
  );
};

export default MarketTable;
