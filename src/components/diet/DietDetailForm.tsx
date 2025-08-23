import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { MealDtlItems } from "@/api/interfaces/MealDtl";
import { getMealDtlItems } from "@/api/dietDetailApi";

interface DietDetailFormProps {
  mmCd?: string; // useParams에서 undefined 가능성 때문에 optional 처리
}

export default function DietDetailForm({ mmCd }: DietDetailFormProps) {
  // 여기 추가
  const [mealDtl, setMealDtl] = useState<MealDtlItems[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mmCd) return;

    const fetchDetail = async () => {
      setLoading(true);
      const result = await getMealDtlItems(mmCd);
      if (result.ok && result.data) {
        setMealDtl(result.data);
      } else {
        console.error(result.message);
      }
      setLoading(false);
    };

    fetchDetail();
  }, [mmCd]);

  if (loading || mealDtl.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4} bgcolor="#ffe4ec" minHeight="100vh">
      {/* 상단: 판 다이어트존 */}

      <Typography variant="h6" fontWeight="bold" mb={2} mx={20}>
        <IconButton>
          <ArrowBackIcon sx={{ fontSize: 30, color: "#f74782ff" }} />
        </IconButton>
        짠 다이어트존
      </Typography>

      <Grid container spacing={2} gap={"60px"} mx={20}>
        {/* 왼쪽: 이미지 + 가격 + 칼로리 */}
        <Grid item xs={12} md={6} sx={{ width: "57%" }}>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              width: "100%",
              gap: 5,
            }}
          >
            <CardMedia
              component="img"
              image={
                mealDtl[0]?.mm_img
                  ? "/" + mealDtl[0].mm_img
                  : "/placeholder.png"
              }
              alt="음식 이미지"
              sx={{ width: "60%", height: 300, borderRadius: 2 }}
            />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 5,
              }}
            >
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {mealDtl[0].mm_pri}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  align="center"
                >
                  가격
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {mealDtl[0].mm_kcal}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  align="center"
                >
                  칼로리
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 오른쪽: 레시피 */}
        <Grid item xs={12} md={6} sx={{ width: "40%", flex: 0.98 }}>
          <Box
            sx={{
              width: "100%",
              height: 300,
              borderRadius: 2,
              bgcolor: "#ff7f9f",
              color: "white",
              p: 2,
            }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Typography variant="h5" fontWeight="bold">
              레시피
            </Typography>
            {mealDtl.length > 0 && mealDtl.some((meal) => meal.md_content) ? (
              <Typography variant="body2" component="div">
                {/* 각 레시피 내용을 줄바꿈 포함하여 출력 */}
                {mealDtl.map((meal, idx) =>
                  meal.md_content ? (
                    <div key={idx}>{meal.md_content}</div>
                  ) : null
                )}
              </Typography>
            ) : (
              <Typography variant="body2">레시피 정보가 없습니다.</Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* 중간 타이틀 */}
      <Box mt={2} display="flex" alignItems="center" mx={20}>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          찜한{" "}
          <Box component="span" color="#ff7f9f" fontWeight="bold">
            다이어트 식단
          </Box>
        </Typography>
        <IconButton aria-label="찜하기">
          <FavoriteIcon sx={{ color: "#f74782ff", fontSize: 40, mx: 3 }} />
        </IconButton>
      </Box>

      {/* 하단: 찜한 음식 리스트 */}
      <Grid
        container
        spacing={2}
        mt={1}
        sx={{ gap: 8, display: "flex", mx: 20 }}
      >
        {["양배추 참치 비빔밥", "들기름 양배추 덮밥", "양배추 스테이크"].map(
          (name, idx) => (
            <Grid item xs={4} key={idx}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 2,
                  justifyContent: "center",
                  borderRadius: "30px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ variant: "h2", mx: "auto" }}
                >
                  {name}
                </Typography>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    bgcolor: "#ccc",
                    mx: 10,
                    mt: 13,
                    mb: 2,
                  }}
                />
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}
