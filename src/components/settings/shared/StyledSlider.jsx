// src/components/settings/shared/StyledSlider.jsx
import React from "react";
import { Box, Typography, Slider, alpha, useTheme } from "@mui/material";
import { motion } from "framer-motion";

/**
 * Angepasster Slider mit verbesserter visueller Darstellung
 */
const StyledSlider = ({
  value,
  onChange,
  min,
  max,
  step,
  marks,
  label,
  icon,
  discrete = false,
  valueDisplay,
  sx = {},
}) => {
  const theme = useTheme();

  const SliderIcon = icon;

  // Wenn ein benutzerdefinierter Wert-Display-Text übergeben wurde
  const displayValue = valueDisplay ? valueDisplay(value) : value;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{
        mt: 3,
        ...sx,
        padding: 2,
        borderRadius: 2,
        backgroundColor: alpha(theme.palette.background.paper, 0.3),
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          {icon && (
            <SliderIcon
              sx={{
                mr: 1.5,
                color:
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.primary.main, 0.9)
                    : theme.palette.primary.main,
                fontSize: 20,
              }}
            />
          )}
          <Typography variant="subtitle2" fontWeight={500} color="text.primary">
            {label}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            px: 1.5,
            py: 0.5,
            borderRadius: 5,
            minWidth: 35,
            textAlign: "center",
          }}
        >
          {displayValue}
        </Typography>
      </Box>
      <Slider
        value={value}
        onChange={onChange}
        step={step}
        marks={marks}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        sx={{
          "& .MuiSlider-thumb": {
            width: 16,
            height: 16,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&:before": {
              boxShadow: "0 2px 12px 0 rgba(0,0,0,0.2)",
            },
            "&:hover, &.Mui-focusVisible": {
              boxShadow: `0px 0px 0px 8px ${alpha(
                theme.palette.primary.main,
                0.16
              )}`,
            },
            "&.Mui-active": {
              width: 20,
              height: 20,
            },
          },
          "& .MuiSlider-rail": {
            opacity: 0.28,
          },
          "& .MuiSlider-markLabel": {
            fontSize: "0.75rem",
            fontWeight: 500,
          },
        }}
      />
    </Box>
  );
};

export default StyledSlider;
