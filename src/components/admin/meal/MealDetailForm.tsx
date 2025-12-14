import React, { useRef, useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface RecipeRow {
  id: number;
  content: string;
}

export default function MealDetailForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [recipeList, setRecipeList] = useState<RecipeRow[]>([
    { id: Date.now(), content: "레시피 내용 1" },
    { id: Date.now() + 1, content: "레시피 내용 2" },
  ]);

  /* ---------------- 이미지 업로드 ---------------- */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  /* ---------------- 레시피 행 ---------------- */
  const addRow = () => {
    setRecipeList((prev) => [...prev, { id: Date.now(), content: "" }]);
  };

  const removeRow = (id: number) => {
    setRecipeList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChange = (id: number, value: string) => {
    setRecipeList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, content: value } : item))
    );
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#fdecef", minHeight: "100vh" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h5" fontWeight="bold" color="gray">
          식단 관리 디테일화면
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: "#f8a1b5" }}>
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
            <TextField label="식단명" size="small" fullWidth />
            <TextField label="가격" size="small" type="number" fullWidth />
            <TextField label="칼로리" size="small" type="number" fullWidth />

            <Select size="small" defaultValue="">
              <MenuItem value="">주제 선택</MenuItem>
              <MenuItem value="LOW">저칼로리</MenuItem>
              <MenuItem value="NORMAL">일반</MenuItem>
            </Select>

            <TextField
              label="설명"
              multiline
              minRows={3}
              size="small"
              fullWidth
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
                    <TableRow key={row.id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        <TextField
                          fullWidth
                          multiline
                          size="small"
                          value={row.content}
                          onChange={(e) => handleChange(row.id, e.target.value)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => removeRow(row.id)}>
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
