import { NotificationAdd } from "@mui/icons-material";
import { Dialog, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { UserContext } from "../../context/UserContext";
import { priceRegex } from "../../utils/priceRegex";
import AddAlertPopup from "./AddAlertPopup";

const AddAlertChip = ({ cellValues, enqueueSnackbar }) => {
  const useUserContext = useContext(UserContext);
  const { dispatchUserContext } = useUserContext;
  const useAppContext = useContext(AppContext);
  const { priceError, dispatchAppContext } = useAppContext;

  const [newAlert, setNewAlert] = useState({
    coinId: "",
    coinName: "",
    coinSymbol: "",
    targetPrice: "",
    type: "Higher",
  });

  const [popUpOpen, setPopUpOpen] = useState(false);
  const [selectedCoinImage, setSelectedCoinImage] = useState("");

  const validateForm = (value) => {
    if (value === "") {
      dispatchAppContext({ type: "setPriceError", payload: true });
      dispatchAppContext({
        type: "setPriceHelperText",
        payload: "Enter the target price",
      });
    } else if (!priceRegex.test(value)) {
      dispatchAppContext({ type: "setPriceError", payload: true });
      dispatchAppContext({
        type: "setPriceHelperText",
        payload: "Invalid format",
      });
    } else {
      dispatchAppContext({ type: "setPriceError", payload: false });
      dispatchAppContext({ type: "setPriceHelperText", payload: "" });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAlert({
      ...newAlert,
      [name]: value,
    });
    if (name === "targetPrice") {
      validateForm(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!priceError && newAlert.targetPrice !== "") {
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
    } else if (!priceError && newAlert.targetPrice === "") {
      validateForm(newAlert.targetPrice);
    }
  };

  const handleAlertClickOpen = (cellValues) => {
    setPopUpOpen(true);
    setNewAlert({
      ...newAlert,
      coinId: cellValues.row.id,
      coinName: cellValues.row.name,
      coinSymbol: cellValues.row.symbol,
      targetPrice: "",
      type: "Higher",
    });
    setSelectedCoinImage(cellValues.row.image);
  };

  const handleAlertClose = () => {
    setPopUpOpen(false);
    dispatchAppContext({ type: "setPriceError", payload: false });
    dispatchAppContext({
      type: "setPriceHelperText",
      payload: "",
    });
  };

  return (
    <>
      <IconButton
        size="small"
        color="inherit"
        onClick={() => handleAlertClickOpen(cellValues)}
      >
        <NotificationAdd fontSize="medium" sx={{ color: "chip.default" }} />
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
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          selectedCoinName={newAlert.coinName}
          selectedCoinImage={selectedCoinImage}
        />
      </Dialog>
    </>
  );
};

export default AddAlertChip;
