import { getDateItems } from "@/api/dateMastApi";
import { CommonResponse } from "@/api/interfaces/Common";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const [DateDtl, SetDateDtl] = useState<DateDtl[]>([]);
useEffect(() => {
  const disFetch = async () => {
    const response: CommonResponse<DateDtl[]> = await getDateItems();
    if (response.ok && response.data) {
      return SetDateDtl(response.data);
    } else {
      console.log("메롱");
    }
    disFetch();
  };
}, []);
export default function DateDetailForm() {
  return <Box>힐링 데이트편 순위</Box>;
}
