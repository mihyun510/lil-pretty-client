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
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 데이터 타입 정의
interface Meal {
  title: string;
  image: string;
  description: string;
  kcal: string;
  priceCategory: number;
  liked: boolean;
}

const fakeFetchMeals = (priceCategory: number): Promise<Meal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const meals: Meal[] = [
        {
          title: "들깨 김 양배추 비빔밥",
          image: "/images/meal1.jpg",
          description: "양배추 진리의 조합",
          kcal: "332kcal",
          priceCategory: 3000,
          liked: false,
        },
        {
          title: "파 절임 비빔밥",
          image: "/images/meal2.jpg",
          description: "파기름 + 두부 + 양배추",
          kcal: "384kcal",
          priceCategory: 5000,
          liked: false,
        },
        {
          title: "양상추 참치 비빔밥",
          image: "/images/meal3.jpg",
          description: "양상추 + 참치마요",
          kcal: "395kcal",
          priceCategory: 10000,
          liked: false,
        },
        {
          title: "목은지 계란소 비빔밥",
          image: "/images/meal4.jpg",
          description: "목은지 + 계란소스 환상 조합",
          kcal: "360kcal",
          priceCategory: 5000,
          liked: false,
        },
      ];
      resolve(meals.filter((meal) => meal.priceCategory === priceCategory));
    }, 500); // 로딩 시뮬레이션
  });
};

export default function DietMasterForm() {
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  const priceCategories = [3000, 5000, 10000];

  const fetchMeals = async (priceCategory: number) => {
    setLoading(true);
    const result = await fakeFetchMeals(priceCategory);
    setMeals(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchMeals(priceCategories[tabIndex]);
  }, [tabIndex]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const toggleLike = (index: number) => {
    const updated = [...meals];
    updated[index].liked = !updated[index].liked;
    setMeals(updated);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, margin: "auto", padding: 2 }}>
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
        <Tab label="3,000원 이하" sx={{ color: "white" }} />
        <Tab label="5,000원 이하" sx={{ color: "white" }} />
        <Tab label="10,000원 이하" sx={{ color: "white" }} />
      </Tabs>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {meals.map((meal, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: "#fffafbff" }}>
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="160"
                    width="320px"
                    image={meal.image}
                    alt={meal.title}
                    sx={{
                      height: "200px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <CardContent>
                  <Box sx={{ display: "flex", position: "relative" }}>
                    {" "}
                    <Typography
                      mt={0}
                      variant="subtitle1"
                      fontWeight={"bold"}
                      fontSize={"20px"}
                      color="grey"
                    >
                      {meal.title}
                    </Typography>
                    <IconButton
                      onClick={() => toggleLike(index)}
                      sx={{
                        position: "relative",
                        top: -10,
                        left: 140,
                        color: "#f06292",
                        "&:hover": { backgroundColor: "#f0f0f0" },
                      }}
                    >
                      {meal.liked ? (
                        <FavoriteIcon />
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
                    {meal.description}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    mt={0}
                    color="grey"
                    fontSize={"15px"}
                  >
                    칼로리: {meal.kcal}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
