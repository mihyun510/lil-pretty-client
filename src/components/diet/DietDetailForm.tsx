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
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { MealDtlItems } from "@/api/interfaces/MealDtl";
import { getMealDtlItems, getMealFavoriteItems } from "@/api/dietDetailApi";
import { MealFavoriteItems } from "@/api/interfaces/MealFavorite";
import { useNavigate } from "react-router-dom";

interface DietDetailFormProps {
  mmCd?: string; // useParams에서 undefined 가능성 때문에 optional 처리
}

export default function DietDetailForm({ mmCd }: DietDetailFormProps) {
  // 여기 추가
  const [mealDtl, setMealDtl] = useState<MealDtlItems[]>([]);
  const [mealFavorite, setMealFavorite] = useState<MealFavoriteItems[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(mealFavorite.length / itemsPerPage);
  const paginatedFavorite = mealFavorite.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const navigate = useNavigate();
  const fetchMealFavoriteItems = async () => {
    setLoading(true);
    const result = await getMealFavoriteItems();
    if (result.ok && result.data) {
      setMealFavorite(result.data);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };

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
    fetchMealFavoriteItems();
  }, [mmCd]);

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages || 1));
  };
  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

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

      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
        mx={20}
        sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        onClick={() => navigate("/diet/list")}
      >
        <IconButton>
          <ArrowBackIcon sx={{ fontSize: 30, color: "#f74782ff" }} />
        </IconButton>
        뒤로가기
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
        sx={{ gap: 8, display: "flex", mx: 10 }}
      >
        <IconButton onClick={handlePrevPage}>
          <ChevronLeftIcon sx={{ fontSize: 100, color: "#f74782ff" }}>
            ◀
          </ChevronLeftIcon>
        </IconButton>
        {paginatedFavorite.length > 0 ? (
          paginatedFavorite.map((fav, idx) => (
            <Grid item xs={4} key={fav.mf_cd || idx}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 3,
                  justifyContent: "center",
                  borderRadius: "30px",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
                }}
                onClick={async () => {
                  if (!fav.mm_cd) return;
                  setLoading(true);
                  const result = await getMealDtlItems(fav.mm_cd); // 선택한 식단의 레시피 가져오기
                  if (result.ok && result.data) {
                    setMealDtl(result.data);
                  } else {
                    console.error(result.message);
                  }
                  setLoading(false);
                }}
              >
                <Typography variant="subtitle1" sx={{ mx: "auto", mb: 2 }}>
                  {fav.mm_title}
                </Typography>

                <Box
                  component="img"
                  src={fav.mm_img ? "/" + fav.mm_img : "/placeholder.png"}
                  alt={fav.mm_title}
                  sx={{
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    objectFit: "cover",
                    mx: "auto",
                    mb: 2,
                  }}
                />
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" sx={{ mx: 20 }}>
            찜한 음식이 없습니다.
          </Typography>
        )}

        <IconButton>
          <ChevronRightIcon
            sx={{ fontSize: 100, color: "#f74782ff" }}
            onClick={handleNextPage}
          >
            ▶
          </ChevronRightIcon>
        </IconButton>
      </Grid>
    </Box>
  );
}
