import React, { useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function MealDetailForm() {
  const [recipeList, setRecipeList] = useState([
    { id: 1, content: "레시피 내용 1" },
    { id: 2, content: "레시피 내용 2" },
    { id: 3, content: "레시피 내용 3" },
  ]);

  const addRow = () => {
    const newId = recipeList.length + 1;
    setRecipeList([...recipeList, { id: newId, content: "" }]);
  };

  const removeRow = (id: number) => {
    setRecipeList(recipeList.filter((item) => item.id !== id));
  };

  const handleChange = (id: number, value: string) => {
    setRecipeList(
      recipeList.map((item) =>
        item.id === id ? { ...item, content: value } : item
      )
    );
  };

  return (
    <Box className="p-8 bg-pink-100 min-h-screen">
      <Typography variant="h5" className="font-bold mb-6 text-gray-700">
        식단 관리 디테일화면
      </Typography>

      <Box className="flex gap-10">
        {/* Left: Image Section */}
        <Box className="flex flex-col items-center">
          <Box className="w-52 h-52 bg-white rounded-full shadow-inner mb-4"></Box>
          <Button variant="contained" className="!bg-pink-300 !text-white">
            이미지 등록
          </Button>
        </Box>

        {/* Right: Form Section */}
        <Card className="border-2 border-pink-200 w-full max-w-2xl">
          <CardContent className="space-y-4">
            <TextField label="식단명" fullWidth size="small" />
            <TextField label="가격" fullWidth size="small" />
            <TextField label="칼로리" fullWidth size="small" />
            <TextField label="카테고리" fullWidth size="small" />
            <TextField
              label="설명"
              fullWidth
              size="small"
              multiline
              minRows={3}
            />
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button variant="contained" className="!bg-pink-300 h-10 self-start">
          저장
        </Button>
      </Box>

      {/* Recipe Table */}
      <Box className="mt-10">
        <Box className="flex justify-between items-center mb-2 pr-4">
          <Typography variant="subtitle1" className="font-bold text-gray-700">
            레시피
          </Typography>
          <Button
            variant="contained"
            className="!bg-pink-300 !text-white"
            onClick={addRow}
          >
            행추가
          </Button>
        </Box>

        <Card className="border border-pink-300">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-pink-200">
                  <TableCell>순번</TableCell>
                  <TableCell>내용</TableCell>
                  <TableCell>삭제</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {recipeList.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell className="w-full">
                      <TextField
                        fullWidth
                        size="small"
                        value={row.content}
                        onChange={(e) => handleChange(row.id, e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => removeRow(row.id)}>
                        <CloseIcon className="text-pink-400" />
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
  );
}
