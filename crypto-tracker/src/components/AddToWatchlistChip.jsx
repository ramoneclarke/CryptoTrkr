import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import React from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const AddToWatchlistChip = ({ cellValues }) => {
  const useUserContext = useContext(UserContext);
  const { watchList, dispatchUserContext } = useUserContext;

  const toggleWatchCoin = (coinId) => {
    watchList.includes(coinId)
      ? dispatchUserContext({ type: "removeFromWatchList", payload: coinId })
      : dispatchUserContext({ type: "addToWatchList", payload: coinId });
  };

  const handleCellButtonClick = (event, cellValues) => {
    toggleWatchCoin(cellValues.id);
  };

  return (
    <IconButton
      onClick={(event) => {
        handleCellButtonClick(event, cellValues);
      }}
    >
      <Visibility sx={{ color: "chip.watch" }} />
    </IconButton>
  );
};

export default AddToWatchlistChip;
