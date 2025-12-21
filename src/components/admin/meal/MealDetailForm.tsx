import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { MealAdminMstItem } from "@/api/interfaces/MealMst";
import { useParams } from "react-router-dom";
import { getCommonCodeItems } from "@/api/commonCodeApi";
import { CommonCodeItems } from "@/api/interfaces/CommonCode";
import {
  getAdminMealDtlItems,
  getAdminMealItem,
} from "@/api/admin/mealDetailApi";
import { MealAdminDtlItem } from "@/api/interfaces/MealDtl";

export default function MealDetailForm() {
  const { mmCd } = useParams<{ mmCd?: string }>(); // 있으면 수정, 없으면 등록
  const navigate = useNavigate();
  const isEdit = !!mmCd;
  const EMPTY_MEAL: MealAdminMstItem = {
    mmCd: "",
    mmTitle: "",
    mmSubject: "",
    mmDesc: "",
    mmKcal: 0,
    mmPri: 0,
    mmImg: "",
    inDate: "",
    inUser: "",
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const mealRef = useRef<MealAdminMstItem>(EMPTY_MEAL);
  const [mealUI, setMealUI] = useState<MealAdminMstItem>(EMPTY_MEAL); //수정 시 초기 셋팅용
  const [subjectList, setSubjectList] = useState<CommonCodeItems[]>([]);
  const [recipeList, setRecipeList] = useState<MealAdminDtlItem[]>([]);

  /* ---------------- 공통 변경 핸들러 ---------------- */
  const handleMealChange = <K extends keyof MealAdminMstItem>(
    key: K,
    value: MealAdminMstItem[K]
  ) => {
    mealRef.current[key] = value;

    setMealUI((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  /* ---------------- 저장 ---------------- */
  const handleSave = async () => {
    const payload = mealRef.current;

    if (!payload.mmTitle) {
      alert("식단명을 입력해주세요.");
      return;
    }

    if (isEdit) {
      // 수정 API
      //await updateMeal(payload);
      //여기서 자기자신이면 수정가능.
    } else {
      // 등록 API
      //await insertMeal(payload);
    }

    navigate("/admin/meal/main");
  };

  /* ---------------- 이미지 업로드 ---------------- */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;

      setImagePreview(base64);
      handleMealChange("mmImg", base64);
    };
    reader.readAsDataURL(file);
  };

  /* ---------------- 레시피 행 ---------------- */
  const addRow = () => {
    setRecipeList((prev) => {
      const nextSeq =
        prev.length > 0
          ? Math.max(...prev.map((item) => item.md_seq ?? 0)) + 1
          : 1;

      return [
        ...prev,
        {
          mm_cd: mmCd ?? "",
          mm_dd: "",
          md_content: "",
          md_seq: nextSeq,
        },
      ];
    });
  };

  const removeRow = (seq: number) => {
    setRecipeList((prev) => prev.filter((item) => item.md_seq !== seq));
  };

  const handleChange = (seq: number, value: string) => {
    setRecipeList((prev) =>
      prev.map((item) =>
        item.md_seq === seq ? { ...item, md_content: value } : item
      )
    );
  };

  useEffect(() => {
    async function fetchCategories() {
      const result = await getCommonCodeItems("ML001");

      if (result.ok && result.data) {
        setSubjectList(result.data);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchMealDetail() {
      if (!mmCd) return;
      const resMst = await getAdminMealItem(mmCd);
      const resDtl = await getAdminMealDtlItems(mmCd);

      if (resMst.ok && resMst.data) {
        mealRef.current = resMst.data;
        setMealUI(resMst.data);

        if (resMst.data.mm_img) {
          setImagePreview(resMst.data.mm_img);
        }
      }

      if (resDtl.ok && resDtl.data) {
        setRecipeList(resDtl.data);
      }
    }

    fetchMealDetail();
  }, [mmCd]);

  return (
    <Box sx={{ p: 4, backgroundColor: "#fdecef", minHeight: "100vh" }}>
      {/* Header */}
      <Typography
        variant="h6"
        fontWeight="bold"
        fontSize={15}
        mb={3}
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          color: "#f74782ff",
        }}
        onClick={() => navigate("/admin/meal/main")}
      >
        <IconButton>
          <ArrowBackIcon sx={{ fontSize: 30, color: "#f74782ff" }} />
        </IconButton>
        식단 관리
      </Typography>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h5" fontWeight="bold" color="#555">
          {isEdit ? "식단 정보 수정" : "식단 정보 등록"}
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#f8a1b5" }}
          onClick={handleSave}
        >
          저장
        </Button>
      </Box>

      {/* Main */}
      <Box display="flex" gap={6}>
        {/* Image */}
        <Box textAlign="center">
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              backgroundColor: "#fff",
              boxShadow: 3,
              mb: 2,
              overflow: "hidden",
            }}
          >
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </Box>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#f8a1b5" }}
            onClick={() => fileInputRef.current?.click()}
          >
            이미지 등록
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Box>

        {/* Form */}
        <Card sx={{ flex: 1, border: "2px solid #f8a1b5" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="식단명"
              size="small"
              fullWidth
              value={mealUI.mmTitle}
              onChange={(e) => handleMealChange("mmTitle", e.target.value)}
            />
            <Box display="flex" gap={1}>
              <TextField
                label="가격"
                size="small"
                type="number"
                fullWidth
                value={mealUI.mmPri}
                onChange={(e) =>
                  handleMealChange("mmPri", Number(e.target.value))
                }
              />
              <Typography variant="h5" fontWeight="bold" color="#555" mt={0.5}>
                원
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <TextField
                label="칼로리"
                size="small"
                type="number"
                fullWidth
                value={mealUI.mmKcal}
                onChange={(e) =>
                  handleMealChange("mmKcal", Number(e.target.value))
                }
              />
              <Typography variant="h5" fontWeight="bold" color="#555" mt={0.5}>
                Kcal
              </Typography>
            </Box>

            <FormControl size="small">
              <InputLabel>주제</InputLabel>
              <Select
                value={mealUI.mmSubject}
                label="주제"
                fullWidth
                onChange={(e) => {
                  handleMealChange("mmSubject", e.target.value as string);
                }}
              >
                {subjectList.map((item) => (
                  <MenuItem key={item.cm_dt_cd} value={item.cm_dt_cd}>
                    {item.cm_dt_nm}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="설명"
              multiline
              minRows={3}
              size="small"
              fullWidth
              value={mealUI.mmDesc}
              onChange={(e) => handleMealChange("mmDesc", e.target.value)}
            />
          </CardContent>
        </Card>
      </Box>
      <Box mt={6} display="flex" gap={6}>
        {/* 왼쪽 이미지 영역과 동일한 공간 확보용 */}
        <Box sx={{ width: 200 }} />
        {/* Recipe */}
        <Box sx={{ flex: 1 }}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography fontWeight="bold">레시피 목록</Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#f8a1b5" }}
              onClick={addRow}
            >
              행추가
            </Button>
          </Box>

          <Card sx={{ border: "1px solid #f8a1b5" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 50 }} align="center">
                      순번
                    </TableCell>
                    <TableCell align="center">내용</TableCell>
                    <TableCell sx={{ width: 50 }} align="center">
                      삭제
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {recipeList.map((row, index) => (
                    <TableRow key={row.md_seq}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        <TextField
                          fullWidth
                          multiline
                          size="small"
                          value={row.md_content}
                          onChange={(e) =>
                            handleChange(row.md_seq!, e.target.value)
                          } //md_seq! : 렌더링 시점에는 항상 존재한다고 가정
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => removeRow(row.md_seq!)}>
                          <CloseIcon sx={{ color: "#f06292" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
