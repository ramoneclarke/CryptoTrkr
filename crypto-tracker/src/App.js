import "./App.css";
import {
  createTheme,
  colors,
  ThemeProvider,
  Box,
  CssBaseline,
  useMediaQuery,
  Typography,
} from "@mui/material";
import Sidebar from "./components/layout/Sidebar";
import MobileNavbar from "./components/layout/MobileNavbar";

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
      // paper: colors.blueGrey[800],
      // default: colors.blueGrey[900],
      paper: "#1A1B1D",
      default: "#141416",
    },
  },
});

function App() {
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100vw",
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
      </Box>
    </ThemeProvider>
  );
}

export default App;
