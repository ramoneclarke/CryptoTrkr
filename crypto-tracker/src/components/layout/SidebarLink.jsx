import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import React from "react";

const SidebarLink = ({ text, Icon }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemButton
          component="a"
          href="#"
          alignItems="center"
          sx={{
            "&.MuiListItemButton-gutters": {
              "&:hover": {
                backgroundColor: "background.default",
              },
            },
          }}
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
