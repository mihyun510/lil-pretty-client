import {
  Box,
  Typography,
  Card,
  CardMedia,
  IconButton,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getDateDtlCourse } from "@/api/dateDetailApi";
import { useEffect, useState } from "react";
import { CommonResponse } from "@/api/interfaces/Common";
import { DateDtlCourse } from "@/api/interfaces/DateDtlCourse";
import { useNavigate } from "react-router-dom";
interface DateDetailCourseFormProps {
  ddCd?: string;
  dmCd?: string;
}

export default function DateDetailCourseForm({
  ddCd,
  dmCd,
}: DateDetailCourseFormProps) {
  const [DateCourse, SetDateCourse] = useState<DateDtlCourse[]>([]);
  useEffect(() => {
    if (!ddCd) return;
    const fetchDateCourseCards = async () => {
      const response: CommonResponse<DateDtlCourse[]> = await getDateDtlCourse(
        ddCd
      );

      if (response.data && response.ok) {
        return SetDateCourse(response.data);
      } else {
        console.error("데이트 코스 정보 조회 실패:", response.message);
      }
    };
    fetchDateCourseCards();
  }, [ddCd]);
  const navigate = useNavigate();
  return (
    <Box sx={{ maxWidth: 1700, mx: "auto", py: 0 }}>
      <IconButton onClick={() => navigate(`/date/detail/${dmCd}`)}>
        <ArrowBackIcon
          sx={{ ml: 10, mb: -9, fontSize: 30, color: "#f74782ff" }}
        />
      </IconButton>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="stretch" // 카드들을 아래로 정렬
        mt={6}
      >
        {DateCourse.map((item, index) => (
          <Grid item key={index}>
            <Box display={"flex"}>
              <Card sx={{ width: 300, height: 350 }}>
                <CardMedia
                  sx={{ width: "100%", objectFit: "cover", height: 350 }}
                  component="img"
                  image={`${item.dc_img}`}
                ></CardMedia>
              </Card>
              {index < DateCourse.length - 1 && (
                <Typography
                  sx={{ ml: 3, mt: 20, fontSize: 30, color: "#f74782ff" }}
                >
                  ▶
                </Typography>
              )}
            </Box>
            <Typography
              sx={{ mt: 2, fontWeight: 600 }}
              variant="h5"
            >{`${item.dc_title}`}</Typography>
            <Typography
              sx={{ mt: 2, width: 300, whiteSpace: "pre-line", fontSize: 16 }}
            >
              {`${item.dc_desc}`}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
