import React from "react";
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
import SidebarLink from "./SidebarLink";
import {
  ShowChart,
  AccountBalanceWallet,
  Visibility,
  Notifications,
  Settings,
} from "@mui/icons-material";
import Logo from "./Logo";
import Profile from "./Profile";
import { Link } from "react-router-dom";

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
        <Box mt="2rem" mb="2rem">
          <MuiLink component={Link} to="/" underline="none">
            <Logo />
          </MuiLink>
        </Box>
        <Divider variant="middle" sx={{ bgcolor: "text.secondary" }} />
        <Box sx={{ height: "85%" }}>
          <Toolbar sx={{ height: "15%" }}>
            <Profile />
          </Toolbar>
          <Divider variant="middle" sx={{ bgcolor: "text.secondary" }} />
          <List>
            <SidebarLink text="Market" route="/" Icon={ShowChart} />
            <SidebarLink
              text="Watchlist"
              route="/watchlist"
              Icon={Visibility}
            />
            <SidebarLink
              text="Portfolio"
              route="/portfolio"
              Icon={AccountBalanceWallet}
            />
            <SidebarLink
              text="Alerts"
              route="/alerts"
              Icon={Notifications}
              alerts="true"
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
            <IconButton sx={{ color: "secondary.light" }}>
              <Tooltip title="Settings">
                <Settings fontSize="large" />
              </Tooltip>
            </IconButton>
          </MuiLink>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
