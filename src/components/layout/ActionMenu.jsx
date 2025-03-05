// src/components/layout/ActionMenu.jsx
import React from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  alpha, // Added this import
} from "@mui/material";

// Icons
import SaveIcon from "@mui/icons-material/Save";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SettingsIcon from "@mui/icons-material/Settings";
import ShareIcon from "@mui/icons-material/Share";

// Hooks
import { useGame } from "../../contexts/GameContext";

const ActionMenu = ({ anchorEl, open, onClose, onOpenSettings }) => {
  const { handleSaveGame, handleLoadGame, handleShareGame } = useGame();

  return (
    <Menu
      id="action-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={onClose}
      PaperProps={{
        elevation: 3,
        sx: {
          borderRadius: 2,
          minWidth: 200,
          mt: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? alpha(theme.palette.background.paper, 0.9)
              : alpha(theme.palette.background.paper, 0.9),
          backdropFilter: "blur(10px)",
          overflow: "visible",
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: -5,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        onClick={() => {
          handleSaveGame();
          onClose();
        }}
        sx={{ py: 1.5, borderRadius: 1, mx: 0.5 }}
      >
        <ListItemIcon>
          <SaveIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Save Game</ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => {
          handleLoadGame();
          onClose();
        }}
        sx={{ py: 1.5, borderRadius: 1, mx: 0.5 }}
      >
        <ListItemIcon>
          <FolderOpenIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Load Game</ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => {
          onOpenSettings();
          onClose();
        }}
        sx={{ py: 1.5, borderRadius: 1, mx: 0.5 }}
      >
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => {
          handleShareGame();
          onClose();
        }}
        sx={{ py: 1.5, borderRadius: 1, mx: 0.5 }}
      >
        <ListItemIcon>
          <ShareIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Share Game</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default ActionMenu;
