// src/components/game-end/GameEndActions.jsx
import React from "react";
import {
  DialogActions,
  Button,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import BarChartIcon from "@mui/icons-material/BarChart";
import ReplayIcon from "@mui/icons-material/Replay";

/**
 * Actions section of the GameEndDialog with buttons
 */
const GameEndActions = ({ onClose, onShare, onAnalyze, onNewGame }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Handle new game with validation
  const handleNewGame = () => {
    if (typeof onNewGame === "function") {
      onNewGame();
      // Also close the dialog when starting a new game
      if (typeof onClose === "function") {
        onClose();
      }
    } else {
      console.error("onNewGame is not a function");
    }
  };

  // Button animation variants
  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + custom * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <DialogActions
      sx={{
        p: 2.5,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "stretch",
        gap: 1.5,
        backgroundColor: alpha(theme.palette.background.paper, 0.4),
      }}
    >
      <motion.div
        custom={0}
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        style={{ width: isMobile ? "100%" : "auto" }}
      >
        <Button
          onClick={onClose}
          color="inherit"
          startIcon={<CloseIcon />}
          fullWidth={isMobile}
          sx={{
            borderRadius: 2,
            px: 2,
            py: 1,
            backgroundColor: alpha(theme.palette.background.default, 0.3),
            "&:hover": {
              backgroundColor: alpha(theme.palette.background.default, 0.5),
            },
          }}
        >
          Schließen
        </Button>
      </motion.div>

      {onShare && (
        <motion.div
          custom={1}
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          style={{ width: isMobile ? "100%" : "auto" }}
        >
          <Button
            onClick={onShare}
            color="secondary"
            startIcon={<ShareIcon />}
            fullWidth={isMobile}
            variant="outlined"
            sx={{
              borderRadius: 2,
              px: 2,
              py: 1,
              borderWidth: "1.5px",
            }}
          >
            Teilen
          </Button>
        </motion.div>
      )}

      {onAnalyze && (
        <motion.div
          custom={2}
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          style={{ width: isMobile ? "100%" : "auto" }}
        >
          <Button
            onClick={onAnalyze}
            color="info"
            variant="outlined"
            startIcon={<BarChartIcon />}
            fullWidth={isMobile}
            sx={{
              borderRadius: 2,
              px: 2,
              py: 1,
              borderWidth: "1.5px",
            }}
          >
            Analysieren
          </Button>
        </motion.div>
      )}

      <motion.div
        custom={3}
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{ width: isMobile ? "100%" : "auto" }}
      >
        <Button
          onClick={handleNewGame}
          variant="contained"
          color="primary"
          startIcon={<ReplayIcon />}
          fullWidth={isMobile}
          sx={{
            borderRadius: 2,
            px: 2,
            py: 1.1,
            fontWeight: 600,
            boxShadow: theme.shadows[4],
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            "&:hover": {
              background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              boxShadow: theme.shadows[6],
            },
          }}
        >
          Neue Partie
        </Button>
      </motion.div>
    </DialogActions>
  );
};

export default GameEndActions;
