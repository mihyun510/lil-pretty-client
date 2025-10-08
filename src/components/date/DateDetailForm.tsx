import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
  Rating,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  getDateDtlItems,
  getDateDtlReviews,
  saveDateDtlItems,
} from "@/api/dateDetailApi";

import { useEffect, useState } from "react";
import { CommonResponse } from "@/api/interfaces/Common";
import { DateDtlItems } from "@/api/interfaces/DateDtl";
import { useNavigate } from "react-router-dom";
import { DateDtlReviews } from "@/api/interfaces/DateDtlReviews";

interface DateDetailFormProps {
  dmCd?: string; // useParams에서 undefined 가능성 때문에 optional 처리
}

export default function DateDetailForm({ dmCd }: DateDetailFormProps) {
  const rankImages: Record<number, string> = {
    1: "/crown_1.png",
    2: "/crown_2.png",
    3: "/crown_3.png",
  };

  const [DateDtlItems, SetDateDtlItems] = useState<DateDtlItems[]>([]);
  const [DateDtlReviews, SetDateDtlReviews] = useState<DateDtlReviews[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!dmCd) return;

    const fetchDateDtlCards = async () => {
      const response: CommonResponse<DateDtlItems[]> = await getDateDtlItems(
        dmCd
      );

      if (response.data && response.ok) {
        SetDateDtlItems(response.data);
        fetchDateDtlReviews(response.data[0].dd_cd);
      } else {
        console.error("데이트 디테일 정보 조회 실패:", response.message);
      }
    };

    fetchDateDtlCards();
  }, [dmCd]);
  const goToDetail = (ddCd: string) => {
    navigate(`/date/detailCourse/${ddCd}`);
  };
  const toggleLike = async (index: number) => {
    const DateDtlItem = DateDtlItems[index];
    const res = await saveDateDtlItems(DateDtlItem.dd_cd, DateDtlItem.dm_cd);
    if (!res.ok) {
      console.error(res.message);
      return;
    }
    goToDetail(DateDtlItem.dd_cd);
  };
  const fetchDateDtlReviews = async (ddCd: string) => {
    if (!ddCd) return;
    const response: CommonResponse<DateDtlReviews[]> = await getDateDtlReviews(
      ddCd
    );

    if (response.data && response.ok) {
      return SetDateDtlReviews(response.data);
    } else {
      console.error("데이트 디테일 리뷰 정보 조회 실패:", response.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", py: 3 }}>
      <IconButton onClick={() => navigate("/date/main")}>
        <ArrowBackIcon sx={{ fontSize: 30, color: "#f74782ff" }} />
      </IconButton>

      <Box sx={{ textAlign: "center" }}>
        {/* 카드 리스트 */}
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch" // 카드들을 아래로 정렬
        >
          {DateDtlItems.map((item, index) => (
            <Grid item key={index}>
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image={rankImages[item.dd_rank]}
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: 50,
                    textAlign: "center",
                    position: "absolute",
                    top: -30,
                    left: "40%",
                    zIndex: 1,
                  }}
                />

                <Card sx={{ width: 370, height: 400 }}>
                  <CardContent>
                    <Typography mt={1.5}>{item.dd_title}</Typography>
                    <CardMedia
                      onClick={() => fetchDateDtlReviews(item.dd_cd)}
                      component="img"
                      image={item.dd_img}
                      sx={{ width: "100%", height: 300 }}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        mt: 1,
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
                      onClick={() => {
                        toggleLike(index);
                      }}
                    >
                      코스 보기
                    </Button>
                  </CardContent>
                </Card>
              </Box>
              <Box mt={1} mb={3}>
                <Typography fontWeight={800} color="grey">
                  리뷰수:{item.dd_cnt}
                </Typography>
                <Typography fontWeight={800} color="grey">
                  조회수:{item.dd_maxview}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box display={"flex"} gap={50}>
          <Box textAlign={"center"}>
            <Typography
              mt={-2}
              mb={3}
              fontWeight={500}
              fontSize={25}
              color="grey"
            >
              이용자 후기
            </Typography>
          </Box>
        </Box>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch" // 카드들을 아래로 정렬
          mt={-3}
        >
          {DateDtlReviews.map((item, index) => (
            <Grid item key={index}>
              <Box
                sx={{
                  position: "relative",
                  justifyContent: "center",
                  textAlign: "left",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.us_img}
                  sx={{
                    width: 60,
                    height: 50,
                    borderRadius: 50,
                    position: "relative",
                    top: 0,
                    left: 0,
                  }}
                />
                <Card sx={{ width: 370, height: 170 }}>
                  <Typography variant="h6">{item.us_id}</Typography>
                  <Rating
                    name="size-small"
                    defaultValue={item.dr_star}
                    size="small"
                  />
                  <CardContent>
                    <Typography>{item.dr_content}</Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
