import {
  Avatar,
  DialogTitle,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { FixedSizeList } from "react-window";
import { AppContext } from "../../context/AppContext";
import { UserContext } from "../../context/UserContext";
import FilterSearchBar from "../shared-components/FilterSearchBar";

const TransactionCoinSelector = ({
  coinData,
  filteredCoinData,
  filterText,
  setFilterText,
}) => {
  const useUserContext = useContext(UserContext);
  const { dispatchUserContext, portfolio } = useUserContext;

  const useAppContext = useContext(AppContext);
  const { dispatchAppContext } = useAppContext;

  const handleListItemClick = (value) => {
    if (value.id in portfolio) {
      dispatchUserContext({
        type: "setSelectedCoin",
        payload: { id: value.id, name: value.name },
      });
      setFilterText("");
      dispatchAppContext({
        type: "setTransactionStepNum",
        payload: 2,
      });
    } else {
      dispatchUserContext({
        type: "setSelectedCoin",
        payload: { id: value.id, name: value.name },
      });
      dispatchUserContext({
        type: "addToPortfolio",
        payload: value.id,
      });
      setFilterText("");
      dispatchAppContext({
        type: "setTransactionStepNum",
        payload: 2,
      });
    }
  };

  return (
    <>
      <DialogTitle sx={{ fontSize: "1.8rem", padding: "10px" }}>
        Add Transaction
      </DialogTitle>
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
                        data-test="portfolio-dialog-coin-symbol"
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
