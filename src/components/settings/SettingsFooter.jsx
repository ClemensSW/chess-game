// src/components/settings/SettingsFooter.jsx
import React from "react";
import {
  DialogActions,
  Button,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

/**
 * Footer-Komponente für den Einstellungen-Dialog
 */
const SettingsFooter = ({ onClose, onApply }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <DialogActions
      sx={{
        p: 2,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        bgcolor: alpha(theme.palette.background.paper, 0.5),
        backdropFilter: "blur(10px)",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 1 : 0,
        justifyContent: "space-between",
      }}
    >
      <Button
        onClick={onClose}
        color="inherit"
        size="large"
        sx={{
          borderRadius: 2,
          px: 3,
          fontWeight: 500,
          width: isMobile ? "100%" : "auto",
          order: isMobile ? 2 : 1,
        }}
      >
        Abbrechen
      </Button>

      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{ width: isMobile ? "100%" : "auto" }}
      >
        <Button
          onClick={onApply}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<CheckCircleIcon />}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 600,
            boxShadow: theme.shadows[4],
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            "&:hover": {
              background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            },
            width: isMobile ? "100%" : "auto",
            order: isMobile ? 1 : 2,
          }}
        >
          Einstellungen übernehmen
        </Button>
      </motion.div>
    </DialogActions>
  );
};

export default SettingsFooter;
