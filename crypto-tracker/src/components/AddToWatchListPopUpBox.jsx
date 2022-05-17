import { Box, Dialog, DialogTitle, Divider, List } from "@mui/material";
import React from "react";
import { useState } from "react";
import FilterSearchBar from "./FilterSearchBar";

const AddToWatchListPopUpBox = ({ onClose, selectedValue, open }) => {
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
      {/* <List></List> */}
    </Dialog>
  );
};

export default AddToWatchListPopUpBox;
