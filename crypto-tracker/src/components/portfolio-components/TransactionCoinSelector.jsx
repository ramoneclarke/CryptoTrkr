import {
  Avatar,
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

const TransactionCoinSelector = ({
  handleListItemClick,
  coinData,
  filteredCoinData,
  filterText,
  setFilterText,
}) => {
  return (
    <>
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
    </>
  );
};

export default TransactionCoinSelector;
