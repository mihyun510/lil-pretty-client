import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMealRecItems } from "@/api/dietMainApi";
import { MealRecItems } from "@/api/interfaces/MealRec";
import { CommonResponse } from "@/api/interfaces/Common";
import { downloadFile } from "@/api/fileApi";

export default function DietMainForm() {
  const navigate = useNavigate();
  const [MealRecItems, setMealRecItems] = useState<MealRecItems[]>([]);

  useEffect(() => {
    const fetchDietCards = async () => {
      const response: CommonResponse<MealRecItems[]> = await getMealRecItems();

      if (response.ok && response.data) {
        // 예: API에서 받은 데이터가 배열 형태라고 가정
        setMealRecItems(response.data);
      } else {
        console.error("식단 카드 조회 실패:", response.message);
      }
    };

    fetchDietCards();
  }, []);

  return (
    <Box sx={{ bgcolor: "#FFF0F5", p: 4 }}>
      {/* 🔲 전체를 grid로 틀 잡기 */}
      <Box
        display="grid"
        gridTemplateColumns="7fr 3fr"
        gap={2}
        alignItems="start"
        minHeight="700px" // 전신사진 높이에 맞춰 고정
      >
        {/* 🧱 왼쪽: 전체 컨텐츠 */}
        <Box display="flex" flexDirection="column" gap={3}>
          {/* 하루 식단 이미지 */}
          <Box
            position="relative"
            height="350px"
            borderRadius={3}
            overflow="hidden"
            boxShadow={3}
          >
            <img
              src="/home_08.png"
              alt="리루식단"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Box
              position="absolute"
              bottom={15}
              left={500}
              display="flex"
              gap={1}
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#f8a6c2",
                  color: "#fff",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  px: 2,
                  textTransform: "none",
                  boxShadow: "0px 5px 1px rgba(0,0,0,0.15)",
                  "&:hover": {
                    backgroundColor: "#f06292",
                  },
                }}
                onClick={() => navigate("/diet/list")}
              >
                가성비 식단 보러가기
              </Button>

              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  backgroundColor: "#fff",
                  color: "#f8a6c2",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  px: 2,
                  textTransform: "none",
                  boxShadow: "0px 5px 1px rgba(0,0,0,0.15)",
                  "&:hover": {
                    backgroundColor: "#f06292",
                  },
                }}
                onClick={() =>
                  downloadFile(
                    "mealRec/테이블_정의서_20251007122110.xlsx"
                  )
                } // <- 여기 경로 지정
              >
                오늘의 식단 GET IT
              </Button>
            </Box>
          </Box>

          {/* 추천 텍스트 */}
          <Box textAlign="center">
            <Typography variant="h5" fontWeight="bold">
              오늘의 식단 추천
            </Typography>
            <Typography variant="h6" color="#f8a6c2" fontWeight="bold">
              붓기특화
            </Typography>
            <Typography variant="h6" color="#f8a6c2" fontWeight="bold">
              양배추 레시피
            </Typography>
          </Box>

          {/* 카드 리스트 */}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="flex-end" // 카드들을 아래로 정렬
            sx={{ flex: 1 }} // 부모 박스에서 높이 차지하도록
          >
            {MealRecItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="160"
                    image={`/${item.mm_img}`}
                    alt={item.mr_title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.mr_title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.mr_desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
        </Box>
        {/* 오른쪽: 전신사진 + 텍스트 */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          borderRadius={3}
          overflow="hidden"
        >
          {/* 유튜브 영상*/}
          <Box mt={0} display="flex" justifyContent="center">
            <iframe
              width="100%"
              height="700"
              src="https://www.youtube.com/embed/WxTGeYIxeu4"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
