import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import AddAlertSidebar from "../components/alerts-components/AddAlertSidebar";
import AlertsDisplay from "../components/alerts-components/AlertsDisplay";
import AlertsHeader from "../components/layout/AlertsHeader";
import { DataContext } from "../context/DataContext";
import { UserContext } from "../context/UserContext";

const Alerts = () => {
  const useUserContext = useContext(UserContext);
  const { dispatchUserContext, alerts, portfolio } = useUserContext;
  const useDataContext = useContext(DataContext);
  const { coinPrices } = useDataContext;

  const [alertsStep, setAlertsStep] = useState(1);

  const [newAlert, setNewAlert] = useState({
    coinId: "",
    targetPrice: "",
    type: "Higher",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(newAlert);
    setNewAlert({
      ...newAlert,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatchUserContext({
      type: "addAlert",
      payload: {
        coinId: newAlert.coinId,
        // targetPrice: coinPrices["bitcoin"] - 10,
        targetPrice: newAlert.targetPrice,
        type: newAlert.type,
      },
    });
  };
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12} sx={{ height: "15%" }}>
          <AlertsHeader alertsStep={alertsStep} setAlertsStep={setAlertsStep} />
        </Grid>
        <Grid item xs={12} md={9} sx={{ height: "85%" }}>
          <AlertsDisplay alertsStep={alertsStep} />
        </Grid>
        <Grid
          item
          md={3}
          sx={{ display: { xs: "none", md: "block" }, height: "85%" }}
        >
          <AddAlertSidebar
            newAlert={newAlert}
            setNewAlert={setNewAlert}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Alerts;
