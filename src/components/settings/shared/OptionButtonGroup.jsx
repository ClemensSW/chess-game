// src/components/settings/shared/OptionButtonGroup.jsx
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  alpha,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

/**
 * Wiederverwendbare Komponente für die Auswahl von Optionen in Form von Buttons
 */
const OptionButtonGroup = ({
  options,
  value,
  onChange,
  label,
  icon,
  columns = 2,
  fullWidth = false,
  getOptionLabel = (option) => option.label,
}) => {
  const theme = useTheme();
  const IconComponent = icon;

  return (
    <Box sx={{ mt: 3 }}>
      {(label || icon) && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
          {icon && (
            <IconComponent
              sx={{ mr: 1.5, color: theme.palette.primary.main }}
            />
          )}
          <Typography variant="subtitle2" fontWeight={500} color="text.primary">
            {label}
          </Typography>
        </Box>
      )}

      <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
        <Grid container spacing={1.5}>
          {options.map((option) => (
            <Grid
              item
              xs={12}
              sm={option.fullWidth ? 12 : 12 / columns}
              key={option.value}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Paper
                  component={FormControlLabel}
                  value={option.value}
                  control={
                    <Radio
                      sx={{
                        p: 1,
                        color:
                          value === option.value
                            ? theme.palette.primary.main
                            : undefined,
                      }}
                    />
                  }
                  label={
                    <Box
                      sx={{
                        py: 0.5,
                        pr: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {option.icon && (
                        <Box
                          component={option.icon}
                          sx={{
                            mr: 1,
                            fontSize: "1.25rem",
                            color:
                              value === option.value
                                ? "primary.main"
                                : "text.secondary",
                          }}
                        />
                      )}
                      <Typography
                        variant="body2"
                        fontWeight={value === option.value ? 600 : 400}
                        color={
                          value === option.value ? "primary" : "text.primary"
                        }
                      >
                        {getOptionLabel(option)}
                      </Typography>
                    </Box>
                  }
                  sx={{
                    m: 0,
                    p: 0,
                    borderRadius: 2,
                    overflow: "hidden",
                    border: `1px solid ${
                      value === option.value
                        ? theme.palette.primary.main
                        : alpha(theme.palette.divider, 0.5)
                    }`,
                    backgroundColor:
                      value === option.value
                        ? alpha(
                            theme.palette.primary.main,
                            theme.palette.mode === "dark" ? 0.15 : 0.08
                          )
                        : alpha(theme.palette.background.paper, 0.6),
                    "&:hover": {
                      backgroundColor:
                        value === option.value
                          ? alpha(
                              theme.palette.primary.main,
                              theme.palette.mode === "dark" ? 0.2 : 0.12
                            )
                          : alpha(theme.palette.background.paper, 0.8),
                    },
                    width: "100%",
                    transition: "all 0.2s ease",
                  }}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </Box>
  );
};

export default OptionButtonGroup;
