import { Box, Grid, Stack, useTheme } from "@mui/material";
import React from "react";
import PageTitle from "../components/layout/PageTitle";
import SettingField from "../components/settings-components/SettingField";

const Settings = () => {
  const theme = useTheme();
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12} sx={{ height: "10%" }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: { xs: "center", md: "flex-end" },
            }}
          >
            <PageTitle title="Settings" />
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ height: "90%" }}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                width: "95%",
                height: "95%",
                padding: "2rem",
                borderRadius: theme.shape.containerBorderRadius,
                bgcolor: {
                  xs: "background.default",
                  md: "background.paper",
                },
              }}
            >
              <Stack direction="column" spacing={3}>
                <SettingField
                  settingName="Currency"
                  settingDescription="Select your base currency"
                />
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
