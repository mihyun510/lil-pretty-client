// src/pages/Landing.tsx
import { Box, Typography } from "@mui/material";
import "./Landing.css";

export default function LandingForm() {
  return (
    <Box className="landing-root">
      <Box className="landing-image-row">
        <img
          src="/main_logo.png"
          alt="짠예살롱로고"
          className="landing-logo-image"
        />
        <img
          src="/bear_image.png"
          alt="짠예살롱 캐릭터"
          className="landing-bear-image"
        />
        <img
          src="/intro_1.png"
          alt="인트로 이미지"
          className="landing-intro1-image"
        />
      </Box>
      <Box className="landing-text">
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "bold",
            color: "#fff",
            margin: 0,
          }}
        >
          월급은 사라져도 예쁨은 포기 못 해!
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#fff",
            marginTop: "20px",
            marginBottom: 0,
            textAlign: "left",
          }}
        >
          돈은 없지만 예쁨은 포기 못 해! <br />
          오늘도 ₩3,000으로 예뻐지기 프로젝트
        </Typography>
      </Box>
    </Box>
  );
}
