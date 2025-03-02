// src/components/tutorial/ChessTutorial.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Avatar,
  useTheme,
  alpha,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import TutorialNavigation from "./TutorialNavigation";
import TutorialControls from "./TutorialControls";
// Import step components
import TutorialBasics from "./steps/TutorialBasics";
import TutorialPieces from "./steps/TutorialPieces";
import TutorialSpecialMoves from "./steps/TutorialSpecialMoves";
import TutorialCheckmate from "./steps/TutorialCheckmate";
import TutorialStrategy from "./steps/TutorialStrategy";

// Import custom scrollbar styles
import "../../styles/customScrollbar.css";

const ChessTutorial = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeStep, setActiveStep] = useState(0);

  // Add class for scrollbar dark mode detection
  useEffect(() => {
    if (theme.palette.mode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme.palette.mode]);

  // Step definitions with titles and components
  const steps = [
    {
      label: "Grundlagen",
      icon: "WidgetsIcon",
      component: TutorialBasics,
    },
    {
      label: "Figuren und Zugregeln",
      icon: "ExtensionIcon",
      component: TutorialPieces,
    },
    {
      label: "Spezielle Züge",
      icon: "EmojiEventsIcon",
      component: TutorialSpecialMoves,
    },
    {
      label: "Schach, Schachmatt und Patt",
      icon: "SportsKabaddiIcon",
      component: TutorialCheckmate,
    },
    {
      label: "Grundlegende Strategien",
      icon: "PsychologyIcon",
      component: TutorialStrategy,
    },
  ];

  // Navigation handlers
  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleStepSelect = (index) => {
    setActiveStep(index);
  };

  // Dynamically render the current step component
  const CurrentStepComponent = steps[activeStep].component;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
      sx={{
        "& .MuiDialog-paper": {
          height: isMobile ? "100%" : "90vh",
          borderRadius: isMobile ? 0 : 3,
          overflow: "hidden",
        },
      }}
      PaperComponent={motion.div}
      PaperProps={{
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.3 },
        sx: {
          borderRadius: isMobile ? 0 : 3,
          overflow: "hidden",
          backgroundImage:
            theme.palette.mode === "dark"
              ? `linear-gradient(to bottom right, ${alpha(
                  theme.palette.background.paper,
                  0.9
                )}, ${alpha(theme.palette.background.default, 0.95)})`
              : `linear-gradient(to bottom right, ${alpha(
                  "#fff",
                  0.97
                )}, ${alpha(theme.palette.background.default, 0.95)})`,
          backdropFilter: "blur(10px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 10px 40px rgba(0,0,0,0.5)"
              : "0 10px 40px rgba(0,0,0,0.15)",
          display: "flex", // Set to flex
          flexDirection: "column", // Use column layout
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 3,
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(90deg, ${alpha(
                  theme.palette.primary.dark,
                  0.2
                )}, transparent)`
              : `linear-gradient(90deg, ${alpha(
                  theme.palette.primary.light,
                  0.2
                )}, transparent)`,
          flex: "0 0 auto", // Don't allow to grow or shrink
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              width: 50,
              height: 50,
              bgcolor: alpha(theme.palette.primary.main, 0.9),
              mr: 2,
              boxShadow: theme.shadows[4],
            }}
          >
            <MenuBookIcon sx={{ fontSize: 30 }} />
          </Avatar>
          <Box>
            <Typography
              variant="h5"
              component="div"
              fontWeight={700}
              sx={{
                background:
                  theme.palette.mode === "dark"
                    ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                    : `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Schach-Anleitung für Einsteiger
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Lerne die Grundlagen des königlichen Spiels
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={onClose}
          size="large"
          sx={{
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.background.paper, 0.3),
            "&:hover": {
              backgroundColor: alpha(theme.palette.background.paper, 0.5),
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          flex: "1 1 auto", // Allow to grow and shrink
          overflow: "hidden", // Hide overflow
        }}
      >
        {/* Navigation sidebar */}
        <TutorialNavigation
          steps={steps}
          activeStep={activeStep}
          onStepSelect={handleStepSelect}
          isMobile={isMobile}
        />

        {/* Content area */}
        <DialogContent
          sx={{
            p: 0,
            overflow: "auto",
            flex: 1,
            scrollbarWidth: "thin", // For Firefox
            "&::-webkit-scrollbar": {
              // For Webkit browsers
              width: "8px",
              height: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: alpha(
                theme.palette.mode === "dark" ? "#fff" : "#000",
                0.04
              ),
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: alpha(
                theme.palette.mode === "dark" ? "#fff" : "#000",
                0.2
              ),
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: alpha(
                theme.palette.mode === "dark" ? "#fff" : "#000",
                0.3
              ),
            },
          }}
        >
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{ padding: "24px", height: "100%" }}
          >
            <CurrentStepComponent theme={theme} />
          </motion.div>
        </DialogContent>
      </Box>

      {/* Bottom navigation controls */}
      <TutorialControls
        activeStep={activeStep}
        stepsLength={steps.length}
        onBack={handleBack}
        onNext={handleNext}
        onReset={handleReset}
        isMobile={isMobile}
      />
    </Dialog>
  );
};

export default ChessTutorial;
