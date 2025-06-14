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
      <DialogTitle
        align="center"
        sx={{ mt: 6, mb: 2, p: 0 }} // 여백 줄이기
      >
        <img src="/bear_face.png" alt="로고" width="50" />
        <Typography
          variant="h6"
          color="text.secondary" // 회색 텍스트
          sx={{ mt: -1 }} // 위 여백 아주 살짝만
        >
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center", mb: 5 }}>
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
