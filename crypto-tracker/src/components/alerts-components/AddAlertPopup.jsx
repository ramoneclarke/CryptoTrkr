import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AppContext } from "../../context/AppContext";

const AddAlertPopup = ({
  newAlert,
  handleInputChange,
  handleSubmit,
  selectedCoinName,
  selectedCoinImage,
}) => {
  const theme = useTheme();
  const useAppContext = useContext(AppContext);
  const { priceError, priceHelperText, dispatchAppContext } = useAppContext;

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: theme.shape.containerBorderRadius,
          bgcolor: "background.paper",
        }}
      >
        <Stack direction="column">
          <Typography variant="h5" component="div" align="center" my={3}>
            Add New Alert
          </Typography>
          <Stack
            direction="column"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            <Stack
              direction="row"
              // justifyContent="center"
              alignItems="center"
              px={2}
            >
              <Avatar
                alt={selectedCoinName}
                src={selectedCoinImage}
                sx={{ m: "0 1rem 0 1rem" }}
              />
              <Typography variant="h6" component="div" align="center">
                {selectedCoinName}
              </Typography>
            </Stack>
            <form onSubmit={handleSubmit}>
              <Stack direction="column" spacing={5} w="100%" p={3}>
                <TextField
                  variant="filled"
                  id="target-price"
                  name="targetPrice"
                  label="Target Price"
                  type="number"
                  value={newAlert.targetPrice}
                  onChange={handleInputChange}
                  error={priceError}
                  helperText={priceHelperText}
                />
                <FormControl fullWidth>
                  <InputLabel id="alert-type">Alert Type</InputLabel>
                  <Select
                    variant="filled"
                    labelId="alert-type"
                    name="type"
                    value={newAlert.type}
                    label="Alert Type"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={"Higher"} sx={{ padding: "0.25rem" }}>
                      Higher
                    </MenuItem>
                    <MenuItem value={"Lower"} sx={{ padding: "0.25rem" }}>
                      Lower
                    </MenuItem>
                  </Select>
                </FormControl>

                <Button variant="contained" color="secondary" type="submit">
                  Save
                </Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default AddAlertPopup;
