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
  CircularProgress,
  Pagination,
  PaginationItem,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddToWatchlistChip from "../AddToWatchlistChip";
import AddToPortfolioChip from "../AddToPortfolioChip";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

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

const MarketTable = ({ marketData, filteredMarketData, filterText }) => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));

  const useAppContext = useContext(AppContext);
  const { settings } = useAppContext;
  const { activeCurrency: currency } = settings;

  let columns;
  if (isSmallDevice) {
    columns = [
      {
        field: "rank",
        headerName: "#",
        width: 20,
        headerClassName: "market-table-header",
      },
      {
        field: "name",
        headerName: "Name",
        width: 200,
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <Stack
              direction="row"
              spacing={2}
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              {cellValues.row.name}
              <Stack direction="row" spacing={0.5}>
                <AddToWatchlistChip />
                <AddToPortfolioChip />
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
            <>
              {currency.symbol}
              {cellValues.row.price}
            </>
          );
        },
      },
      {
        field: "24h",
        headerName: "24h %",
        width: 70,
        type: "number",
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return <>{cellValues.row["24h"]}%</>;
        },
      },
      {
        field: "7d",
        headerName: "7d %",
        width: 70,
        type: "number",
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return <>{cellValues.row["7d"]}%</>;
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
          return (
            <>
              {currency.symbol}
              {cellValues.row.supply}
            </>
          );
        },
      },
    ];
  } else {
    columns = [
      {
        field: "rank",
        headerName: "#",
        width: 50,
        headerClassName: "market-table-header",
      },
      {
        field: "name",
        headerName: "Name",
        width: 290,
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <Stack
              direction="row"
              spacing={2}
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              {cellValues.row.name}
              <Stack direction="row" spacing={0.5}>
                <AddToWatchlistChip />
                <AddToPortfolioChip />
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
            <>
              {currency.symbol}
              {cellValues.row.price}
            </>
          );
        },
      },
      {
        field: "24h",
        headerName: "24h %",
        width: 100,
        type: "number",
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return <>{cellValues.row["24h"]}%</>;
        },
      },
      {
        field: "7d",
        headerName: "7d %",
        width: 100,
        type: "number",
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return <>{cellValues.row["7d"]}%</>;
        },
      },
      {
        field: "cap",
        width: 200,
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
        width: 200,
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
        width: 200,
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
          return (
            <>
              {cellValues.row.supply !== "N/A" ? currency.symbol : ""}
              {cellValues.row.supply}
            </>
          );
        },
      },
    ];
  }

  const CustomNoRowsOverlay = () => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        sx={{ mt: 1 }}
      >
        {filterText === "" ? (
          <CircularProgress size={75} sx={{ color: "text.primary" }} />
        ) : (
          <Typography variant="h4">No results for '{filterText}'</Typography>
        )}
      </Box>
    );
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
    >
      <DataGrid
        rows={filterText === "" ? marketData : filteredMarketData}
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
