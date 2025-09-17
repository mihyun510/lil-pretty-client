import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Slider,
  Container,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMealRecItems } from "@/api/dietMainApi";
import { MealRecItems } from "@/api/interfaces/MealRec";
import { CommonResponse } from "@/api/interfaces/Common";

export default function DateMainForm() {
  const CARDS: CardsSpec[] = [
    {
      title: "힐링 데이트",
      img: "/crown_1.png",
      subtitle: "잔잔한 음악과 함께",
      lines:
        "도심 속 감성 피크닉\n 한강 잔디밭 위, 따뜻한 담요와 디저트\n로 힐링 가득한 하루",
    },
    {
      title: "추억 데이트",
      img: "/crown_2.png",
      subtitle: "추억이 남는 하루",
      lines: "셀프사진관 + 케이크 + 편지쓰기까지,\n아날로그 감성 데이트",
    },
    {
      title: "엑티비티 데이트",
      img: "/crown_3.png",
      subtitle: "몸도 마음도 시원하게",
      lines: "역시 휴일은 활동적인 활동으로\n마무리 해야지",
    },
  ];
  return (
    <Box sx={{ maxWidth: 1120, mx: "auto", py: 3 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: 24, sm: 32, md: 40 },
            lineHeight: 1.2,
          }}
        >
          누가 돈 없으면 데이트 못한대?
        </Typography>
        <Typography>원하는 데이트 유형을 선택하세요</Typography>
      </Box>
      <Box sx={{ maxWidth: 520, mb: 4 }}>
        <Typography>예산 설정</Typography>
        <Slider
          defaultValue={20000}
          min={5000}
          max={50000}
          step={1000}
          valueLabelDisplay="auto"
          color="secondary"
        ></Slider>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <span>5,000</span>
          <span>20,000</span>
          <span>50,000</span>
        </Box>
      </Box>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="stretch" // 카드들을 아래로 정렬
      >
        {CARDS.map((c) => (
          <Grid item key={c.title}>
            <Card sx={{ width: 300, height: 390 }}>
              <CardMedia component="img" image={c.img}></CardMedia>
              <CardContent>
                <Typography variant="h6">{c.title}</Typography>
                <Typography>{c.subtitle}</Typography>
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {c.lines}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
