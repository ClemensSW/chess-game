// src/theme/themeConfig.js
import { createTheme } from "@mui/material/styles";

// Shared color palette
const colors = {
  primary: {
    main: "#1E88E5", // Modern blue
    light: "#6AB7FF",
    dark: "#005CB2",
    contrastText: "#fff",
  },
  secondary: {
    main: "#26A69A", // Teal
    light: "#64D8CB",
    dark: "#00766C",
    contrastText: "#fff",
  },
  success: {
    main: "#66BB6A",
    light: "#98EE99",
    dark: "#338A3E",
  },
  error: {
    main: "#F44336",
    light: "#FF7961",
    dark: "#BA000D",
  },
  warning: {
    main: "#FFA726",
    light: "#FFD95B",
    dark: "#C77800",
  },
  info: {
    main: "#29B6F6",
    light: "#73E8FF",
    dark: "#0086C3",
  },
  text: {
    primary: "#212121",
    secondary: "#757575",
    disabled: "#9E9E9E",
  },
  background: {
    default: "#F5F7FA",
    paper: "#FFFFFF",
    dark: "#121212",
    darkPaper: "#1E1E1E",
  },
  chess: {
    lightSquare: "#F0D9B5", // Classic chess board colors
    darkSquare: "#B58863",
    selectedSquare: "#BBCB2B",
    validMoveLight: "#D5E39A",
    validMoveDark: "#A3C939",
    lastMoveLight: "#E6D9A2",
    lastMoveDark: "#B39C56",
  },
  divider: "rgba(0, 0, 0, 0.12)",
};

// Create Light Theme
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
      fontWeight: 500,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 500,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 500,
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
          borderRadius: 8,
          boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.05)",
        },
        elevation1: {
          boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.05)",
        },
        elevation2: {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
        },
        elevation3: {
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.12)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "8px 16px",
          fontWeight: 500,
        },
        contained: {
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
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
  chess: colors.chess, // Custom property for chess board colors
});

// Create Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#64B5F6", // Lighter blue for Dark Mode
      light: "#9BE7FF",
      dark: "#2286C3",
      contrastText: "#000",
    },
    secondary: {
      main: "#4DB6AC", // Lighter teal for Dark Mode
      light: "#82E9DE",
      dark: "#00867D",
      contrastText: "#000",
    },
    success: {
      main: "#81C784",
      light: "#B2F2B6",
      dark: "#519657",
    },
    error: {
      main: "#E57373",
      light: "#FFA4A2",
      dark: "#AF4448",
    },
    warning: {
      main: "#FFB74D",
      light: "#FFECB3",
      dark: "#C88719",
    },
    info: {
      main: "#4FC3F7",
      light: "#8BF6FF",
      dark: "#0093C4",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0BEC5",
      disabled: "#78909C",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
  typography: {
    // Same typography as Light Theme
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
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
          borderRadius: 8,
          backgroundColor: colors.background.darkPaper,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
  },
  chess: {
    // Darker color scheme for chess board in Dark Mode
    lightSquare: "#ABABAB", // Darker gray for light squares
    darkSquare: "#5C5C5C", // Darker gray for dark squares
    selectedSquare: "#7FA650",
    validMoveLight: "#A6BE7E",
    validMoveDark: "#758F45",
    lastMoveLight: "#A9A9A9",
    lastMoveDark: "#787878",
  },
});

// Function to switch between Light and Dark Theme
export const getThemeByMode = (mode) => {
  return mode === "dark" ? darkTheme : lightTheme;
};

export default lightTheme;
