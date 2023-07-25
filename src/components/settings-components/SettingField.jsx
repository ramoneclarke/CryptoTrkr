import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import CurrencySelector from "../shared-components/CurrencySelector";

const SettingField = ({ settingName, settingDescription }) => {
  return (
    <Stack direction="column" spacing={3} width="100%">
      <Stack direction="row" spacing={4}>
        <Stack direction="column" justifyContent="center">
          <Typography variant="subtitle1">{settingName}:</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {settingDescription}
          </Typography>
        </Stack>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ bgcolor: "background.default" }}
        />
        <CurrencySelector />
      </Stack>
      <Divider variant="middle" sx={{ bgcolor: "background.default" }} />
    </Stack>
  );
};

export default SettingField;
