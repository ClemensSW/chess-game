// src/components/tutorial/TutorialControls.jsx
import React from "react";
import {
  Box,
  Button,
  Chip,
  DialogActions,
  useTheme,
  alpha,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const TutorialControls = ({
  activeStep,
  stepsLength,
  onBack,
  onNext,
  onReset,
  isMobile,
}) => {
  const theme = useTheme();

  return (
    <DialogActions
      sx={{
        p: 2,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        bgcolor: alpha(theme.palette.background.paper, 0.5),
        backdropFilter: "blur(10px)",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 1 : 0,
        justifyContent: "space-between", // Changed to space-between for better distribution
        minHeight: "64px", // Ensure consistent height
        width: "100%", // Ensure full width
        boxSizing: "border-box",
      }}
    >
      <Button
        onClick={onBack}
        disabled={activeStep === 0}
        startIcon={<ArrowBackIcon />}
        sx={{
          px: 3,
          py: 1,
          borderRadius: 2,
          fontWeight: 600,
          width: isMobile ? "100%" : "auto",
          order: isMobile ? 1 : 1,
          minWidth: "100px", // Ensure button has minimum width
          visibility: activeStep === 0 ? "hidden" : "visible", // Hide but preserve space when disabled
        }}
      >
        Zurück
      </Button>

      {/* Only show step indicator on desktop */}
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            order: 2,
            width: "auto",
            flexGrow: 1, // Allow to grow
            mx: 2, // Add margin for spacing
          }}
        >
          <Chip
            label={`Schritt ${activeStep + 1} von ${stepsLength}`}
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </Box>
      )}

      {activeStep === stepsLength - 1 ? (
        <Button
          onClick={onReset}
          variant="outlined"
          color="primary"
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
            fontWeight: 600,
            width: isMobile ? "100%" : "auto",
            order: isMobile ? 2 : 3,
            minWidth: "100px", // Ensure button has minimum width
            mt: isMobile ? 1 : 0,
          }}
        >
          Zum Anfang
        </Button>
      ) : (
        <Button
          onClick={onNext}
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
            fontWeight: 600,
            boxShadow: theme.shadows[4],
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            "&:hover": {
              background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            },
            width: isMobile ? "100%" : "auto",
            order: isMobile ? 2 : 3,
            minWidth: "100px", // Ensure button has minimum width
            mt: isMobile ? 1 : 0,
          }}
        >
          Weiter
        </Button>
      )}
    </DialogActions>
  );
};

export default TutorialControls;
