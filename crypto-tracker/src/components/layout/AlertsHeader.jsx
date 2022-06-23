import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useState } from "react";
import AlertsPageToggleButton from "../alerts-components/AlertsPageToggleButton";

const AlertsHeader = ({ alertsStep, setAlertsStep }) => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));

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
      {/* <PageTitle title={alertsStep === 1 ? "Notifications" : "Manage Alerts"} /> */}
      <AlertsPageToggleButton
        alertsStep={alertsStep}
        setAlertsStep={setAlertsStep}
      />
      {/* {!isSmallDevice && (
        <Stack width="600px" alignItems="center" justifyContent="center">
          
        </Stack>
      )} */}
    </Box>
  );
};

export default AlertsHeader;
