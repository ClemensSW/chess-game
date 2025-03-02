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
          order: isMobile ? 2 : 1,
        }}
      >
        Zurück
      </Button>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          order: isMobile ? 1 : 2,
          width: isMobile ? "100%" : "auto",
          my: isMobile ? 1 : 0,
        }}
      >
        <Chip
          label={`Schritt ${activeStep + 1} von ${stepsLength}`}
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
      </Box>

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
            order: isMobile ? 3 : 3,
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
            order: isMobile ? 3 : 3,
          }}
        >
          Weiter
        </Button>
      )}
    </DialogActions>
  );
};

export default TutorialControls;
