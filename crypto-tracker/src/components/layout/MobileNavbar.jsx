import React from "react";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../Logo";
import Profile from "../Profile";
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";

const MobileNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <AppBar position="static" color="inherit">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Logo />
          <Box>
            <Profile />
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              sx={{ mr: "2px" }}
              onClick={toggleDrawer}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <MobileDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default MobileNavbar;
