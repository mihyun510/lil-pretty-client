import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getCommonCodeItems } from "@/api/commonCodeApi";
import { CommonCodeItems } from "@/api/interfaces/CommonCode";
import { getAdminMealItems } from "@/api/admin/mealMainApi";
import { MealAdminItems } from "@/api/interfaces/MealMst";

export default function MealMainForm() {
  const [priceFilter, setPriceFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [categoryList, setCategoryList] = useState<CommonCodeItems[]>([]);
  const [priceList, setPriceList] = useState<CommonCodeItems[]>([]);
  const [mealItems, setMealItems] = useState<MealAdminItems[]>([]);
  useEffect(() => {
    async function fetchCategories() {
      const result1 = await getCommonCodeItems("ML002");
      const result2 = await getCommonCodeItems("ML001");

      let defaultCategory = "ALL";
      let defaultPrice = "ALL";

      if (result1.ok && result1.data) {
        setCategoryList(result1.data);
        defaultCategory = result1.data[0]?.cm_dt_cd || "ALL";
      }
      if (result2.ok && result2.data) {
        setPriceList(result2.data);
        defaultPrice = result2.data[0]?.cm_dt_cd || "ALL";
      }

      // 🚀 여기서 한번만 필터 설정
      setCategoryFilter(defaultCategory);
      setPriceFilter(defaultPrice);

      // 🚀 필터 설정 후에 바로 1번만 호출
      fetchMealItems(defaultPrice, defaultCategory);
    }

    fetchCategories();
  }, []);

  // fetchMealItems는 파라미터 받을 수 있게 변경
  async function fetchMealItems(
    price = priceFilter,
    category = categoryFilter
  ) {
    const result3 = await getAdminMealItems(price, category);

    if (result3.ok && result3.data) {
      setMealItems(result3.data);
    }
  }

  return (
    <Box sx={{ p: 4, backgroundColor: "#fde7ef", minHeight: "100vh" }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 4, color: "#555" }}
      >
        식단관리
      </Typography>

      {/* Filter + Buttons 한 줄 정렬 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        {/* Filter Section */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <FormControl size="small" sx={{ width: 180 }}>
            <InputLabel>가격</InputLabel>
            <Select
              value={priceFilter}
              label="가격"
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              {priceList.map((item) => (
                <MenuItem key={item.cm_dt_cd} value={item.cm_dt_cd}>
                  {item.cm_dt_nm}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: 180 }}>
            <InputLabel>카테고리</InputLabel>
            <Select
              value={categoryFilter}
              label="카테고리"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categoryList.map((item) => (
                <MenuItem key={item.cm_dt_cd} value={item.cm_dt_cd}>
                  {item.cm_dt_nm}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: "#f48fb1" }}>
            추가
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#f48fb1" }}>
            삭제
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#f48fb1" }}
            onClick={fetchMealItems}
          >
            조회
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <Card sx={{ border: "1px solid #f8b6c6", boxShadow: 1 }}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>순번</TableCell>
                  <TableCell>선택</TableCell>
                  <TableCell>식단명</TableCell>
                  <TableCell>금액</TableCell>
                  <TableCell>칼로리</TableCell>
                  <TableCell>카테고리</TableCell>
                  <TableCell>등록일자</TableCell>
                  <TableCell>등록자</TableCell>
                  <TableCell>수정</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {mealItems.map((item, index) => (
                  <TableRow key={item.mm_cd}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Checkbox color="secondary" />
                    </TableCell>
                    <TableCell>{item.mm_title}</TableCell>
                    <TableCell>{item.mm_pri.toLocaleString()}원</TableCell>
                    <TableCell>{item.mm_kcal}</TableCell>
                    <TableCell>{item.mm_subject}</TableCell>
                    <TableCell>{item.in_date}</TableCell>
                    <TableCell>{item.in_user}</TableCell>
                    <TableCell>
                      <EditIcon sx={{ color: "#e75480", cursor: "pointer" }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
        <Typography sx={{ cursor: "pointer" }}>{"<"}</Typography>
        <Typography sx={{ cursor: "pointer" }}>1</Typography>
        <Typography sx={{ cursor: "pointer" }}>2</Typography>
        <Typography sx={{ cursor: "pointer" }}>3</Typography>
        <Typography sx={{ cursor: "pointer" }}>{">"}</Typography>
      </Box>
    </Box>
  );
}
