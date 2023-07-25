import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Link as MuiLink,
  Badge,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo";
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";
import { Link } from "react-router-dom";
import CurrencySelector from "../shared-components/CurrencySelector";
import { Notifications } from "@mui/icons-material";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const styledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  outline: "none",
  boxShadow: "none",
  "&:focus, &:hover, &:visited, &:link, &:active": {
    textDecoration: "none",
    outline: "none",
    boxShadow: "none",
  },
  // "&:last-child td, &:last-child th":
}));

const MobileNavbar = () => {
  const useUserContext = useContext(UserContext);
  const { unopenedAlerts } = useUserContext;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <AppBar position="static" color="inherit">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <MuiLink
            component={Link}
            to="/"
            underline="none"
            sx={{ ml: "0.5rem" }}
          >
            <Logo />
          </MuiLink>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencySelector />
            <MuiLink
              component={styledLink}
              to="/alerts"
              underline="none"
              sx={{
                ml: "1rem",
                textDecoration: "none",
                "& .MuiLink-root": {
                  textDecoration: "none",
                },
              }}
            >
              <Badge badgeContent={unopenedAlerts} color="warning">
                <Notifications
                  fontSize="large"
                  sx={{ color: "text.secondary" }}
                />
              </Badge>
            </MuiLink>
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
