import {
  Paper,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.1),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const AlertsPageToggleButton = ({ alertsStep, setAlertsStep }) => {
  const handleType = (event, newStep) => {
    if (newStep !== null) {
      setAlertsStep(newStep);
    }
  };
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          border: (theme) => `1px solid ${theme.palette.primary.dark}`,
          flexWrap: "wrap",
          width: "20rem",
          mb: 1,
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={alertsStep}
          exclusive
          fullWidth
          onChange={handleType}
          aria-label="transaction type"
          color="secondary"
        >
          <ToggleButton
            value={1}
            aria-label="notifications"
            disableFocusRipple
            sx={{ color: "text.secondary" }}
            data-test="alerts-notifications-toggle"
          >
            <Typography>Notifications</Typography>
          </ToggleButton>
          <ToggleButton
            value={2}
            aria-label="manage-alerts"
            disableFocusRipple
            sx={{ color: "text.secondary" }}
            data-test="alerts-manage-toggle"
          >
            <Typography>Manage Alerts</Typography>
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </>
  );
};
export default AlertsPageToggleButton;
