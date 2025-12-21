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
import {
  deleteAdminMealItems,
  getAdminMealItems,
} from "@/api/admin/mealMainApi";
import { MealAdminItems } from "@/api/interfaces/MealMst";
import { useNavigate } from "react-router-dom";
import { gfnGetCudResultMessage } from "@/lib/crudMessage";

export default function MealMainForm() {
  const navigate = useNavigate();

  const [subjectFilter, setSubjectFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [categoryList, setCategoryList] = useState<CommonCodeItems[]>([]);
  const [subjectList, setSubjectList] = useState<CommonCodeItems[]>([]);
  const [mealItems, setMealItems] = useState<MealAdminItems[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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

  const handleCheckboxChange = (mmCd: string) => {
    setSelectedIds((prev) =>
      prev.includes(mmCd) ? prev.filter((id) => id !== mmCd) : [...prev, mmCd]
    );
  };

  async function handleDelete() {
    if (selectedIds.length === 0) {
      alert("삭제할 식단을 선택해주세요.");
      return;
    }

    if (!confirm("선택한 식단을 삭제하시겠습니까?")) return;

    const result = await deleteAdminMealItems(selectedIds);

    alert(gfnGetCudResultMessage(result));

    setSelectedIds([]);

    // ✅ 현재 페이지 유지한 채 목록 재조회
    fetchMealItems();
  }

  // fetchMealItems는 파라미터 받을 수 있게 변경
  async function fetchMealItems(
    subject = subjectFilter,
    category = categoryFilter
  ) {
    const result = await getAdminMealItems(subject, category);

    if (result.ok && result.data) {
      setMealItems(result.data);
    }
  }

  useEffect(() => {
    async function fetchCategories() {
      const result1 = await getCommonCodeItems("ML002");
      const result2 = await getCommonCodeItems("ML001");

      let defaultCategory = "ALL";
      let defaultSubject = "ALL";

      if (result1.ok && result1.data) {
        setCategoryList(result1.data);
        defaultCategory = result1.data[0]?.cm_dt_cd || "ALL";
      }
      if (result2.ok && result2.data) {
        setSubjectList(result2.data);
        defaultSubject = result2.data[0]?.cm_dt_cd || "ALL";
      }

      // 🚀 여기서 한번만 필터 설정
      setCategoryFilter(defaultCategory);
      setSubjectFilter(defaultSubject);

      // 🚀 필터 설정 후에 바로 1번만 호출
      fetchMealItems(defaultSubject, defaultCategory);
    }

    fetchCategories();
  }, []);

  return (
    <Box sx={{ p: 4, backgroundColor: "#fde7ef", minHeight: "100vh" }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 4, color: "#555" }}
      >
        식단 관리
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
            <InputLabel>주제</InputLabel>
            <Select
              value={subjectFilter}
              label="주제"
              onChange={(e) => {
                setSubjectFilter(e.target.value);
                fetchMealItems(e.target.value, categoryFilter);
              }}
            >
              {subjectList.map((item) => (
                <MenuItem key={item.cm_dt_cd} value={item.cm_dt_cd}>
                  {item.cm_dt_nm}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: 180 }}>
            <InputLabel>가격</InputLabel>
            <Select
              value={categoryFilter}
              label="가격"
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                fetchMealItems(subjectFilter, e.target.value);
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
          <Button
            variant="contained"
            sx={{ backgroundColor: "#f48fb1" }}
            onClick={handleDelete}
          >
            삭제
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#f48fb1" }}
            onClick={() => {
              fetchMealItems(subjectFilter, categoryFilter);
            }}
          >
            조회
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <Card
        sx={{
          border: "1px solid #f8b6c6",
          boxShadow: 1,
        }}
      >
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">순번</TableCell>
                  <TableCell align="center">선택</TableCell>
                  <TableCell align="center">식단명</TableCell>
                  <TableCell align="center">가격</TableCell>
                  <TableCell align="center">칼로리</TableCell>
                  <TableCell align="center">카테고리</TableCell>
                  <TableCell align="center">등록일자</TableCell>
                  <TableCell align="center">등록자</TableCell>
                  <TableCell align="center">수정</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedMeals.map((item, index) => (
                  <TableRow key={item.mm_cd}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      <Checkbox
                        color="secondary"
                        checked={selectedIds.includes(item.mm_cd)}
                        onChange={() => handleCheckboxChange(item.mm_cd)}
                      />
                    </TableCell>
                    <TableCell align="center">{item.mm_title}</TableCell>
                    <TableCell align="center">
                      {item.mm_pri.toLocaleString()}원
                    </TableCell>
                    <TableCell align="center">{item.mm_kcal} kcal</TableCell>
                    <TableCell align="center">{item.mm_subject_nm}</TableCell>
                    <TableCell align="center">{item.in_date}</TableCell>
                    <TableCell align="center">{item.in_user}</TableCell>
                    <TableCell align="center">
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
