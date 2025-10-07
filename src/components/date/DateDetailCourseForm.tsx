import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";

import { getDateDtlCourse } from "@/api/dateDetailApi";
import { useEffect, useState } from "react";
import { CommonResponse } from "@/api/interfaces/Common";
import { DateDtlCourse } from "@/api/interfaces/DateDtlCourse";
interface DateDetailCourseFormProps {
  ddCd?: string;
}

export default function DateDetailCourseForm({
  ddCd,
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
  return (
    <Box>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="stretch" // 카드들을 아래로 정렬
        mt={6}
      >
        {DateCourse.map((item, index) => (
          <Grid item key={index}>
            <Card sx={{ width: 300, height: 350 }}>
              <CardMedia component="img" image={`${item.dc_img}`}></CardMedia>
              <CardContent></CardContent>
            </Card>
            <Typography variant="h6">{`${item.dc_title}`}</Typography>
            <Typography sx={{ whiteSpace: "pre-line" }}>
              {`${item.dc_desc}`}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
