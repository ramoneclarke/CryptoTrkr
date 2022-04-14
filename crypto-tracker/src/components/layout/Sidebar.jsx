import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Tooltip,
} from "@mui/material";
import SidebarLink from "./SidebarLink";
import {
  ShowChart,
  Home,
  AccountBalanceWallet,
  Star,
  Feed,
  Settings,
} from "@mui/icons-material";
import Logo from "../Logo";
import Profile from "../Profile";

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
        PaperProps={{
          sx: {
            display: "flex",
            justifyContent: "space-between",
          },
        }}
      >
        <Logo />
        <Divider variant="middle" sx={{ bgcolor: "text.secondary" }} />
        <Box sx={{ height: "85%" }}>
          <Toolbar sx={{ height: "15%" }}>
            <Profile />
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
    </Box>
  );
};

export default Sidebar;
