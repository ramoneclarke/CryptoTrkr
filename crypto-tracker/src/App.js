import "./App.css";
import {
  createTheme,
  colors,
  ThemeProvider,
  Box,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import Sidebar from "./components/layout/Sidebar";
import MobileNavbar from "./components/layout/MobileNavbar";

import { Outlet } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import DataContextProvider from "./context/DataContext";
import { UserContextProvider } from "./context/UserContext";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.blueGrey[800],
    },
    secondary: {
      main: colors.cyan[500],
    },
    tertiary: {
      main: colors.cyan[500],
      light: colors.cyan[300],
      dark: colors.cyan[700],
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
      paper: colors.blueGrey[800],
      default: colors.blueGrey[900],
      // paper: "#1A1B1D",
      // default: "#141416",
    },
    action: {
      hover: colors.cyan[800],
    },
    chip: {
      // watch: colors.yellow[600],
      watch: colors.blueGrey[400],
      // portfolio: "#ff8463",
      portfolio: colors.blueGrey[400],
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
});

function App() {
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <AppContextProvider>
      <DataContextProvider>
        <UserContextProvider>
          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
        </UserContextProvider>
      </DataContextProvider>
    </AppContextProvider>
  );
}

export default App;
