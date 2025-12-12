import React, { useState, useEffect } from "react";
import { UserRequest } from "@/api/interfaces/AdminUser";
import {
  Box,
  Button,
  Card,
  CardContent,
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

import styles from "./User.module.css";
import { getAdminUserItems } from "@/api/admin/userMainApi";
export default function UserMainForm() {
  const [usId, setUsId] = useState("");
  const [usNm, setUsNm] = useState("");
  const [usPw, setUsPw] = useState("");
  const [usEmail, setUsEmail] = useState("");
  const [usRole, setUsRole] = useState("");
  const [userList, setUserList] = useState<UserRequest[]>([]);
  useEffect(() => {
    const fetchAdminUserList = async () => {
      const result = await getAdminUserItems(usId);
      if (result.ok && result.data) {
        setUserList(result.data);
        console.log("민정::11" + result.data[0].us_id);
      } else {
        console.error(result.message);
      }
    };
    fetchAdminUserList();
  }, []);
  const handleIdChange = (e) => {
    setUsId(e.target.value);
  };
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
            <input
              value={usNm}
              onChange={handleIdChange}
              className={styles.AuthInput}
            ></input>
          </Box>
          <Box display={"flex"} gap={3} mb={1}>
            <Typography>아이디</Typography>
            <input
              value={usId}
              onChange={handleIdChange}
              className={styles.AuthInput}
            ></input>
          </Box>
          <Box display={"flex"} gap={1.5} mb={1}>
            <Typography>비밀번호</Typography>
            <input
              value={usPw}
              onChange={handleIdChange}
              className={styles.AuthInput}
            ></input>
          </Box>
          <Box display={"flex"} gap={3} mb={1}>
            <Typography>이메일</Typography>
            <input
              value={usEmail}
              onChange={handleIdChange}
              className={styles.AuthInput}
            ></input>
          </Box>
          <Box display={"flex"} gap={4} mb={1}>
            <Typography>권한{usRole}</Typography>
            <Select size="small" color="info">
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="USER">USER</MenuItem>
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
                    <TableCell>이름</TableCell>
                    <TableCell>아이디</TableCell>
                    <TableCell>권한</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userList.map((row) => (
                    <TableRow key={row.us_id}>
                      <TableCell>{row.us_id}</TableCell>
                      <TableCell>
                        <Box>
                          <TextField
                            onClick={() => {
                              setUsId(row.us_id);
                              setUsEmail(row.us_email);
                              setUsNm(row.us_nm);
                              setUsPw(row.us_pw);
                              setUsRole(row.us_role);
                            }}
                            size="small"
                            value={row.us_nm}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <TextField size="small" value={row.us_id} />
                        </Box>
                      </TableCell>{" "}
                      <TableCell>
                        <TextField size="small" value={row.us_role} />
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
