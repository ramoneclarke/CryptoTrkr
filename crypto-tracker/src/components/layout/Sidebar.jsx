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
  Home,
  AccountBalanceWallet,
  Visibility,
  Feed,
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
            <Profile name />
          </Toolbar>
          <Divider variant="middle" sx={{ bgcolor: "text.secondary" }} />
          <List>
            <SidebarLink text="Dashboard" route="/" Icon={Home} />
            <SidebarLink text="Market" route="/market" Icon={ShowChart} />
            <SidebarLink
              text="Watch List"
              route="/watchlist"
              Icon={Visibility}
            />
            <SidebarLink
              text="Portfolio"
              route="/portfolio"
              Icon={AccountBalanceWallet}
            />
            <SidebarLink text="News" route="/news" Icon={Feed} />
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
