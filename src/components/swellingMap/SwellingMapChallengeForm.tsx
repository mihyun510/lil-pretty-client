import React, { useState } from "react";

import { Box, Button, Typography, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko"; //한국어 locale 추가

export default function SwellingMapChallengeForm() {
  const [amount, setAmount] = useState(0.0);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const handleIncrease = () => setAmount((prev) => prev + 0.5);
  const handleDecrease = () =>
    setAmount((prev) => (prev > 0.5 ? prev - 0.5 : prev));

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
          <Typography
            variant="h5"
            sx={{
              border: "3px solid pink",
              borderRadius: "50%",
              p: 4,
              display: "inline-block",
              fontWeight: "bold",
              color: "#d75b73",
            }}
          >
            붓기 빼기 챌린지 <br />
            하루에 2리터를 <br />
            채워라
          </Typography>

          {/* 달력 */}
          <Box mt={3} display="flex" justifyContent="center">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              <DateCalendar
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        {/* 가운데 - 물방울 + 버튼 */}
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Box
            sx={{
              width: 120,
              height: 180,
              mx: "auto",
              mb: 2,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              background: "linear-gradient(to top, #80d0ff 60%, #b3e5fc 40%)",
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
              {amount.toFixed(1)} L
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
          >
            기록 완료
          </Button>
        </Box>

        {/* 오른쪽 - 캐릭터 자리 */}
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Box
            sx={{
              width: 200,
              height: 300,
              bgcolor: "#ffc1c1",
              borderRadius: "50%",
              mx: "auto",
            }}
          >
            <Typography pt={12} color="white">
              캐릭터
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
