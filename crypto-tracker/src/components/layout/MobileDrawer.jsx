import {
  AccountBalanceWallet,
  Feed,
  Home,
  Settings,
  ShowChart,
  Star,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import Profile from "../Profile";
import SidebarLink from "./SidebarLink";

const MobileDrawer = ({ drawerOpen, toggleDrawer }) => {
  return (
    <Drawer
      sx={{
        width: "100%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "100%",
          boxSizing: "border-box",
        },
      }}
      variant="temporary"
      anchor="top"
      open={drawerOpen}
      onClose={toggleDrawer}
      PaperProps={{
        sx: {
          display: "flex",
          justifyContent: "space-between",
        },
      }}
    >
      <Box sx={{ height: "85%" }}>
        <Toolbar
          sx={{
            height: "15%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Profile name />
          <IconButton
            size="small"
            // edge="end"
            color="inherit"
            onClick={toggleDrawer}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
        <Divider variant="middle" sx={{ bgcolor: "text.secondary" }} />
        <List>
          <SidebarLink text="Dashboard" Icon={Home} />
          <SidebarLink text="Market" Icon={ShowChart} />
          <SidebarLink text="Watch List" Icon={Star} />
          <SidebarLink text="Portfolio" Icon={AccountBalanceWallet} />
          <SidebarLink text="News" Icon={Feed} />
        </List>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: "1rem",
        }}
      >
        <IconButton
          sx={{ color: "secondary.light" }}
          onClick={() => alert("Settings")}
        >
          <Tooltip title="Settings">
            <Settings fontSize="large" />
          </Tooltip>
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
