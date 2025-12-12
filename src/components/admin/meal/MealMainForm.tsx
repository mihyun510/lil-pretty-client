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
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getCommonCodeItems } from "@/api/commonCodeApi";
import { CommonCodeItems } from "@/api/interfaces/CommonCode";
import { getAdminMealItems } from "@/api/admin/mealMainApi";
import { MealAdminItems } from "@/api/interfaces/MealMst";
import { useNavigate } from "react-router-dom";

export default function MealMainForm() {
  const navigate = useNavigate();

  const [priceFilter, setPriceFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [categoryList, setCategoryList] = useState<CommonCodeItems[]>([]);
  const [priceList, setPriceList] = useState<CommonCodeItems[]>([]);
  const [mealItems, setMealItems] = useState<MealAdminItems[]>([]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 표시할 카드 수
  const totalPages = Math.ceil(mealItems.length / itemsPerPage);
  const paginatedMeals = mealItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
              onChange={(e) => {
                setPriceFilter(e.target.value);
                fetchMealItems(e.target.value, categoryFilter);
              }}
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
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                fetchMealItems(priceFilter, e.target.value);
              }}
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
          <Button
            variant="contained"
            sx={{ backgroundColor: "#f48fb1" }}
            onClick={() => navigate(`/admin/meal/detail/`)}
          >
            추가
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#f48fb1" }}>
            삭제
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#f48fb1" }}
            onClick={() => {
              fetchMealItems(priceFilter, categoryFilter);
            }}
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
                {paginatedMeals.map((item, index) => (
                  <TableRow key={item.mm_cd}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Checkbox color="secondary" />
                    </TableCell>
                    <TableCell>{item.mm_title}</TableCell>
                    <TableCell>{item.mm_pri.toLocaleString()}원</TableCell>
                    <TableCell>{item.mm_kcal} kcal</TableCell>
                    <TableCell>{item.mm_subject_nm}</TableCell>
                    <TableCell>{item.in_date}</TableCell>
                    <TableCell>{item.in_user}</TableCell>
                    <TableCell>
                      <EditIcon
                        sx={{
                          color: "#f06292",
                          cursor: "pointer",
                          "&:hover": { color: "#ad1457" },
                        }}
                        onClick={() =>
                          navigate(`/admin/meal/detail/${item.mm_cd}`)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedMeals.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      조회된 식단이 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      {/* Pagination (필요 시 활성화 가능) */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
}
