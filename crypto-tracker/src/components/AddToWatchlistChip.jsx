import { IconButton, Stack } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Zoom from "@mui/material/Zoom";
import React from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const AddToWatchlistChip = ({ cellValues, enqueueSnackbar }) => {
  const useUserContext = useContext(UserContext);
  const { watchList, dispatchUserContext } = useUserContext;

  const handleCellButtonClick = (event, cellValues) => {
    watchList.includes(cellValues.id)
      ? toggleWatchCoin("remove", cellValues.id, cellValues.row.name)
      : toggleWatchCoin("add", cellValues.id, cellValues.row.name);
  };

  const toggleWatchCoin = (action, id, coinName) => {
    let message = "";
    action === "remove"
      ? (message = (
          <Stack direction="row" alignItems="center">
            <VisibilityOff sx={{ mr: "0.5rem" }} />
            {`${coinName} has been removed from your watchlist`}
          </Stack>
        ))
      : (message = (
          <Stack direction="row" alignItems="center">
            <Visibility sx={{ mr: "0.5rem" }} />
            {`${coinName} has been added to your watchlist`}
          </Stack>
        ));

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

    dispatchUserContext({
      type: watchList.includes(id) ? "removeFromWatchList" : "addToWatchList",
      payload: id,
    });
  };

  return (
    <>
      <IconButton
        onClick={(event) => {
          handleCellButtonClick(event, cellValues);
        }}
      >
        <Visibility sx={{ color: "chip.watch" }} />
      </IconButton>
    </>
  );
};

export default AddToWatchlistChip;
