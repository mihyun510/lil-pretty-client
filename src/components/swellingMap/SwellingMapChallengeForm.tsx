import React, { useEffect, useState } from "react";

import { Box, Button, Typography, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko"; //한국어 locale 추가
import {
  getWaterDailyItem,
  saveWaterDailyItem,
} from "@/api/swellingMapChallengeApi";
import { WaterDailyItem } from "@/api/interfaces/WaterDaily";
import { useAuthStore } from "@/store/useAuthStore";

export default function SwellingMapChallengeForm() {
  const { user } = useAuthStore();
  const [waterDailyItem, setWaterDailyItem] = useState<WaterDailyItem>({
    wd_cd: "",
    us_id: user === null ? "" : user.usId, // 필요 시 로그인 사용자 ID로 교체
    wd_date: dayjs().format("YYYYMMDD"),
    wd_ml: 0.0,
  });

  // 이미지 결정 함수
  const getCharacterImage = (wd_ml: number) => {
    if (wd_ml < 0.5) return "/water_01.png"; //0L
    if (wd_ml < 1.0) return "/water_02.png"; //0.5L
    if (wd_ml < 1.5) return "/water_03.png"; //1.0L
    if (wd_ml < 2.0) return "/water_04.png"; //1.5L
    return "/water_05.png"; //2.0L
  };

  //달력 날짜 변경 시 waterData의 wd_date 업데이트 + 데이터 재조회
  const handleDateChange = async (newDate: dayjs.Dayjs | null) => {
    if (!newDate) return;
    const formattedDate = newDate.format("YYYYMMDD");
    await fetchData(formattedDate);
  };

  // 💧 물 섭취량 증가
  const handleIncrease = () => {
    setWaterDailyItem((prev) => ({
      ...prev,
      wd_ml: prev.wd_ml < 2.0 ? prev.wd_ml + 0.5 : prev.wd_ml,
    }));
  };

  // 💧 물 섭취량 감소
  const handleDecrease = () => {
    setWaterDailyItem((prev) => ({
      ...prev,
      wd_ml: prev.wd_ml > 0.0 ? prev.wd_ml - 0.5 : prev.wd_ml,
    }));
  };

  const handleSave = async () => {
    try {
      const result = await saveWaterDailyItem(waterDailyItem);
      if (result.ok && result.data) {
        alert(`${waterDailyItem.wd_date} 기록이 저장되었습니다 💧`);
        fetchData(waterDailyItem.wd_date); // 저장 후 갱신
      } else {
        console.error(result.message);
        alert("저장 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  //날짜별 데이터 조회 함수
  const fetchData = async (wdDate: string) => {
    try {
      const res = await getWaterDailyItem(wdDate);
      if (res.ok && res.data) {
        setWaterDailyItem(res.data);
      } else {
        setWaterDailyItem({
          wd_cd: "",
          us_id: "admin",
          wd_date: wdDate,
          wd_ml: 0.0,
        });
      }
    } catch (error) {
      console.error("데이터 조회 실패:", error);
      setWaterDailyItem({
        wd_cd: "",
        us_id: "admin",
        wd_date: wdDate,
        wd_ml: 0.0,
      });
    }
  };

  // 첫 진입 시 오늘 날짜 데이터 조회
  useEffect(() => {
    fetchData(dayjs().format("YYYYMMDD"));
  }, []);

  const currentImage = getCharacterImage(waterDailyItem.wd_ml);

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 3,
        bgcolor: "#ffeef1",
      }}
    >
      <Box
        sx={{
          maxWidth: "1000px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* 왼쪽 - 텍스트 + 달력 */}
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <img
            src={"/hear_tool.png"}
            alt="img"
            style={{
              width: "300px",
              height: "300px",
              objectFit: "contain",
            }}
          />

          {/* 달력 */}
          <Box mt={3} display="flex" justifyContent="center">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              <DateCalendar
                value={dayjs(waterDailyItem.wd_date)}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        {/* 가운데 - 물방울 + 버튼 */}
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <img
            src={currentImage}
            alt="물방울"
            style={{
              width: "400px",
              height: "400px",
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <IconButton onClick={handleDecrease}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="bold">
              {waterDailyItem.wd_ml.toFixed(1)} L
            </Typography>
            <IconButton onClick={handleIncrease}>
              <AddIcon />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              borderRadius: "20px",
              backgroundColor: "#f4a7a7",
              "&:hover": { backgroundColor: "#f28b8b" },
            }}
            onClick={handleSave}
          >
            기록 완료
          </Button>
        </Box>

        {/* 오른쪽 - 캐릭터 자리 */}
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <img
            src={"/bear_water.png"}
            alt="캐릭터"
            style={{
              width: "400px",
              height: "600px",
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
