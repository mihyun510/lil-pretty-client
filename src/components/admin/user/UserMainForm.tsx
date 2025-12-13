import React, { useState, useEffect, useRef } from "react";
import { UserRequest } from "@/api/interfaces/AdminUser";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
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
import {
  getAdminUserItems,
  deleteAdminUserItems,
  updateAdminUserItems,
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
    us_role: "",
    us_img: "",
  };
  const [userList, setUserList] = useState<UserRequest[]>([]);

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
  const [selectedindex, setselectedIndex] = useState(0);
  //이미지 등록 버튼 누르기
  const handleUpload = () => {
    uploadImg.current?.click();
  };
  //이미지 등록하기
  const handlePreview = (event) => {
    console.log("previewImg:::" + previewImg);
    const file = event.target.files[0];
    setPreviewImg(URL.createObjectURL(uploadImg.current?.files[0]));
  };
  //이미지 삭제하기
  const handleDelete = () => {
    setPreviewImg(null);
  };
  //사용자 내용 변경하기
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
  //행 추가 버튼 함수
  const addUser = () => {
    setUserList([...userList, newUser]);
  };
  //행 삭제 버튼 함수
  const deleteUser = async (usId: string) => {
    const deleteSelectedUser = usId;
    alert(deleteSelectedUser);
    if (!deleteSelectedUser) {
      alert("삭제할 아이디를 선택하세요");
      return;
    }
    const result = await deleteAdminUserItems(usId);
    if (result.ok) {
      setUserList((prevList) =>
        prevList.filter((user) => user.us_id !== deleteSelectedUser)
      );
      alert("사용자 삭제가 완료되었습니다.");
      setSelectedUser(null);
      setselectedIndex(-1);
    }
  };
  //저장 버튼 함수
  const updateUser = async () => {
    if (!selectedUser) {
      alert("저장할 사용자 정보를 먼저 선택하거나 입력해주세요.");
      return;
    }
    const result = await updateAdminUserItems(selectedUser);

    if (result.ok) {
      await getAdminUserItems(usId); // 전체 목록 새로고침
      alert("사용자 수정이 완료되었습니다.");
    }
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
          <input
            style={{ display: "none" }} //보이지 않도록 하기 위해서
            accept="image/*"
            ref={uploadImg}
            type="file"
          />
          <div>
            <img
              alt="미리보기"
              className={styles.AuthImage}
              src={previewImg}
              style={{
                maxWidth: "500px",
                maxHeight: "300px",
              }}
            />
          </div>
          <Button onClick={handleUpload} className={styles.AuthButton}>
            이미지 등록{" "}
          </Button>
          <Button onClick={handleDelete} className={styles.AuthButton}>
            이미지 삭제{" "}
          </Button>
        </Box>
        <Box>
          <Button onClick={updateUser} className={styles.AuthButton}>
            저장
          </Button>
          <Box display={"flex"} gap={5} mb={1}>
            <Typography>성명</Typography>
            <input
              value={selectedUser?.us_nm ?? ""}
              onChange={(event) =>
                handleSelectedUserChange("us_nm", event.target.value)
              }
              className={styles.AuthInput}
            ></input>
          </Box>
          <Box display={"flex"} gap={3} mb={1}>
            <Typography>아이디</Typography>
            <input
              value={selectedUser?.us_id ?? ""}
              onChange={(event) =>
                handleSelectedUserChange("us_id", event.target.value)
              }
              className={styles.AuthInput}
            ></input>
          </Box>
          <Box display={"flex"} gap={1.5} mb={1}>
            <Typography>비밀번호</Typography>
            <input
              value={selectedUser?.us_pw ?? ""}
              onChange={(event) =>
                handleSelectedUserChange("us_pw", event.target.value)
              }
              className={styles.AuthInput}
            ></input>
          </Box>
          <Box display={"flex"} gap={3} mb={1}>
            <Typography>이메일</Typography>
            <input
              value={selectedUser?.us_email ?? ""}
              onChange={(event) =>
                handleSelectedUserChange("us_email", event.target.value)
              }
              className={styles.AuthInput}
            ></input>
          </Box>{" "}
          <Box display={"flex"} gap={3} mb={1}>
            <Typography>휴대폰 번호</Typography>
            <input
              value={selectedUser?.us_phone ?? ""}
              onChange={(event) =>
                handleSelectedUserChange("us_phone", event.target.value)
              }
              className={styles.AuthInput}
            ></input>
          </Box>
          <Box display={"flex"} gap={4} mb={1}>
            <Typography>권한</Typography>
            <Select
              onChange={(event) =>
                handleSelectedUserChange("us_role", event.target.value)
              }
              value={selectedUser?.us_role ?? ""}
              size="small"
              color="info"
            >
              <MenuItem value="권한을 선택해주세요">권한을 선택하세요</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="USER">USER</MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>

      <Box>
        <Button onClick={addUser} className={styles.AuthButton}>
          추가
        </Button>

        {/* Table */}
        <Card sx={{ width: 1700, mx: 10 }}>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>순번</TableCell>
                    <TableCell>이름</TableCell>
                    <TableCell>아이디</TableCell>
                    <TableCell>권한</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userList.map((row, index) => (
                    <TableRow
                      key={index}
                      onClick={() => {
                        setselectedIndex(index);
                        setSelectedUser(row);
                      }}
                    >
                      <TableCell>
                        <button
                          className={styles.AuthButton}
                          onClick={(e) => {
                            deleteUser(row.us_id);
                          }}
                        >
                          x
                        </button>
                      </TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.us_nm}</TableCell>
                      <TableCell>{row.us_id}</TableCell>
                      <TableCell>{row.us_role}</TableCell>
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
