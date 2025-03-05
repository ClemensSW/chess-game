// src/components/ErrorBoundary.jsx
import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error information
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Optional: Log error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    // Optional: Reload the app
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const { title, message } = this.props;
      const isDevelopment = import.meta.env?.DEV || false;

      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            bgcolor: "background.default",
            p: 2,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              maxWidth: 600,
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            <ErrorOutlineIcon
              sx={{ fontSize: 64, color: "error.main", mb: 2 }}
            />

            <Typography variant="h5" component="h2" gutterBottom color="error">
              {title || "Etwas ist schiefgegangen"}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {message ||
                "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie, die Seite neu zu laden."}
            </Typography>

            {isDevelopment && this.state.error && (
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: "background.default",
                  borderRadius: 1,
                  textAlign: "left",
                  overflowX: "auto",
                }}
              >
                <Typography variant="subtitle2" color="error.main">
                  Error Details:
                </Typography>
                <Typography
                  variant="body2"
                  component="pre"
                  sx={{ mt: 1, fontSize: "0.75rem" }}
                >
                  {this.state.error.toString()}
                </Typography>

                {this.state.errorInfo && (
                  <>
                    <Typography
                      variant="subtitle2"
                      color="error.main"
                      sx={{ mt: 2 }}
                    >
                      Component Stack:
                    </Typography>
                    <Typography
                      variant="body2"
                      component="pre"
                      sx={{ mt: 1, fontSize: "0.75rem" }}
                    >
                      {this.state.errorInfo.componentStack}
                    </Typography>
                  </>
                )}
              </Box>
            )}

            <Box
              sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}
            >
              <Button
                variant="outlined"
                onClick={this.handleReset}
                startIcon={<RefreshIcon />}
              >
                Zurücksetzen
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={this.handleReload}
              >
                Seite neu laden
              </Button>
            </Box>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
