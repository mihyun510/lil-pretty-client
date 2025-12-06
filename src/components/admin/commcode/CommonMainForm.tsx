import {
  Box,
  Typography,
  Card,
  CardMedia,
  IconButton,
  Grid,
  colors,
  Button,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  MenuItem,
  Select,
  TableBody,
  Checkbox,
} from "@mui/material";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

import { useEffect, useState } from "react";
import { CommonCodeItems } from "@/api/interfaces/CommonCode";
import { getCommCodeItems } from "@/api/admin/commonCodeApi";
import { useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./Common.module.css";
export default function CommonMainForm() {
  const newCommCodeItem = {
    // 실제 DB 컬럼에 맞게 빈 값 설정
    cm_grp_cd: "",
    cm_dt_cd: "",
    cm_grp_nm: "",
    cm_grp_desc: "",
    cm_dt_nm: "",
    cm_dt_desc: "",
  };
  const [grpCd, setgrpCd] = useState("");
  const [grpNm, setgrpNm] = useState("");
  const [CommCode, setCommCode] = useState<CommonCodeItems[]>([]);
  const [selectedGrpCd, setSelectedGrpCd] = useState<string | null>(null);
  //조회
  const fetchCommCodeItems2 = async () => {
    const result = await getCommCodeItems(grpCd, grpNm);
    if (result.ok && result.data) {
      setCommCode(result.data);
    } else {
      console.error(result.message);
    }
  };
  //추가 함수
  const addCommCodeItem = () => {
    setCommCode([...CommCode, newCommCodeItem]);
  };
  const handleChange = (
    index: number,
    field: keyof CommonCodeItems,
    value: string
  ) => {
    setCommCode((prevCourse) =>
      prevCourse.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value, // 변경된 필드의 값을 새 값으로 업데이트
            }
          : item
      )
    );
  };
  const filteredDetailCodes = CommCode.filter((item) => {
    // selectedGrpCd가 null이 아니면서, 현재 항목의 cm_grp_cd와 일치하는 항목만 선택
    return selectedGrpCd !== null && item.cm_grp_cd === selectedGrpCd;
  });
  useEffect(() => {
    const fetchCommCodeItems = async () => {
      const result = await getCommCodeItems(grpCd, grpNm);
      if (result.ok && result.data) {
        setCommCode(result.data);
      } else {
        console.error(result.message);
      }
    };
    fetchCommCodeItems();
  }, []);
  return (
    <Box>
      <Box>
        <Typography
          style={{ fontSize: "25px", fontWeight: "bold", color: "grey" }}
        >
          공통코드 관리
        </Typography>

        <Box
          //조회조건
          display={"flex"}
          sx={{
            background: "white",
            padding: 1,
            margin: 1,
            border: 2,
            borderColor: "pink",
            borderRadius: "10px",
          }}
        >
          <Box display={"flex"} mr={60} alignItems={"center"}>
            <Box mr={2} sx={{ fontWeight: "bold" }}>
              그룹코드 명
            </Box>
            <input
              className={styles.CommBorder}
              type="text"
              onChange={(event) => {
                setgrpNm(event.target.value);
              }}
            ></input>
          </Box>
          <Box ml={115} display="flex" gap={1}>
            <Button className={styles.CommButton} onClick={fetchCommCodeItems2}>
              조회
            </Button>
            <Button className={styles.CommButton}>저장</Button>
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} gap={10}>
        <Box //그룹코드
        >
          <Box ml={2}>
            <Box
              display={"flex"}
              gap={1}
              alignItems={"center"}
              justifyContent={"space-between"}
              mb={1}
            >
              <Typography style={{ fontWeight: "bold", color: "grey" }}>
                그룹코드
              </Typography>
              <Box display={"flex"} gap={1}>
                <Button className={styles.CommButton} onClick={addCommCodeItem}>
                  행추가
                </Button>
                <Button className={styles.CommButton}>행삭제</Button>
              </Box>
            </Box>
            {/* Table */}
            <Card sx={{ width: 860 }}>
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>순번</TableCell>
                        <TableCell>공통코드</TableCell>
                        <TableCell>공통코드명</TableCell>
                        <TableCell>설명</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {CommCode.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>

                          <TableCell>
                            <Box>
                              <TextField
                                onClick={() => setSelectedGrpCd(row.cm_grp_cd)}
                                size="small"
                                value={row.cm_grp_cd}
                                sx={{
                                  cursor: "pointer",
                                  // 선택된 행을 시각적으로 구분
                                  backgroundColor:
                                    selectedGrpCd === row.cm_grp_cd
                                      ? "#f0f0f0"
                                      : "inherit",
                                }}
                                onChange={(event) => {
                                  handleChange(
                                    index,
                                    "cm_grp_cd",
                                    event.target.value
                                  );
                                }}
                              />
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box>
                              <TextField
                                sx={{
                                  cursor: "pointer",
                                  // 선택된 행을 시각적으로 구분
                                  backgroundColor:
                                    selectedGrpCd === row.cm_grp_cd
                                      ? "#f0f0f0"
                                      : "inherit",
                                }}
                                size="small"
                                value={row.cm_grp_nm}
                                onChange={(event) => {
                                  handleChange(
                                    index,
                                    "cm_grp_nm",
                                    event.target.value
                                  );
                                }}
                              />
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box>
                              <TextField
                                sx={{
                                  cursor: "pointer",
                                  // 선택된 행을 시각적으로 구분
                                  backgroundColor:
                                    selectedGrpCd === row.cm_grp_cd
                                      ? "#f0f0f0"
                                      : "inherit",
                                }}
                                size="small"
                                value={row.cm_grp_desc}
                                onChange={(event) => {
                                  handleChange(
                                    index,
                                    "cm_grp_desc",
                                    event.target.value
                                  );
                                }}
                              />
                            </Box>
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
        <Box>
          <Box
            gap={1}
            display={"flex"} //그룹코드
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={1}
          >
            <Box>
              <Typography style={{ fontWeight: "bold", color: "grey" }}>
                상세코드
              </Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Box sx={{ background: "#f29bb8", borderRadius: 15 }}>
                <ArrowDropUpOutlinedIcon
                  sx={{ fontSize: 30, color: "white" }}
                ></ArrowDropUpOutlinedIcon>
              </Box>
              <Box sx={{ background: "#f29bb8", borderRadius: 15 }}>
                <ArrowDropDownOutlinedIcon
                  sx={{ fontSize: 30, color: "white" }}
                ></ArrowDropDownOutlinedIcon>
              </Box>

              <Button className={styles.CommButton}>행추가</Button>
              <Button className={styles.CommButton}>행삭제</Button>
            </Box>
          </Box>{" "}
          {/* Table */}
          <Card sx={{ width: 900 }}>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>순번</TableCell>
                      <TableCell>상세코드</TableCell>
                      <TableCell>상세코드명</TableCell>
                      <TableCell>설명</TableCell>
                      <TableCell>사용여부</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredDetailCodes.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Box>
                            <TextField size="small" value={row.cm_dt_cd} />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <TextField size="small" value={row.cm_dt_nm} />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <TextField size="small" value={row.cm_dt_desc} />
                          </Box>
                        </TableCell>{" "}
                        <TableCell>
                          <Checkbox></Checkbox>
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
    </Box>
  );
}
