import {
  Box,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  CircularProgress,
  Pagination,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MealItems } from "@/api/interfaces/MealMst";
import { getMealsItems, saveMealFavorite } from "@/api/dietMasterApi";

export default function DietMasterForm() {
  const [tabIndex, setTabIndex] = useState(0);
  const [meals, setMeals] = useState<MealItems[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemsPerPage = 4; // 한 페이지에 표시할 카드 수
  const totalPages = Math.ceil(meals.length / itemsPerPage);
  const paginatedMeals = meals.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const priceCategories = ["00001", "00002", "00003"];

  const fetchMeals = async (mmCategory: string) => {
    setLoading(true);
    const result = await getMealsItems(mmCategory); // ← API 호출
    if (result.ok && result.data) {
      setMeals(result.data);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMeals(priceCategories[tabIndex]);
  }, [tabIndex]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const toggleLike = async (index: number) => {
    const meal = meals[index];
    const result = await saveMealFavorite(meal.mm_cd);

    if (result.ok && result.data) {
      const updated = [...meals];
      updated[index].favorite = result.data.favorite;
      setMeals(updated);
    } else {
      console.error(result.message);
    }
  };

  const goToDetail = (mmCd: string) => {
    navigate(`/diet/detail/${mmCd}`);
  };

  return (
    <div style={{ margin: "30px 100px 30px 100px" }}>
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          fontSize={15}
          mb={3}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            color: "#f74782ff",
          }}
          onClick={() => navigate("/diet/main")}
        >
          <IconButton>
            <ArrowBackIcon sx={{ fontSize: 30, color: "#f74782ff" }} />
          </IconButton>
          다이어트 존
        </Typography>

        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered
          textColor="inherit"
          TabIndicatorProps={{
            style: { backgroundColor: "white" }, // 선택된 탭 아래 하얀 줄
          }}
          variant="fullWidth"
          sx={{
            backgroundColor: "#f8a6c2",
            borderRadius: "10px",
            marginBottom: "16px",
          }}
        >
          <Tab label="0원 ~ 5000원" sx={{ color: "white" }} />
          <Tab label="5000원 ~ 10000원" sx={{ color: "white" }} />
          <Tab label="10,000원 초과" sx={{ color: "white" }} />
        </Tabs>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {paginatedMeals.map((meal, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card sx={{ backgroundColor: "#fffafbff" }}>
                    <Box
                      sx={{
                        width: "370px",
                        position: "relative",
                        cursor: "pointer",
                      }}
                      onClick={() => goToDetail(meal.mm_cd)}
                    >
                      <CardMedia
                        component="img"
                        height="160"
                        width="320px"
                        image={"/" + meal.mm_img}
                        alt={meal.mm_title}
                        sx={{
                          height: "200px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          position: "relative",
                        }}
                      >
                        {" "}
                        <Typography
                          mt={0}
                          variant="subtitle1"
                          fontWeight={"bold"}
                          fontSize={"20px"}
                          color="grey"
                        >
                          {meal.mm_title}
                        </Typography>
                        <IconButton
                          onClick={() => toggleLike(index)}
                          sx={{
                            color: "#f06292",
                            "&:hover": { backgroundColor: "#f0f0f0" },
                          }}
                        >
                          {meal.favorite == "Y" ? (
                            <FavoriteIcon sx={{ fontSize: 35 }} />
                          ) : (
                            <FavoriteBorderIcon sx={{ fontSize: 35 }} />
                          )}
                        </IconButton>
                      </Box>

                      <Typography
                        mt={-2}
                        variant="body2"
                        color="text.secondary"
                        fontSize={"18px"}
                      >
                        {meal.mm_desc}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        mt={0}
                        color="grey"
                        fontSize={"15px"}
                      >
                        칼로리: {meal.mm_kcal}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color="primary"
              />
            </Box>
          </>
        )}
      </Box>
    </div>
  );
}
