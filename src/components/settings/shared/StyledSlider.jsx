// src/components/settings/shared/StyledSlider.jsx
import React from "react";
import { Box, Slider, Typography, alpha, useTheme, Paper } from "@mui/material";

/**
 * Enhanced styled slider component for settings
 *
 * @param {number} value - Current value
 * @param {function} onChange - Function to call when value changes
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} step - Step size (null for marks only)
 * @param {array} marks - Array of mark objects with value and label
 * @param {string} label - Label for the slider
 * @param {function} valueDisplay - Function to display current value
 * @param {React.ElementType} icon - Icon to display
 * @param {object} sx - Additional styling
 */
const StyledSlider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  marks = [],
  label,
  valueDisplay,
  icon: Icon,
  sx = {},
  ...other
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Format display for the current value
  const getDisplayValue = () => {
    if (valueDisplay) {
      return valueDisplay(value);
    }
    return value;
  };

  // Generate marks for all integer values if step is 1
  const generateMarks = () => {
    if (marks && marks.length > 0) return marks;

    // If step is 1, generate a mark for each value
    if (step === 1) {
      return Array.from({ length: max - min + 1 }, (_, i) => ({
        value: min + i,
        label:
          min + i === min || min + i === max ? (min + i).toString() : undefined,
      }));
    }

    return undefined;
  };

  // Get appropriate slider color based on value
  const getSliderColor = () => {
    // Calculate color intensity based on value position in range
    const percentage = ((value - min) / (max - min)) * 100;

    if (percentage < 30) return theme.palette.success.main;
    if (percentage < 60) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <Box
      sx={{
        width: "100%",
        ...sx,
      }}
    >
      {/* Label and value display header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {Icon && (
            <Box
              sx={{
                mr: 1.5,
                p: 1,
                borderRadius: "50%",
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                fontSize="small"
                sx={{ color: theme.palette.primary.main }}
              />
            </Box>
          )}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            {label}
          </Typography>
        </Box>

        {/* Current value display */}
        <Paper
          elevation={1}
          sx={{
            px: 2,
            py: 0.75,
            borderRadius: 2,
            backgroundColor: alpha(getSliderColor(), 0.1),
            border: `1px solid ${alpha(getSliderColor(), 0.2)}`,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: getSliderColor(),
              whiteSpace: "nowrap",
            }}
          >
            {getDisplayValue()}
          </Typography>
        </Paper>
      </Box>

      {/* Custom Slider */}
      <Box
        sx={{
          px: 1,
          pt: 1.5,
          pb: 2.5, // Extra padding for mark labels
        }}
      >
        <Slider
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          marks={generateMarks()}
          valueLabelDisplay="auto"
          valueLabelFormat={getDisplayValue}
          sx={{
            color: getSliderColor(),
            height: 8,
            "& .MuiSlider-thumb": {
              height: 24,
              width: 24,
              backgroundColor: "#fff",
              border: `2px solid ${getSliderColor()}`,
              boxShadow: theme.shadows[2],
              "&:focus, &:hover, &.Mui-active": {
                boxShadow: `0px 0px 0px 8px ${alpha(getSliderColor(), 0.16)}`,
              },
            },
            "& .MuiSlider-track": {
              height: 8,
              borderRadius: 4,
              backgroundImage: `linear-gradient(to right, ${theme.palette.success.main}, ${theme.palette.warning.main}, ${theme.palette.error.main})`,
            },
            "& .MuiSlider-rail": {
              height: 8,
              borderRadius: 4,
              backgroundColor: isDarkMode
                ? alpha("#fff", 0.1)
                : alpha("#000", 0.05),
            },
            "& .MuiSlider-mark": {
              backgroundColor: isDarkMode
                ? alpha("#fff", 0.3)
                : alpha("#000", 0.2),
              height: 8,
              width: 1,
              marginTop: 0,
            },
            "& .MuiSlider-markActive": {
              backgroundColor: isDarkMode
                ? alpha("#fff", 0.5)
                : alpha("#000", 0.3),
            },
            "& .MuiSlider-markLabel": {
              fontSize: "0.75rem",
              fontWeight: 500,
              marginTop: 8,
              color: theme.palette.text.secondary,
            },
            ...other.sx,
          }}
          {...other}
        />
      </Box>
    </Box>
  );
};

export default StyledSlider;
