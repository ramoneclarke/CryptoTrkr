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
  Dialog,
  IconButton,
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
import { useState } from "react";
import { NotificationAdd } from "@mui/icons-material";
import AddAlertPopup from "../alerts-components/AddAlertPopup";
import { UserContext } from "../../context/UserContext";

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
  const useUserContext = useContext(UserContext);
  const { dispatchUserContext } = useUserContext;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [popUpOpen, setPopUpOpen] = useState(false);
  const [selectedCoinImage, setSelectedCoinImage] = useState("");

  const handleAlertClickOpen = (cellValues) => {
    setPopUpOpen(true);
    setNewAlert({
      ...newAlert,
      coinId: cellValues.row.id,
      coinName: cellValues.row.name,
      coinSymbol: cellValues.row.symbol,
    });
    setSelectedCoinImage(cellValues.row.image);
  };

  const handleAlertClose = () => {
    setPopUpOpen(false);
  };

  const [newAlert, setNewAlert] = useState({
    coinId: "",
    coinName: "",
    coinSymbol: "",
    targetPrice: "",
    type: "Higher",
  });

  const handleAlertInputChange = (event) => {
    const { name, value } = event.target;
    setNewAlert({
      ...newAlert,
      [name]: value,
    });
  };

  const handleAlertSubmit = (event) => {
    event.preventDefault();
    dispatchUserContext({
      type: "addAlert",
      payload: {
        coinId: newAlert.coinId,
        coinName: newAlert.coinName,
        coinSymbol: newAlert.coinSymbol,
        targetPrice: newAlert.targetPrice,
        type: newAlert.type,
      },
    });
    let message = (
      <Stack direction="row" alignItems="center" justifyContent="center">
        <NotificationAdd sx={{ mr: "0.5rem" }} />
        {`Alert created for ${newAlert.coinId}`}
      </Stack>
    );

    enqueueSnackbar(message, {
      // TransitionComponent: Zoom,
      preventDuplicate: true,
      sx: {
        "& .SnackbarContent-root": {
          color: "text.primary",
          backgroundColor: "secondary.dark",
        },
        "& .SnackbarItem-wrappedRoot": {
          borderRadius: "22px",
        },
      },
    });
    handleAlertClose();
  };

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
            >
              {cellValues.row.symbol}
              <Stack direction="row">
                <AddToWatchlistChip
                  cellValues={cellValues}
                  enqueueSnackbar={enqueueSnackbar}
                />
                <AddToPortfolioChip cellValues={cellValues} />
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
              <IconButton
                size="small"
                color="inherit"
                onClick={() => handleAlertClickOpen(cellValues)}
              >
                <NotificationAdd
                  fontSize="medium"
                  sx={{ color: "chip.default" }}
                />
              </IconButton>
              <Dialog
                onClose={handleAlertClose}
                open={popUpOpen}
                maxWidth="xl"
                PaperProps={{
                  sx: {
                    width: {
                      xs: "90%",
                      md: "30rem",
                    },
                    backgroundColor: "#263238 !important",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  },
                }}
              >
                <AddAlertPopup
                  newAlert={newAlert}
                  setNewAlert={setNewAlert}
                  handleInputChange={handleAlertInputChange}
                  handleSubmit={handleAlertSubmit}
                  selectedCoinName={newAlert.coinName}
                  selectedCoinImage={selectedCoinImage}
                />
              </Dialog>
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
            >
              <Stack direction="row" spacing={1} alignItems="flex-end">
                <Typography>{cellValues.row.name}</Typography>
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
                <AddToPortfolioChip cellValues={cellValues} />
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
              spacing={2}
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <IconButton
                color="inherit"
                onClick={() => handleAlertClickOpen(cellValues)}
              >
                <NotificationAdd
                  fontSize="medium"
                  sx={{ color: "chip.default" }}
                />
              </IconButton>
              <Dialog
                onClose={handleAlertClose}
                open={popUpOpen}
                maxWidth="xl"
                PaperProps={{
                  sx: {
                    width: {
                      xs: "90%",
                      md: "30rem",
                    },
                    backgroundColor: "#263238 !important",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  },
                }}
              >
                <AddAlertPopup
                  newAlert={newAlert}
                  setNewAlert={setNewAlert}
                  handleInputChange={handleAlertInputChange}
                  handleSubmit={handleAlertSubmit}
                  selectedCoinName={newAlert.coinName}
                  selectedCoinImage={selectedCoinImage}
                />
              </Dialog>
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
