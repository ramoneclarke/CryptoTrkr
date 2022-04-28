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
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddToWatchlistChip from "../AddToWatchlistChip";
import AddToPortfolioChip from "../AddToPortfolioChip";

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

const MarketTable = () => {
  const rows = [
    {
      rank: 1,
      id: 1,
      name: "Bitcoin",
      price: "41,507",
      "24h": "1.33",
      "7d": "4.42",
      cap: "790,833,172,478",
      volume: "31,122,451,921",
      supply: "19,018,112",
    },
    {
      rank: 2,
      id: 2,
      name: "Ethereum",
      price: "3067.44",
      "24h": "0.44",
      "7d": "1.77",
      cap: "369,505,325,091",
      volume: "18,281,607,540",
      supply: "120,471,867",
    },
    {
      rank: 3,
      id: 3,
      name: "Bitcoin",
      price: "41,507",
      "24h": "1.33",
      "7d": "4.42",
      cap: "790,833,172,478",
      volume: "31,122,451,921",
      supply: "19,018,112",
    },
    {
      rank: 4,
      id: 4,
      name: "Ethereum",
      price: "3067.44",
      "24h": "0.44",
      "7d": "1.77",
      cap: "369,505,325,091",
      volume: "18,281,607,540",
      supply: "120,471,867",
    },
    {
      rank: 5,
      id: 5,
      name: "Bitcoin",
      price: "41,507",
      "24h": "1.33",
      "7d": "4.42",
      cap: "790,833,172,478",
      volume: "31,122,451,921",
      supply: "19,018,112",
    },
    {
      rank: 6,
      id: 6,
      name: "Ethereum",
      price: "3067.44",
      "24h": "0.44",
      "7d": "1.77",
      cap: "369,505,325,091",
      volume: "18,281,607,540",
      supply: "120,471,867",
    },
    {
      rank: 7,
      id: 7,
      name: "Bitcoin",
      price: "41,507",
      "24h": "1.33",
      "7d": "4.42",
      cap: "790,833,172,478",
      volume: "31,122,451,921",
      supply: "19,018,112",
    },
    {
      rank: 8,
      id: 8,
      name: "Ethereum",
      price: "3067.44",
      "24h": "0.44",
      "7d": "1.77",
      cap: "369,505,325,091",
      volume: "18,281,607,540",
      supply: "120,471,867",
    },
    {
      rank: 9,
      id: 9,
      name: "Bitcoin",
      price: "41,507",
      "24h": "1.33",
      "7d": "4.42",
      cap: "790,833,172,478",
      volume: "31,122,451,921",
      supply: "19,018,112",
    },
    {
      rank: 10,
      id: 10,
      name: "Ethereum",
      price: "3067.44",
      "24h": "0.44",
      "7d": "1.77",
      cap: "369,505,325,091",
      volume: "18,281,607,540",
      supply: "120,471,867",
    },
    {
      rank: 11,
      id: 11,
      name: "Bitcoin",
      price: "41,507",
      "24h": "1.33",
      "7d": "4.42",
      cap: "790,833,172,478",
      volume: "31,122,451,921",
      supply: "19,018,112",
    },
    {
      rank: 12,
      id: 12,
      name: "Ethereum",
      price: "3067.44",
      "24h": "0.44",
      "7d": "1.77",
      cap: "369,505,325,091",
      volume: "18,281,607,540",
      supply: "120,471,867",
    },
    {
      rank: 13,
      id: 13,
      name: "Bitcoin",
      price: "41,507",
      "24h": "1.33",
      "7d": "4.42",
      cap: "790,833,172,478",
      volume: "31,122,451,921",
      supply: "19,018,112",
    },
    {
      rank: 14,
      id: 14,
      name: "Ethereum",
      price: "3067.44",
      "24h": "0.44",
      "7d": "1.77",
      cap: "369,505,325,091",
      volume: "18,281,607,540",
      supply: "120,471,867",
    },
    {
      rank: 15,
      id: 15,
      name: "Bitcoin",
      price: "41,507",
      "24h": "1.33",
      "7d": "4.42",
      cap: "790,833,172,478",
      volume: "31,122,451,921",
      supply: "19,018,112",
    },
    {
      rank: 16,
      id: 16,
      name: "Ethereum",
      price: "3067.44",
      "24h": "0.44",
      "7d": "1.77",
      cap: "369,505,325,091",
      volume: "18,281,607,540",
      supply: "120,471,867",
    },
  ];

  const columns = [
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
            <Typography>{cellValues.row.name}</Typography>
            <Stack direction="row" spacing={0.5}>
              <AddToWatchlistChip />
              <AddToPortfolioChip />
            </Stack>
          </Stack>
          //   <Typography>{cellValues.row.name}</Typography>
          //   <AddToWatchlistChip />
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      type: "number",
      headerClassName: "market-table-header",
    },
    {
      field: "24h",
      headerName: "24h %",
      width: 100,
      type: "number",
      headerClassName: "market-table-header",
    },
    {
      field: "7d",
      headerName: "7d %",
      width: 100,
      type: "number",
      headerClassName: "market-table-header",
    },
    {
      field: "cap",
      width: 200,
      type: "number",
      description:
        "The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market. Market Cap = Current Price x Circulating Supply.",
      renderHeader: () => (
        <Stack direction="row" alignItems="center">
          <Typography>Market Cap</Typography>
          <InfoIcon fontSize="small" />
        </Stack>
      ),
      headerClassName: "market-table-header",
    },
    {
      field: "volume",
      width: 200,
      type: "number",
      description:
        "A measure of how much of a cryptocurrency was traded in the last 24 hours.",
      renderHeader: () => (
        <Stack direction="row" alignItems="center">
          <Typography>Volume(24h)</Typography>
          <InfoIcon fontSize="small" />
        </Stack>
      ),
      headerClassName: "market-table-header",
    },
    {
      field: "supply",
      width: 200,
      type: "number",
      description:
        "The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.",
      renderHeader: () => (
        <Stack direction="row" alignItems="center">
          <Typography>Circulating Supply</Typography>
          <InfoIcon fontSize="small" />
        </Stack>
      ),
      headerClassName: "market-table-header",
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        // "& .market-table-row-odd": {
        //   bgcolor: "background.default",
        //   "&:hover": {
        //     border: "None",
        //   },
        // },
        // "& .market-table-row-even": {
        //   bgcolor: "background.paper",
        //   "&:hover": {
        //     border: "None",
        //   },
        // },
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
        rows={rows}
        columns={columns}
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
        // getRowClassName={(params) =>
        //   params.row.id % 2 === 0
        //     ? "market-table-row-even"
        //     : "market-table-row-odd"
        // }
        components={{
          Pagination: CustomPagination,
        }}
      />
    </Box>
  );
};

export default MarketTable;
