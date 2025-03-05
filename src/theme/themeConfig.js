// src/theme/themeConfig.js - Verbesserte Farbpalette
import { createTheme } from "@mui/material/styles";

// Neue hochwertige Farbpalette
const colors = {
  primary: {
    main: "#3A5DAE", // Königliches Blau (tiefer, edler)
    light: "#6281D0",
    dark: "#2A4480",
    contrastText: "#fff",
  },
  secondary: {
    main: "#E09E45", // Elegantes Gold/Bernstein
    light: "#F2BD6E",
    dark: "#BD7B29",
    contrastText: "#fff",
  },
  success: {
    main: "#4CAF50", // Klares Grün
    light: "#80E27E",
    dark: "#087F23",
  },
  error: {
    main: "#D32F2F", // Lebendiges Rot
    light: "#FF6659",
    dark: "#9A0007",
  },
  warning: {
    main: "#F9A825", // Warmes Gelb
    light: "#FFD95A",
    dark: "#C17900",
  },
  info: {
    main: "#0288D1", // Informatives Blau
    light: "#5EB8FF",
    dark: "#005B9F",
  },
  text: {
    primary: "#263238", // Tieferes Schwarz für bessere Lesbarkeit
    secondary: "#546E7A",
    disabled: "#78909C",
  },
  background: {
    default: "#F8F7F5", // Leichter wärmerer Ton als reines Weiß
    paper: "#FFFFFF",
    dark: "#1E2738", // Tiefes Marineblau statt reines Schwarz
    darkPaper: "#273142",
  },
  chess: {
    // Elegantere und gesättigtere Schachbrettfarben
    lightSquare: "#EEDCB5", // Creme (wärmer)
    darkSquare: "#9E7863", // Mahagoni (tiefer)
    selectedSquare: "#B8E986", // Helles Grün
    validMoveLight: "#D6EDB9",
    validMoveDark: "#8BB056",
    lastMoveLight: "#F8E2A0",
    lastMoveDark: "#D9B85C",
  },
  divider: "rgba(0, 0, 0, 0.12)",
};

// Light-Theme mit den neuen Farben
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    text: colors.text,
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    divider: colors.divider,
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background.default,
          color: colors.text.primary,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        },
        elevation1: {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        },
        elevation2: {
          boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.09)",
        },
        elevation3: {
          boxShadow: "0px 10px 35px rgba(0, 0, 0, 0.12)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          padding: "10px 20px",
          fontWeight: 600,
        },
        contained: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
          "&:hover": {
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.18)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "transform 0.2s ease-in-out, background-color 0.2s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: "16px 0",
        },
      },
    },
  },
  chess: colors.chess, // Benutzerdefinierte Eigenschaft für Schachbrettfarben
});

// Dark-Theme mit den neuen Farben
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4D82E5", // Helleres Blau für Dark Mode
      light: "#80B0FF",
      dark: "#2C5BBC",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFB74D", // Helleres Gold für Dark Mode
      light: "#FFE97D",
      dark: "#C88719",
      contrastText: "#000",
    },
    success: {
      main: "#66BB6A",
      light: "#98EE99",
      dark: "#338A3E",
    },
    error: {
      main: "#EF5350",
      light: "#FF867C",
      dark: "#B61827",
    },
    warning: {
      main: "#FFCA28",
      light: "#FFF350",
      dark: "#C79A00",
    },
    info: {
      main: "#42A5F5",
      light: "#80D6FF",
      dark: "#0077C2",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0BEC5",
      disabled: "#78909C",
    },
    background: {
      default: "#1E2738",
      paper: "#273142",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
  typography: {
    // Gleiche Typografie wie Light-Theme
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background.dark,
          color: "#FFFFFF",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: colors.background.darkPaper,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          padding: "10px 20px",
          fontWeight: 600,
        },
      },
    },
  },
  chess: {
    // Verbesserte Schachbrettfarben für den Dark Mode
    lightSquare: "#B8B8B8", // Helles Grau
    darkSquare: "#505050", // Dunkleres Grau
    selectedSquare: "#7EA553",
    validMoveLight: "#A6BE7E",
    validMoveDark: "#758F45",
    lastMoveLight: "#C0C0C0",
    lastMoveDark: "#808080",
  },
});

// Funktion zum Wechseln zwischen Light- und Dark-Theme
export const getThemeByMode = (mode) => {
  return mode === "dark" ? darkTheme : lightTheme;
};

export default lightTheme;
