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
import { getMealRecItems } from "@/api/DietMainApi";
import { MealRecItems, MealRecRequest } from "@/api/interfaces/MealRec";
import { CommonResponse } from "@/api/interfaces/Common";
import { getTodayYYYYMMDD, getOneWeekLaterYYYYMMDD } from "@/lib/date";

export default function DietMainForm() {
  const navigate = useNavigate();
  const [MealRecItems, setMealRecItems] = useState<MealRecItems[]>([]);

  useEffect(() => {
    const fetchDietCards = async () => {
      const request: MealRecRequest = {
        mrSDate: getTodayYYYYMMDD(),
        mreDate: getOneWeekLaterYYYYMMDD(),
      };

      const response: CommonResponse<MealRecItems[]> = await getMealRecItems(
        request
      );

      if (response.ok && response.data) {
        // 예: API에서 받은 데이터가 배열 형태라고 가정
        setMealRecItems(response.data);
      } else {
        console.error("식단 카드 조회 실패:", response.message);
      }
    };

    fetchDietCards();
  }, []);
  /*
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
*/
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
              src="/intro_1.png"
              alt="리루식단"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* 텍스트 + 버튼 */}
            <Box position="absolute" top={24} left={24} color="#fff">
              <Typography variant="h6" fontWeight="bold">
                하루 3, 000 원으로
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                예뻐지기 시작!
              </Typography>
              <Typography variant="body2">
                가성비 미친 하루 식단 모음
              </Typography>
            </Box>
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
        </Box>
        {/* 오른쪽: 전신사진 + 텍스트 */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="600px"
          borderRadius={3}
          overflow="hidden"
        >
          {/* 상단: 전신사진 */}
          <Box position="relative" flex={1}>
            <img
              src="/intro_2.png"
              alt="전신사진"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Box position="absolute" top={16} left={16} color="#fff">
              <Typography variant="h6">164cm / 47.8kg</Typography>
            </Box>
            <Box position="absolute" bottom={16} left={16} color="#fff">
              <Typography variant="subtitle1" fontWeight="bold">
                3주만에 굶지 않고 5kg 감량한 방법
              </Typography>
            </Box>
          </Box>

          {/* 하단: 언니들이 말아주는 다이어트 꿀팁 */}
          <Box textAlign="center" bgcolor="#FFF0F5" py={2}>
            <Typography variant="body1" fontWeight="bold">
              언니들이 말아주는{" "}
              <Typography
                component="span"
                color="#f8a6c2"
                variant="h5"
                fontWeight="bold"
              >
                다이어트 꿀팁
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
