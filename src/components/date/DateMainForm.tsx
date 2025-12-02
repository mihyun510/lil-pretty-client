import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Slider,
} from "@mui/material";

import { useEffect, useState } from "react";
import { getDateItems } from "@/api/dateMastApi";
import { DateItems } from "@/api/interfaces/DateMst";
import { CommonResponse } from "@/api/interfaces/Common";
import { useNavigate } from "react-router-dom";

export default function DateMainForm() {
  const [DateItems, SetDateItems] = useState<DateItems[]>([]);
  const [priceValue, setPriceValue] = useState(50000);
  const navigate = useNavigate();

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setPriceValue(newValue as number);
  };
  useEffect(() => {
    const fetchDateCards = async () => {
      const response: CommonResponse<DateItems[]> = await getDateItems(
        5000,
        priceValue
      );

      if (response.ok && response.data) {
        return SetDateItems(response.data);
      } else {
        console.error("데이트 정보 조회 실패:", response.message);
      }
    };
    fetchDateCards();
  }, [priceValue]);

  const goToDetail = (dmCd: string) => {
    navigate(`/date/detail/${dmCd}`);
  };
  const goToManager = () => {
    navigate(`/date/manager/`);
  };
  return (
    <Box sx={{ maxWidth: 1120, mx: "auto", py: 3 }}>
      <Box onClick={goToManager}>민정</Box>
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
        <Typography color="textSecondary">
          원하는 데이트 유형을 선택하세요
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 520, mb: 4 }}>
        <Typography sx={{ fontWeight: 700, color: "#f88cb0ff" }}>
          예산 설정
        </Typography>
        <Slider
          min={5000}
          max={50000}
          step={1000}
          value={priceValue}
          valueLabelDisplay="auto"
          onChange={handleChange}
          sx={{
            color: "#c6c6c6ff",
            "& .MuiSlider-thumb": {
              height: 32,
              width: 32,
              backgroundColor: "transparent",
              "&::before": {
                content: '"❤️"',
                fontSize: "22px",
              },
            },
          }}
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
        {DateItems.map((item, index) => (
          <Grid item key={index}>
            <Card
              onClick={() => goToDetail(item.dm_cd)}
              sx={{ width: 300, height: 450 }}
            >
              <CardMedia component="img" image={`${item.dm_img}`}></CardMedia>
              <CardContent>
                <Typography variant="h6">{`${item.dm_title}`}</Typography>

                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {`${item.dm_desc}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
