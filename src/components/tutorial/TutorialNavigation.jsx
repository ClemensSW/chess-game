// src/components/tutorial/TutorialNavigation.jsx
import React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ExtensionIcon from "@mui/icons-material/Extension";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import PsychologyIcon from "@mui/icons-material/Psychology";

const TutorialNavigation = ({ steps, activeStep, onStepSelect, isMobile }) => {
  const theme = useTheme();

  // Map step icons to their components
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "WidgetsIcon":
        return <WidgetsIcon />;
      case "ExtensionIcon":
        return <ExtensionIcon />;
      case "EmojiEventsIcon":
        return <EmojiEventsIcon />;
      case "SportsKabaddiIcon":
        return <SportsKabaddiIcon />;
      case "PsychologyIcon":
        return <PsychologyIcon />;
      default:
        return <WidgetsIcon />;
    }
  };

  // Mobile navigation is horizontal and compact
  if (isMobile) {
    return (
      <Box
        sx={{
          overflowX: "auto",
          width: "100%",
          display: "flex",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          bgcolor: alpha(theme.palette.background.paper, 0.4),
          px: 1,
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={step.label}
            onClick={() => onStepSelect(index)}
            sx={{
              py: 1.5,
              px: 2,
              minWidth: "auto",
              textAlign: "center",
              cursor: "pointer",
              borderBottom: `3px solid ${
                activeStep === index
                  ? theme.palette.primary.main
                  : "transparent"
              }`,
              transition: "all 0.2s ease",
              opacity: activeStep === index ? 1 : 0.7,
              "&:hover": {
                opacity: 1,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                mx: "auto",
                mb: 0.5,
                bgcolor:
                  activeStep === index
                    ? theme.palette.primary.main
                    : alpha(theme.palette.text.primary, 0.2),
                "& .MuiSvgIcon-root": {
                  fontSize: 20,
                },
              }}
            >
              {getIconComponent(step.icon)}
            </Avatar>
            <Typography
              variant="caption"
              sx={{
                display: { xs: "none", sm: "block" },
                fontWeight: activeStep === index ? 600 : 400,
                color: activeStep === index ? "primary.main" : "text.secondary",
                fontSize: "0.7rem",
              }}
            >
              {step.label}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }

  // Desktop navigation is vertical
  return (
    <Box
      sx={{
        width: { xs: 70, sm: 180 },
        bgcolor: alpha(theme.palette.background.paper, 0.4),
        borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        nonLinear
        sx={{
          height: "100%",
          "& .MuiStepLabel-iconContainer": {
            paddingRight: { xs: 0, sm: 2 },
          },
          "& .MuiStepLabel-label": {
            display: { xs: "none", sm: "block" },
          },
          "& .MuiStepConnector-line": {
            minHeight: 20,
            ml: { xs: 2.65, sm: 2.25 },
            borderLeftWidth: 2,
            borderColor: alpha(theme.palette.primary.main, 0.2),
          },
          "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
            borderColor: theme.palette.primary.main,
          },
          "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
            borderColor: theme.palette.primary.main,
          },
          p: 2,
        }}
      >
        {steps.map((step, index) => (
          <Step
            key={step.label}
            completed={activeStep > index}
            sx={{
              "& .MuiStepLabel-root": {
                py: 1.5,
                px: { xs: 1, sm: 2 },
                borderRadius: 2,
                transition: "all 0.2s ease",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
                ...(activeStep === index && {
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                }),
              },
            }}
          >
            <StepLabel
              onClick={() => onStepSelect(index)}
              StepIconComponent={({ active, completed }) => (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor:
                      active || completed
                        ? theme.palette.primary.main
                        : alpha(theme.palette.text.primary, 0.2),
                    transition: "all 0.2s ease",
                    "& .MuiSvgIcon-root": {
                      fontSize: 18,
                      color:
                        active || completed
                          ? "#fff"
                          : alpha(theme.palette.text.primary, 0.6),
                    },
                  }}
                >
                  {getIconComponent(step.icon)}
                </Avatar>
              )}
            >
              <Typography
                variant="subtitle2"
                fontWeight={activeStep === index ? 700 : 500}
                color={activeStep === index ? "primary" : "text.primary"}
              >
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default TutorialNavigation;
