import "./App.css";
import { createTheme, colors, ThemeProvider } from "@mui/material";
import Palette from "./Palette";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.blueGrey[800],
    },
    secondary: {
      main: colors.indigo[500],
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
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Palette />
      </>
      ;
    </ThemeProvider>
  );
}

export default App;
