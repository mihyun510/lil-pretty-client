// src/components/SwellingMapMainForm.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import KakaoMapForm from "./KakaoMapForm";

export default function SwellingMapMainForm() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      {/* 챌린지 버튼 */}
      <Button
        variant="contained"
        sx={{
          mb: 3,
          borderRadius: "20px",
          backgroundColor: "#f4a7a7",
          "&:hover": { backgroundColor: "#f28b8b" },
        }}
        onClick={() => navigate("/swellingmap/challenge")}
      >
        붓기 빼기 챌린지
      </Button>

      {/* 지도 영역 */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          height: 500,
          mx: "auto",
          mb: 4,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <KakaoMapForm />
      </Box>

      {/* 탭 메뉴 */}
      <Tabs
        value={tabValue}
        onChange={handleChange}
        centered
        sx={{
          mb: 3,
          "& .Mui-selected": { color: "#d32f2f", fontWeight: "bold" },
        }}
      >
        <Tab label="붓기 식당 모음" />
        <Tab label="붓기 샵" />
        <Tab label="붓기 마사지 샵" />
      </Tabs>

      {/* 카드 리스트 */}
      <Grid container spacing={3} justifyContent="center">
        {[1, 2, 3, 4].map((item) => (
          <Grid item key={item} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ p: 2, height: 220 }}>
              <Box
                sx={{
                  width: "100%",
                  height: 100,
                  bgcolor: "#ccc",
                  borderRadius: 2,
                  mb: 2,
                }}
              />
              <CardContent sx={{ textAlign: "left" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Dr. John Doe
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  CUHK Medical Centre
                </Typography>
                <Typography variant="body2" mt={1}>
                  ⭐ 4.8{" "}
                  <span style={{ fontWeight: "bold" }}>(156 reviews)</span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
