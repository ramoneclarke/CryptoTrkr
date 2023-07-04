import "./App.css";
import {
  createTheme,
  colors,
  ThemeProvider,
  Box,
  CssBaseline,
  useMediaQuery,
  IconButton,
} from "@mui/material";

import Sidebar from "./components/layout/Sidebar";
import MobileNavbar from "./components/layout/MobileNavbar";
import { SnackbarProvider } from "notistack";

import { Outlet } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import DataContextProvider from "./context/DataContext";
import { UserContextProvider } from "./context/UserContext";
import { createRef } from "react";
import { Close } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.blueGrey[800],
    },
    secondary: {
      main: colors.lightBlue[500],
      light: colors.lightBlue[300],
      dark: colors.lightBlue[700],
    },
    tertiary: {
      main: "#752719",
      light: "#ff833a",
      dark: "#ac1900",
    },
    blacks: {
      main: "#141416",
      light: "#1A1B1D",
    },
    text: {
      primary: "#FFFFFF",
      secondary: colors.blueGrey[400],
    },
    background: {
      // paper: colors.blueGrey[800],
      // default: colors.blueGrey[900],
      default: "#1A1B1D",
      paper: "#141416",
      // paper: "#111827", // Gummy search
      // default: "#1F2937",
    },
    action: {
      hover: "#1A1B1D",
    },
    chip: {
      default: colors.blueGrey[400],
      watch: colors.blueGrey[400],
      watchActive: colors.yellow[700],
      portfolio: colors.blueGrey[400],
      portfolioActive: "#ff8463",
      // portfolioActive: colors.cyan[400],
    },
    change: {
      gain: colors.green[500],
      loss: colors.red[600],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1600,
    },
  },
  shape: {
    borderRadius: 12,
    containerBorderRadius: 2,
  },
});

function App() {
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));
  const notistackRef = createRef();
  const onClickDismiss = (key, message) => () => {
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <AppContextProvider>
      <DataContextProvider>
        <UserContextProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider
              maxSnack={3}
              ref={notistackRef}
              action={(key) => (
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={onClickDismiss(key)}
                >
                  <Close fontSize="small" />
                </IconButton>
              )}
            >
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    xl: "100%",
                  },
                  margin: "auto",
                  height: "100vh",
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                }}
              >
                <CssBaseline />
                {isSmallDevice ? <MobileNavbar /> : <Sidebar />}
                <Outlet />
              </Box>
            </SnackbarProvider>
          </ThemeProvider>
        </UserContextProvider>
      </DataContextProvider>
    </AppContextProvider>
  );
}

export default App;
