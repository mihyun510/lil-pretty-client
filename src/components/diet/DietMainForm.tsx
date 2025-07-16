import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DietMainForm() {
  const dietCards = [
    {
      img: "/intro_1.png",
      title: "약고추장 비빔밥",
      desc: "닭가슴살로 만든 약고추장 덮어 비벼먹기",
    },
    {
      img: "/intro_2.png",
      title: "식단 가이드",
      desc: "일주일 식단 양배추로 7일 식단 끝내기",
    },
    {
      img: "/intro_3.png",
      title: "식단 가이드",
      desc: "일주일 식단 양배추로 7일 식단 끝내기",
    },
  ];

  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FFF0F5", p: 4 }}>
      {/* 상단 섹션 */}
      <Grid container spacing={4} mb={6}>
        {/* 좌측 식단 이미지 */}
        <Grid item xs={12} md={6}>
          <Box
            position="relative"
            borderRadius={3}
            overflow="hidden"
            boxShadow={3}
          >
            <img
              src="/intro_1.png"
              alt="하루 식단"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Box position="absolute" top={24} left={24} color="#fff">
              <Typography variant="h6" fontWeight="bold">
                하루 3,000원으로 예뻐지기 시작!
              </Typography>
              <Typography variant="body2">
                가성비 미친 하루 식단 모음
              </Typography>
            </Box>
            <Box
              position="absolute"
              bottom={24}
              left={24}
              display="flex"
              gap={1}
            >
              <Button variant="contained" color="secondary" size="small">
                가성비 식단 보러가기
              </Button>
              <Button variant="contained" color="primary" size="small">
                오늘의 식단 Get it
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* 우측 전신 사진 */}
        <Grid item xs={12} md={6}>
          <Box
            position="relative"
            borderRadius={3}
            overflow="hidden"
            boxShadow={3}
          >
            <img
              src="/intro_2.png"
              alt="다이어트 전후"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Box position="absolute" top={24} left={24} color="#fff">
              <Typography variant="h6">164cm / 47.8kg</Typography>
            </Box>
            <Box position="absolute" bottom={24} left={24} color="#fff">
              <Typography variant="subtitle1" fontWeight="bold">
                3주만에 굶지 않고 5kg 감량한 방법
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* 식단 추천 텍스트 */}
      <Box textAlign="center" mb={3}>
        <Typography variant="h6" fontWeight="bold">
          오늘의 식단 추천
        </Typography>
        <Typography variant="body1" color="error" fontWeight="bold">
          붓기특화 양배추 레시피
        </Typography>
      </Box>

      {/* 식단 카드 리스트 */}
      <Grid container spacing={2}>
        {dietCards.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="160"
                image={item.img}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 하단 안내 */}
      <Box mt={6} textAlign="center">
        <Typography variant="body1">
          언니들이 말아주는{" "}
          <Typography component="span" color="error" fontWeight="bold">
            다이어트 꿀팁
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
