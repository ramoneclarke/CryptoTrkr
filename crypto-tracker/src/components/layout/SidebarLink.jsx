import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const SidebarLink = ({ text, Icon, route, toggleDrawer }) => {
  const location = useLocation();

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
              backgroundColor: "primary.dark",
              borderRadius: "10px",
            },
          }}
          onClick={toggleDrawer}
        >
          <ListItemIcon>
            <Icon sx={{ color: "text.secondary" }} />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default SidebarLink;
