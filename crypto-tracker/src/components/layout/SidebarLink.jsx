import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SidebarLink = ({ text, Icon, route, toggleDrawer }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemButton
          component={Link}
          to={route}
          alignItems="center"
          sx={{
            "&.MuiListItemButton-gutters": {
              "&:hover": {
                backgroundColor: "background.default",
              },
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
