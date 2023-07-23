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
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSnackbar } from "notistack";
import AddToWatchlistChip from "../watchlist-components/AddToWatchlistChip";
import AddToPortfolioChip from "../portfolio-components/AddToPortfolioChip";
import DataGridCustomNoRowsOverlay from "../shared-components/DataGridCustomNoRowsOverlay";
import PriceChangeText from "../shared-components/PriceChangeText";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { NotificationAdd } from "@mui/icons-material";
import AddTransaction from "../portfolio-components/AddTransaction";
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

const PortfolioTable = ({ data, filteredData, filterText, page }) => {
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
        field: "name",
        headerName: "Name",
        flex: 2,
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
              {cellValues.row.symbol}
              <Stack direction="row" spacing={0.5}>
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
        flex: 2,
        type: "number",
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <Stack direction="column">
              <Stack
                direction="row"
                justifyContent="flex-end"
                data-test="coin-price"
              >
                {currency.symbol}
                {cellValues.row.price}
              </Stack>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <PriceChangeText percentageChange={cellValues.row["24h"]} />
              </Box>
            </Stack>
          );
        },
      },
      {
        field: "holdings",
        flex: 2.5,
        type: "number",
        renderHeader: () => (
          <Stack direction="row" alignItems="center">
            <Typography>Holdings</Typography>
          </Stack>
        ),
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <Stack direction="column">
              <Stack>
                {currency.symbol}
                {cellValues.row.value}
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  color: "text.secondary",
                }}
              >
                {cellValues.row.holdings}
              </Box>
            </Stack>
          );
        },
      },
      {
        field: "alert",
        flex: 1,
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
        flex: 6,
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
        flex: 4,
        type: "number",
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-end",
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
                justifyContent: "flex-end",
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
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <PriceChangeText percentageChange={cellValues.row["7d"]} />
            </Box>
          );
        },
      },
      {
        field: "holdings",
        flex: 4,
        type: "number",
        renderHeader: () => (
          <Stack direction="row" alignItems="center">
            <Typography>Holdings</Typography>
          </Stack>
        ),
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return <>{cellValues.row.holdings}</>;
        },
      },
      {
        field: "value",
        flex: 4.5,
        type: "number",
        renderHeader: () => (
          <Stack direction="row" alignItems="center">
            <Typography>Value</Typography>
          </Stack>
        ),
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <>
              {currency.symbol}
              {cellValues.row.value}
            </>
          );
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
      data-test="portfolio-table"
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

export default PortfolioTable;
