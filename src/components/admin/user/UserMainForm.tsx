import React, { useState, useEffect, useRef } from "react";
import { UserRequest } from "@/api/interfaces/AdminUser";
import {
  Box,
  Button,
  Card,
  CardContent,
  Pagination,
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
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./User.module.css";
import {
  getAdminUserItems,
  deleteAdminUserItems,
  updateAdminUserItems,
  insertAdminUserItems,
} from "@/api/admin/userMainApi";
export default function UserMainForm() {
  const [usId, setUsId] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserRequest | null>(null);
  const newUser = {
    us_id: "",
    us_pw: "",
    us_nm: "",
    us_email: "",
    us_phone: "",
    us_role: "SELECT",
    us_img: "",
  };
  /* ---------------- 페이징 ---------------- */
  const [userList, setUserList] = useState<UserRequest[]>([]);
  const [page, setPage] = useState(1);
  const [addCheck, setAddCheck] = useState(0);
  const itemsPerPage = 5; // 한 페이지에 표시할 카드 수
  const totalPages = Math.ceil(userList.length / itemsPerPage);
  const paginatedUsers = userList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  useEffect(() => {
    const fetchAdminUserList = async () => {
      const result = await getAdminUserItems(usId);
      if (result.ok && result.data) {
        setUserList(result.data);
      } else {
        console.error(result.message);
      }
    };
    fetchAdminUserList();
  }, []);
  const handleIdChange = (e) => {
    setUsId(e.target.value);
  };
  const [previewImg, setPreviewImg] = useState(Object);
  const uploadImg = useRef(null);
  const [selectedindex, setSelectedIndex] = useState(0);
  /* ---------------- 이미지 등록 ---------------- */
  const handleUpload = () => {
    uploadImg.current?.click();
  };
  //이미지 등록하기
  const handlePreview = (event) => {
    console.log("previewImg:::" + previewImg);
    const file = event.target.files[0];
    setPreviewImg(URL.createObjectURL(uploadImg.current?.files[0]));
  };
  /* ---------------- 이미지 삭제 ---------------- */
  const handleDelete = () => {
    setPreviewImg(null);
  };
  /* ---------------- 행 클릭시 상세 조회 ---------------- */
  const handleSelectedUserChange = (
    field: keyof UserRequest,
    value: string
  ) => {
    setSelectedUser((prevUser) => {
      if (!prevUser) return null;

      return { ...prevUser, [field]: value };
    });
    setUserList((prevUserList) =>
      prevUserList.map((item, i) => {
        // 선택된 인덱스(selectedIndex)와 일치할 때만 수정
        if (i === selectedindex) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };
  /* ---------------- 행 추가 ---------------- */
  const addUser = () => {
    const newUserList = [...userList, newUser];
    const newIndex = newUserList.length - 1;
    const newTotalPages = Math.ceil(newUserList.length / itemsPerPage);
    setUserList(newUserList);
    setSelectedUser(newUser);
    setPage(newTotalPages);
    setSelectedIndex(newIndex);
    setAddCheck(1);
  };
  /* ---------------- 행 삭제 ---------------- */
  const deleteUser = async (usId: string) => {
    const deleteSelectedUser = usId;
    if (!deleteSelectedUser) {
      alert("삭제할 아이디를 선택하세요");
      return;
    }
    const result = await deleteAdminUserItems(usId);
    if (result.message === "Success") {
      setUserList((prevList) =>
        prevList.filter((user) => user.us_id !== deleteSelectedUser)
      );
      alert("사용자 삭제가 완료되었습니다.");
      setSelectedUser(null);
      setSelectedIndex(-1);
    }
  };
  /* ---------------- 저장 ----------------- */
  const updateUser = async () => {
    if (!selectedUser) {
      alert("저장할 사용자 정보를 먼저 선택하거나 입력해주세요.");
      return;
    }
    const result = await updateAdminUserItems(selectedUser);

    if (result.message === "Success") {
      await getAdminUserItems(usId); // 전체 목록 새로고침
      alert("사용자 수정이 완료되었습니다.");
      setAddCheck(0);
    }
  };
  const saveUser = async () => {
    if (
      !selectedUser?.us_id ||
      !selectedUser?.us_email ||
      !selectedUser?.us_pw ||
      !selectedUser?.us_phone ||
      selectedUser?.us_role === "SELECT"
    ) {
      alert("저장할 사용자 정보를 먼저 선택하거나 입력해주세요.");
      return;
    }
    const result = await insertAdminUserItems(selectedUser);
    if (result.message === "Success") {
      await getAdminUserItems(usId); // 전체 목록 새로고침
      alert("사용자 저장이 완료되었습니다.");
    }
  };
  return (
    <Box sx={{ p: 4, backgroundColor: "#fdecef", minHeight: "100vh" }}>
      <Typography variant="h5" fontWeight="bold" color="gray">
        사용자권한관리
      </Typography>
      <Box ml={20} display={"flex"} gap={20} alignItems={"center"}>
        <Box textAlign={"center"}>
          <Box
            sx={{
              mt: 5,
              width: 240,
              height: 240,
              borderRadius: "50%",
              backgroundColor: "#fff",
              boxShadow: 3,
              mb: 5,
              border: "2px solid #f8a1b5",
            }}
          >
            <input
              style={{ display: "none" }} //보이지 않도록 하기 위해서
              accept="image/*"
              ref={uploadImg}
              onChange={handlePreview}
              type="file"
            />
            <img
              alt="미리보기"
              className={styles.AuthImage}
              src={previewImg}
              onChange={handlePreview}
              style={{ width: "91%", height: "91%", objectFit: "cover" }}
            />
          </Box>
          <Box display={"flex"} ml={3.5} gap={1}>
            <Button onClick={handleUpload} className={styles.AuthButton}>
              이미지 등록{" "}
            </Button>
            <Button onClick={handleDelete} className={styles.AuthButton}>
              이미지 삭제{" "}
            </Button>
          </Box>
        </Box>
        <Box>
          <Box display={"flex"} justifyContent={"end"} gap={1} width={1238}>
            <Button
              onClick={addCheck === 1 ? saveUser : updateUser}
              className={styles.AuthButton}
            >
              저장
            </Button>
            <Button className={styles.AuthButton}>삭제</Button>
          </Box>

          <Box display={"flex"} gap={5} mb={1}></Box>
          <Card sx={{ flex: 1, border: "2px solid #f8a1b5" }}>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                onChange={(event) =>
                  handleSelectedUserChange("us_nm", event.target.value)
                }
                value={selectedUser?.us_nm ?? ""}
                label="성명"
                size="small"
                fullWidth
              />
              <TextField
                onChange={(event) =>
                  handleSelectedUserChange("us_id", event.target.value)
                }
                InputProps={{
                  readOnly: addCheck === 0 ? true : false,
                }}
                value={selectedUser?.us_id ?? ""}
                label="아이디"
                size="small"
                fullWidth
                sx={{ backgroundColor: addCheck === 0 ? "#e4e3e3ff" : "white" }}
              />
              <TextField
                onChange={(event) =>
                  handleSelectedUserChange("us_phone", event.target.value)
                }
                value={selectedUser?.us_phone ?? ""}
                label="휴대폰번호"
                size="small"
                type="number"
                fullWidth
              />
              <TextField
                onChange={(event) =>
                  handleSelectedUserChange("us_email", event.target.value)
                }
                value={selectedUser?.us_email ?? ""}
                label="이메일"
                size="small"
                fullWidth
              />
              <TextField
                onChange={(event) =>
                  handleSelectedUserChange("us_pw", event.target.value)
                }
                value={selectedUser?.us_pw ?? ""}
                label="비밀번호"
                size="small"
                fullWidth
              />
              <Select
                value={selectedUser?.us_role ?? ""}
                size="small"
                onChange={(event) =>
                  handleSelectedUserChange("us_role", event.target.value)
                }
                sx={{
                  color: selectedUser?.us_role === "SELECT" ? "grey" : "black",
                }}
              >
                <MenuItem value="SELECT">권한을 선택하세요</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
                <MenuItem value="USER">USER</MenuItem>
              </Select>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box mt={2} sx={{ flex: 1 }}>
        <Box
          textAlign={"end"}
          sx={{
            mr: 3,
            mb: 1,
          }}
        >
          <Button onClick={addUser} className={styles.AuthButton}>
            행 추가
          </Button>
        </Box>

        {/* Table */}
        <Card
          sx={{
            width: 1720,
            mx: 10,
            mb: 60,
            flex: 1,
            border: "2px solid #f8a1b5",
          }}
        >
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">순번</TableCell>
                    <TableCell align="center">이름</TableCell>
                    <TableCell align="center">아이디</TableCell>
                    <TableCell align="center">권한</TableCell>
                    <TableCell align="center">삭제</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.map((row, index) => (
                    <TableRow
                      key={index}
                      onClick={() => {
                        console.log("row::" + row);
                        setAddCheck(0);
                        setSelectedIndex(index);
                        setSelectedUser(row);
                      }}
                      sx={{
                        cursor: "pointer",
                        backgroundColor:
                          index === selectedindex ? "#ffebee" : "inherit",
                        "&:hover": {
                          backgroundColor:
                            index === selectedindex ? "#ffebee" : "#f5f5f5",
                        },
                      }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.us_nm}</TableCell>
                      <TableCell align="center">{row.us_id}</TableCell>
                      <TableCell align="center">{row.us_role}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={(e) => {
                            deleteUser(row.us_id);
                          }}
                        >
                          <CloseIcon sx={{ color: "#f06292" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
        <Box sx={{ display: "flex", justifyContent: "center", mt: -58 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Box>
    </Box>
  );
}
