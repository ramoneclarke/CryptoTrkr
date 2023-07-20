import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Badge,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const SidebarLink = ({ text, Icon, route, toggleDrawer, alerts }) => {
  const location = useLocation();
  const useUserContext = useContext(UserContext);
  const { unopenedAlerts } = useUserContext;

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemButton
          component={Link}
          to={route}
          selected={route === location.pathname}
          alignItems="center"
          sx={{
            "&.MuiListItemButton-gutters": {
              borderRadius: "10px",
              "&:hover": {
                borderRadius: "10px",
              },
            },
            "&.Mui-selected": {
              backgroundColor: "secondary.dark",
              borderRadius: "10px",
            },
          }}
          onClick={toggleDrawer}
          data-test={`nav-link-${text.toLowerCase()}`}
        >
          <ListItemIcon>
            {alerts ? (
              <Badge badgeContent={unopenedAlerts} color="warning">
                <Icon sx={{ color: "text.secondary" }} />
              </Badge>
            ) : (
              <Icon sx={{ color: "text.secondary" }} />
            )}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default SidebarLink;
