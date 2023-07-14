import {
  Avatar,
  Badge,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Person } from "@mui/icons-material/";
import React, { useState } from "react";
import { styled } from "@mui/system";
import { AiOutlineCheckCircle } from "react-icons/ai";
import useLocalStorage from "../../hooks/useLocalStorage";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Profile = () => {
  const [username, setUsername] = useLocalStorage("username", "Enter username");
  const [userCreated, setUserCreated] = useLocalStorage("user created", false);
  const [nameInput, setNameInput] = useState("");

  const handleChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleCreateUsername = (name) => {
    setUsername(name);
    setUserCreated(true);
  };

  if (userCreated === false) {
    return (
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent={{
          xs: "flex-start",
          lg: "center",
        }}
        gap={1}
        width="100%"
        sx={{
          cursor: "pointer",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            width: {
              xs: "fit-content",
              lg: "100%",
            },
            height: "2.8rem",
            bgcolor: "background.default",
            borderRadius: "4px",
          }}
        >
          <InputBase
            sx={{
              ml: 2,
              flex: 1,
              "& ::placeholder": {
                fontSize: "15px",
              },
            }}
            placeholder="Enter your name"
            label="Filter"
            value={nameInput}
            onChange={(e) => handleChange(e)}
            inputProps={{ "aria-label": "username" }}
          />
        </Paper>
        <Stack
          justifyContent="center"
          alignItems="center"
          onClick={() => handleCreateUsername(nameInput)}
        >
          <AiOutlineCheckCircle size="1.5rem" style={{ color: "#4fc3f7" }} />
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Stack flexDirection="row" alignItems="center">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="user" sx={{ bgcolor: "text.secondary" }}>
            <Person />
          </Avatar>
        </StyledBadge>
        <Typography variant="body1" ml="10px">
          {username}
        </Typography>
      </Stack>
    );
  }
};

export default Profile;
