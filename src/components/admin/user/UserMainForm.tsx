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
import styles from "./User.modules.css";
export default function UserMainForm() {
  const rows = [
    { id: 1, name: "김민정", start: "minjeong27", end: "관리자" },
    { id: 2, name: "김미현", start: "mihyun28", end: "관리자" },
    { id: 3, name: "김초롱", start: "chrong22", end: "관리자" },
  ];
  return (
    <Box>
      <Typography
        style={{ fontSize: "25px", fontWeight: "bold", color: "grey" }}
      >
        사용자권한관리
      </Typography>
      <Box display={"flex"} gap={16} alignItems={"center"}>
        <Box textAlign={"center"}>
          <Box
            className={styles.AuthImage}
            width={250}
            height={250}
            mx={30}
            mb={2}
          ></Box>
          <Button className={styles.AuthButton}>이미지 등록 </Button>
        </Box>
        <Box>
          <Button className={styles.AuthButton}>저장</Button>
          <Box display={"flex"} gap={5} mb={1}>
            <Typography>성명</Typography>
            <input className={styles.AuthInput}></input>
          </Box>
          <Box display={"flex"} gap={3} mb={1}>
            <Typography>아이디</Typography>
            <input className={styles.AuthInput}></input>
          </Box>
          <Box display={"flex"} gap={1.5} mb={1}>
            <Typography>비밀번호</Typography>
            <input className={styles.AuthInput}></input>
          </Box>
          <Box display={"flex"} gap={3} mb={1}>
            <Typography>이메일</Typography>
            <input className={styles.AuthInput}></input>
          </Box>
          <Box display={"flex"} gap={4} mb={1}>
            <Typography>권한</Typography>
            <Select size="small" color="pink">
              <MenuItem value="식단명1">식단명1</MenuItem>
              <MenuItem value="식단명2">식단명2</MenuItem>
              <MenuItem value="식단명3">식단명3</MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>

      <Box>
        {/* Table */}
        <Card sx={{ width: 1700, mx: 10 }}>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>순번</TableCell>
                    <TableCell>
                      <Checkbox></Checkbox>
                    </TableCell>
                    <TableCell>이름</TableCell>
                    <TableCell>아이디</TableCell>
                    <TableCell>권한</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <Box>
                          <Checkbox></Checkbox>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <TextField size="small" value={row.name} />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <TextField size="small" value={row.start} />
                        </Box>
                      </TableCell>{" "}
                      <TableCell>
                        <TextField size="small" value={row.end} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
