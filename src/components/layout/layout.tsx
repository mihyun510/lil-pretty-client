// src/layout/MainLayout.tsx
import React from "react";
import { Box } from "@mui/material";
import { Header, Footer } from ".";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Box
      sx={{
        backgroundColor: "#FFE4EC",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer />
    </Box>
  );
}
