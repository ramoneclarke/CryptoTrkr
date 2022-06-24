import { Box } from "@mui/material";
import React from "react";
import AlertsPageToggleButton from "../alerts-components/AlertsPageToggleButton";

const AlertsHeader = ({ alertsStep, setAlertsStep }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <AlertsPageToggleButton
        alertsStep={alertsStep}
        setAlertsStep={setAlertsStep}
      />
    </Box>
  );
};

export default AlertsHeader;
