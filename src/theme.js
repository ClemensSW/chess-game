import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Du kannst hier später dynamisch zwischen 'light' und 'dark' wechseln
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          transition: "background-color 0.3s ease",
        },
      },
    },
  },
});

export default theme;
