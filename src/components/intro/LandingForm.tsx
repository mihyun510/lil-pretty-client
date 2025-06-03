// src/pages/Landing.tsx
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import "./Landing.css";

export default function LandingForm() {
  return (
    <Box className="landing-root">
      <Container maxWidth="md">
        <img
          src="/main_logo.png" // public 폴더에 넣은 경우
          alt="짠예살롱로고"
          className="landing-image"
        />
        <img
          src="/bear_image.png" // public 폴더에 넣은 경우
          alt="짠예살롱 캐릭터"
          className="landing-image"
        />
        <Paper elevation={3} className="landing-image-box">
          <Box className="landing-text">
            <Typography variant="h6" fontWeight="bold">
              월급은 사라져도 예쁨은 포기 못 해!
            </Typography>
            <Typography variant="body2">
              돈은 없지만 예쁨은 포기 못 해! <br />
              오늘도 ₩3,000으로 예뻐지기 프로젝트
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
