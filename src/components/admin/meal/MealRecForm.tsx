import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";

export default function MealRecForm() {
  const [startDate, setStartDate] = useState("2025.11.01");
  const [endDate, setEndDate] = useState("2025.11.08");

  const rows = [
    { id: 1, name: "식단명1", start: "2025.11.09", end: "2025.11.09" },
    { id: 2, name: "식단명2", start: "2025.11.09", end: "2025.11.09" },
    { id: 3, name: "식단명3", start: "2025.11.01", end: "2025.11.05" },
  ];

  return (
    <Box className="p-8 bg-pink-100 min-h-screen">
      <Typography variant="h5" className="font-bold mb-4 text-gray-700">
        추천식단 관리
      </Typography>

      {/* Date filter */}
      <Box className="flex items-center gap-4 mb-6">
        <Typography className="text-gray-600 font-semibold">
          추천 날짜
        </Typography>

        <TextField
          size="small"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-white rounded-md"
        />
        <CalendarMonthIcon className="text-pink-400" />

        <Typography className="mx-2">~</Typography>

        <TextField
          size="small"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-white rounded-md"
        />
        <CalendarMonthIcon className="text-pink-400" />
      </Box>

      {/* Buttons */}
      <Box className="flex justify-end gap-2 mb-4">
        <Button variant="contained" className="!bg-pink-300">
          추가
        </Button>
        <Button variant="contained" className="!bg-pink-300">
          삭제
        </Button>
        <Button variant="contained" className="!bg-pink-300">
          저장
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
                  <TableCell>시작일자</TableCell>
                  <TableCell>종료일자</TableCell>
                  <TableCell>수정</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <Checkbox defaultChecked color="secondary" />
                    </TableCell>

                    <TableCell>
                      <Box className="flex items-center gap-1">
                        <Select
                          size="small"
                          value={row.name}
                          className="min-w-[120px]"
                        >
                          <MenuItem value="식단명1">식단명1</MenuItem>
                          <MenuItem value="식단명2">식단명2</MenuItem>
                          <MenuItem value="식단명3">식단명3</MenuItem>
                        </Select>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box className="flex items-center gap-1">
                        <TextField size="small" value={row.start} />
                        <CalendarMonthIcon className="text-pink-400" />
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box className="flex items-center gap-1">
                        <TextField size="small" value={row.end} />
                        <CalendarMonthIcon className="text-pink-400" />
                      </Box>
                    </TableCell>

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
