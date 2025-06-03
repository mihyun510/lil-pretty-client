// src/components/AuthDialogWrapper.tsx

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../auth/LoginForm.module.css";

interface AuthDialogWrapperProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  subText?: React.ReactNode;
}

export default function AuthDialogWrapper({
  open,
  onClose,
  title,
  children,
  subText,
}: AuthDialogWrapperProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box position="relative">
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogTitle align="center" sx={{ mt: 3 }}>
        <img src="/logo.png" alt="로고" width="50" />
        <Typography variant="h6" mt={1}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        {subText && (
          <Box display="flex" justifyContent="flex-end" mb={2}>
            {subText}
          </Box>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}
