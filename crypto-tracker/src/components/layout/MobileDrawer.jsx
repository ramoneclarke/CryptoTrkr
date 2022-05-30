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
  Link as MuiLink,
  List,
  Toolbar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import Profile from "./Profile";
import SidebarLink from "./SidebarLink";
import { Link } from "react-router-dom";

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
            mb: "5px",
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
          <SidebarLink
            text="Dashboard"
            route="/"
            Icon={Home}
            toggleDrawer={toggleDrawer}
          />
          <SidebarLink
            text="Market"
            route="/market"
            Icon={ShowChart}
            toggleDrawer={toggleDrawer}
          />
          <SidebarLink
            text="Watch List"
            route="/watchlist"
            Icon={Star}
            toggleDrawer={toggleDrawer}
          />
          <SidebarLink
            text="Portfolio"
            route="/portfolio"
            Icon={AccountBalanceWallet}
            toggleDrawer={toggleDrawer}
          />
          <SidebarLink
            text="News"
            route="/news"
            Icon={Feed}
            toggleDrawer={toggleDrawer}
          />
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
        <MuiLink component={Link} to="/settings">
          <IconButton sx={{ color: "secondary.light" }} onClick={toggleDrawer}>
            <Tooltip title="Settings">
              <Settings fontSize="large" />
            </Tooltip>
          </IconButton>
        </MuiLink>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
