import { Box, Grid } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import AddAlertSidebar from "../components/alerts-components/AddAlertSidebar";
import AlertsDisplay from "../components/alerts-components/AlertsDisplay";
import AlertsHeader from "../components/layout/AlertsHeader";
import { UserContext } from "../context/UserContext";

const Alerts = () => {
  const useUserContext = useContext(UserContext);
  const { dispatchUserContext } = useUserContext;

  const [alertsStep, setAlertsStep] = useState(1);

  const [newAlert, setNewAlert] = useState({
    coinId: "",
    coinName: "",
    coinSymbol: "",
    targetPrice: "",
    type: "Higher",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
        coinName: newAlert.coinName,
        coinSymbol: newAlert.coinSymbol,
        targetPrice: newAlert.targetPrice,
        type: newAlert.type,
      },
    });
  };

  // Refresh unopened alerts badge upon loading the alerts page
  useEffect(() => {
    dispatchUserContext({ type: "refreshUnopenedAlerts", payload: "" });
  }, [dispatchUserContext]);

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
