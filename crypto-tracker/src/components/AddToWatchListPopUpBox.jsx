import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DataContext } from "../context/DataContext";
import FilterSearchBar from "./FilterSearchBar";

const AddToWatchListPopUpBox = ({ onClose, selectedValue, open }) => {
  const useDataContext = useContext(DataContext);
  const { coinData, isLoading } = useDataContext;

  const [filterText, setFilterText] = useState("");

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth="xl"
      sx={{
        "& ::-webkit-scrollbar": {
          width: "0.4em",
        },
        "& ::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "& ::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
          outline: "1px solid slategrey",
        },
      }}
      PaperProps={{
        sx: {
          height: "80vh",
          backgroundColor: "#263238 !important",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        },
      }}
    >
      <DialogTitle>Select a coin to add to your Watch list</DialogTitle>
      <Box width="100%" h="100%">
        <Divider
          variant="middle"
          light
          sx={{ mb: "1rem", bgcolor: "primary.light" }}
        />
      </Box>
      <FilterSearchBar
        placeholder="Search coins..."
        setFilterText={setFilterText}
        ML={{ md: 0 }}
        MB={{ xs: 1, md: 0 }}
        width="90%"
      />
      <List
        sx={{
          width: "100%",
        }}
      >
        {coinData.map((coin, index) => (
          <ListItem
            disablePadding
            key={index}
            divider
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <ListItemButton>
              <Typography variant="subtitle1">{index + 1}</Typography>
              <Avatar
                alt={coin.name}
                src={coin.image}
                sx={{ m: "0 1rem 0 1rem" }}
              />
              <Stack direction="row" width="100%">
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <ListItemText
                      primary={coin.symbol.toUpperCase()}
                      primaryTypographyProps={{
                        textAlign: "left",
                        color: "text.secondary",
                      }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <ListItemText primary={coin.name} />
                  </Grid>
                </Grid>
              </Stack>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default AddToWatchListPopUpBox;
