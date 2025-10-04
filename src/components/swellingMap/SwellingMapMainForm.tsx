// src/components/SwellingMapMainForm.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Pagination,
} from "@mui/material";
import KakaoMapForm from "./KakaoMapForm";
import { getKakaoMapPlacesItems } from "@/api/KakapMapPlacesApi";
import { KakaoMapPlacesItems } from "@/api/interfaces/KakaoMapPlaces";

export default function SwellingMapMainForm() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [kakaoMapPlaces, setKakaoMapPlaces] = useState<KakaoMapPlacesItems[]>(
    []
  );
  const [page, setPage] = useState(1); // 현재 페이지
  const itemsPerPage = 10; // 한 페이지에 표시할 카드 수
  const categories = ["00001", "00002", "00003"];

  const fetchPlaces = async (category: string) => {
    setLoading(true);
    const result = await getKakaoMapPlacesItems(category);
    if (result.ok && result.data) {
      setKakaoMapPlaces(result.data);
      setPage(1); // 탭 변경 시 페이지 초기화
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    fetchPlaces(categories[tabValue]);
  }, [tabValue]);

  // 현재 페이지에 맞는 카드 데이터
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedPlaces = kakaoMapPlaces.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(kakaoMapPlaces.length / itemsPerPage);

  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      {/* 챌린지 버튼 */}
      <Button
        variant="contained"
        sx={{
          mb: 3,
          borderRadius: "20px",
          backgroundColor: "#f4a7a7",
          "&:hover": { backgroundColor: "#f28b8b" },
        }}
        onClick={() => navigate("/swellingmap/challenge")}
      >
        붓기 빼기 챌린지
      </Button>

      {/* 지도 영역 */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          height: 500,
          mx: "auto",
          mb: 4,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <KakaoMapForm kakaoMapPlaces={kakaoMapPlaces} />
      </Box>

      {/* 탭 메뉴 */}
      <Tabs
        value={tabValue}
        onChange={handleChange}
        centered
        textColor="inherit"
        TabIndicatorProps={{
          style: { backgroundColor: "white" }, // 선택된 탭 아래 하얀 줄
        }}
        variant="fullWidth"
        sx={{
          backgroundColor: "#f8a6c2", // 탭 배경색
          borderRadius: "10px",
          //margin: "0px 210px",
          width: "100%",
          maxWidth: 900,
          mx: "auto",
          mb: 4,
        }}
      >
        <Tab label="레스토랑" sx={{ color: "white" }} />
        <Tab label="헬스" sx={{ color: "white" }} />
        <Tab label="마사지 샵" sx={{ color: "white" }} />
      </Tabs>

      {/* 로딩 표시 */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      ) : kakaoMapPlaces.length === 0 ? (
        <Typography color="text.secondary">검색된 장소가 없습니다.</Typography>
      ) : (
        <>
          {/* 카드 리스트 */}
          <Grid container spacing={3} justifyContent="center">
            {paginatedPlaces.map((place) => (
              <Grid item key={place.place_id} xs={12} sm={6} md={2.4}>
                <Card
                  sx={{
                    p: 2,
                    height: 240,
                    width: 200,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* 썸네일 */}
                  <Box
                    sx={{
                      width: "100%",
                      height: 120,
                      bgcolor: "#f5f5f5",
                      borderRadius: 2,
                      mb: 1.5,
                      backgroundImage: `url(${
                        place.place_url?.includes("http")
                          ? place.place_url
                          : "/placeholder.jpg"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  <CardContent sx={{ p: 0, textAlign: "left" }}>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      {place.place_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {place.road_address_name || place.address_name}
                    </Typography>
                    {place.phone && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        📞 {place.phone}
                      </Typography>
                    )}
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, color: "primary.main", cursor: "pointer" }}
                      onClick={() => window.open(place.place_url, "_blank")}
                    >
                      자세히 보기 →
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* 페이지네이션 */}
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
  );
}
