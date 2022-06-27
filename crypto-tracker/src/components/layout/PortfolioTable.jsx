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
import AddAlertSidebar from "../alerts-components/AddAlertSidebar";

import { useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import AddAlertPopup from "../alerts-components/AddAlertPopup";

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
        flex: 2,
        type: "number",
        headerClassName: "market-table-header",
        renderCell: (cellValues) => {
          return (
            <Stack direction="column">
              <Stack direction="row" justifyContent="flex-end">
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

export default PortfolioTable;
