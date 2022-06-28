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
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import AlertsCoinSelector from "./AlertsCoinSelector";

const AddAlertSidebar = ({
  newAlert,
  setNewAlert,
  handleInputChange,
  handleSubmit,
  priceError,
  priceHelperText,
}) => {
  const theme = useTheme();
  const useDataContext = useContext(DataContext);
  const { coinData } = useDataContext;

  // for alert coin selector
  const [filterText, setFilterText] = useState("");
  const [filteredCoinData, setFilteredCoinData] = useState([]);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState({});

  const handleClickOpen = () => {
    setPopUpOpen(true);
  };

  const handleClose = () => {
    setPopUpOpen(false);
  };

  useEffect(() => {
    let filtered = coinData.filter((coin) =>
      coin.name.toLowerCase().startsWith(filterText)
    );
    setFilteredCoinData(filtered);
  }, [coinData, filterText]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "98%",
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
              justifyContent="space-between"
              alignItems="center"
              px={2}
            >
              {newAlert.coinId && (
                <Avatar
                  alt={selectedCoin.name}
                  src={selectedCoin.image}
                  sx={{ m: "0 1rem 0 1rem" }}
                />
              )}
              <Box sx={{ width: "100%" }}>
                {newAlert.coinId ? (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6" component="div" align="center">
                      {selectedCoin.name}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={handleClickOpen}
                    >
                      Select coin
                    </Button>
                  </Stack>
                ) : (
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={handleClickOpen}
                    sx={{
                      width: "100%",
                    }}
                  >
                    Select coin
                  </Button>
                )}
              </Box>
              <AlertsCoinSelector
                handleClose={handleClose}
                open={popUpOpen}
                coinData={coinData}
                filteredCoinData={filteredCoinData}
                filterText={filterText}
                setFilterText={setFilterText}
                setNewAlert={setNewAlert}
                newAlert={newAlert}
                setSelectedCoin={setSelectedCoin}
              />
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

export default AddAlertSidebar;
