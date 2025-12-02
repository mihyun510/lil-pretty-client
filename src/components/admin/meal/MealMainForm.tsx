import React from "react";
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

export default function MealMainForm() {
  const [priceFilter, setPriceFilter] = React.useState("5000 이하");
  const [categoryFilter, setCategoryFilter] = React.useState("양배추");

  const rows = [
    {
      id: 1,
      name: "식단명1",
      price: 1500,
      category: "양배추",
      date: "2025.11.09",
    },
    {
      id: 2,
      name: "식단명2",
      price: 2000,
      category: "양배추",
      date: "2025.11.09",
    },
    {
      id: 3,
      name: "식단명3",
      price: 2500,
      category: "두부",
      date: "2025.11.05",
    },
  ];

  return (
    <Box className="p-6 bg-pink-100 min-h-screen">
      <Typography variant="h5" className="font-bold mb-4 text-gray-700">
        식단관리
      </Typography>

      {/* Filters */}
      <Box className="flex gap-4 mb-4">
        <FormControl size="small" className="w-40">
          <InputLabel>금액</InputLabel>
          <Select
            value={priceFilter}
            label="금액"
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <MenuItem value="5000 이하">5000원 이하</MenuItem>
            <MenuItem value="10000 이하">10000원 이하</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" className="w-40">
          <InputLabel>카테고리</InputLabel>
          <Select
            value={categoryFilter}
            label="카테고리"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="양배추">양배추</MenuItem>
            <MenuItem value="두부">두부</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Buttons */}
      <Box className="flex justify-end gap-2 mb-4">
        <Button variant="contained" color="primary" className="!bg-pink-300">
          추가
        </Button>
        <Button variant="contained" color="secondary" className="!bg-pink-300">
          삭제
        </Button>
        <Button variant="contained" className="!bg-pink-300">
          조회
        </Button>
      </Box>

      {/* Table */}
      <Card className="shadow-md border border-pink-200">
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-pink-200">
                  <TableCell>순번</TableCell>
                  <TableCell></TableCell>
                  <TableCell>식단명</TableCell>
                  <TableCell>금액</TableCell>
                  <TableCell>주제(카테고리)</TableCell>
                  <TableCell>등록일자</TableCell>
                  <TableCell>수정</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-pink-50">
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <Checkbox defaultChecked color="secondary" />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <EditIcon className="text-pink-400 cursor-pointer" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Pagination */}
      <Box className="flex justify-center mt-4 text-pink-400 font-bold gap-4">
        <span>{"<"}</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>{">"}</span>
      </Box>
    </Box>
  );
}
