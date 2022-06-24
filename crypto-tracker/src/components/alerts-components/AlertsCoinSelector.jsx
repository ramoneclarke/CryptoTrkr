import {
  Avatar,
  Dialog,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { FixedSizeList } from "react-window";
import FilterSearchBar from "../shared-components/FilterSearchBar";

const AlertsCoinSelector = ({
  open,
  handleClose,
  coinData,
  filteredCoinData,
  filterText,
  setFilterText,
  setNewAlert,
  newAlert,
  setSelectedCoin,
}) => {
  const handleListItemClick = (value) => {
    setNewAlert({
      ...newAlert,
      coinId: value.id,
      coinName: value.name,
      coinSymbol: value.symbol,
    });
    setSelectedCoin({ name: value.name, image: value.image });
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth="xl"
      sx={{
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
      PaperProps={{
        sx: {
          height: "80vh",
          width: "25rem",
          backgroundColor: "#263238 !important",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        },
      }}
    >
      <FilterSearchBar
        placeholder="Search coins..."
        setFilterText={setFilterText}
        ML={{ md: 0 }}
        MB={{ xs: 1, md: 0 }}
        width="90%"
      />
      <FixedSizeList
        itemData={filterText === "" ? coinData : filteredCoinData}
        itemCount={
          filterText === "" ? coinData.length : filteredCoinData.length
        }
        itemSize={60}
        overscanCount={5}
        height={600}
        width="100%"
      >
        {({ data, index, style }) => {
          return (
            <ListItem
              disablePadding
              key={index}
              divider
              sx={{ display: "flex", justifyContent: "flex-end" }}
              style={style}
            >
              <ListItemButton
                onClick={() =>
                  handleListItemClick({
                    id: data[index].id,
                    name: data[index].name,
                    symbol: data[index].symbol,
                    image: data[index].image,
                  })
                }
              >
                <Typography variant="subtitle1">{index + 1}</Typography>
                <ListItemAvatar>
                  <Avatar
                    alt={data[index].name}
                    src={data[index].image}
                    sx={{ m: "0 1rem 0 1rem" }}
                  />
                </ListItemAvatar>
                <Stack direction="row" width="100%">
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <ListItemText
                        primary={data[index].symbol.toUpperCase()}
                        primaryTypographyProps={{
                          textAlign: "left",
                          color: "text.secondary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <ListItemText primary={data[index].name} />
                    </Grid>
                  </Grid>
                </Stack>
              </ListItemButton>
            </ListItem>
          );
        }}
      </FixedSizeList>
    </Dialog>
  );
};

export default AlertsCoinSelector;
