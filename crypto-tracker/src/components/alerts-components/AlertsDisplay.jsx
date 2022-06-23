import { useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ManageAlertsPage from "./ManageAlertsPage";
import NotificationsPage from "./NotificationsPage";

const AlertsDisplay = ({ alertsStep }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "98%",
          height: "100%",
          borderRadius: theme.shape.containerBorderRadius,
          bgcolor: {
            xs: "background.default",
            md: "background.paper",
          },
        }}
      >
        {alertsStep === 1 ? <NotificationsPage /> : <ManageAlertsPage />}
      </Box>
    </Box>
  );
};

export default AlertsDisplay;
