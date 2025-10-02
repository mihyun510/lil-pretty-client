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
import { getDateDtlItems } from "@/api/dateDetailApi";
import { useEffect, useState } from "react";
import { CommonResponse } from "@/api/interfaces/Common";
import { DateDtlItems } from "@/api/interfaces/DateDtl";
import { useNavigate, useParams } from "react-router-dom";

export default function DateDetailForm() {
  const rankImages: Record<number, string> = {
    1: "/crown_1.png",
    2: "/crown_2.png",
    3: "/crown_3.png",
  };
  const { dmCd } = useParams<{ dmCd: string }>();
  const [DateDtlItems, SetDateDtlItems] = useState<DateDtlItems[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDateDtlCards = async () => {
      const response: CommonResponse<DateDtlItems[]> = await getDateDtlItems(
        dmCd
      );

      if (response.data && response.ok) {
        return SetDateDtlItems(response.data);
      } else {
        console.error("데이트 디테일 정보 조회 실패:", response.message);
      }
    };
    fetchDateDtlCards();
  }, []);
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
                    >
                      코스 보기
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box display={"flex"} gap={50}>
          <Box mt={3} mb={3}>
            <Typography fontWeight={800} color="grey">
              리뷰수:
            </Typography>
            <Typography fontWeight={800} color="grey">
              조회수:
            </Typography>
          </Box>
          <Box textAlign={"center"}>
            <Typography
              mt={3}
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
        >
          {DateDtlItems.map((item, index) => (
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
                  image="/user_1.png"
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
                  <Typography variant="h6">김민정</Typography>
                  <Rating name="size-small" defaultValue={2} size="small" />
                  <CardContent>
                    <Typography>{item.dd_title}</Typography>
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
