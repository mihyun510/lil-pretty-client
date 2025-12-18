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
  FormControl,
  Pagination,
  InputLabel,
} from "@mui/material";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

import { useEffect, useState } from "react";
import { CommonCodeItems, CommonCodeId } from "@/api/interfaces/CommonCode";
import {
  getCommCodeItems,
  deleteAdminCommCodeItems,
  insertAdminCommCodeItems,
} from "@/api/admin/commonCodeApi";
import { useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import { gfnGetCudResultMessage } from "@/lib/crudMessage";
import styles from "./CommonCode.module.css";
export default function CommonMainForm() {
  const [grpCd, setgrpCd] = useState("");
  const [dtCd, setdtCd] = useState("");
  const [grpNm, setgrpNm] = useState("");
  const [CommCode, setCommCode] = useState<CommonCodeItems[]>([]);
  const [selectedGrpCd, setSelectedGrpCd] = useState<string | null>(null);
  /* ---------------- 페이징 ----------------- */
  const itemsPerPage = 6; // 한 페이지에 표시할 카드 수
  const totalPages = Math.ceil(CommCode.length / itemsPerPage);
  const [page, setPage] = useState(1);
  const paginatedCommonCode = CommCode.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  /* ---------------- 추가 ----------------- */
  const addCommCodeItem = () => {
    const newRow: CommonCodeItems = {
      // 실제 DB 컬럼에 맞게 빈 값 설정
      cm_grp_cd: "",
      cm_dt_cd: "",
      cm_grp_nm: "",
      cm_grp_desc: "",
      cm_dt_nm: "",
      cm_dt_desc: "",
    };
    setCommCode([...CommCode, newRow]);
  };

  const saveItem = async () => {
    const result = await insertAdminCommCodeItems(CommCode);
  };
  /* ---------------- 삭제 ----------------- */
  const [selectedgrpCdList, setselectedgrpCdList] = useState<CommonCodeId[]>(
    []
  );

  const handleCheckboxChange = (clickedItem: CommonCodeId) => {
    // 상태 Setter 함수를 사용하여 상태 업데이트
    setselectedgrpCdList((prevSelectedIds) =>
      // 1. 선택 여부 확인: 복합키(두 필드)가 모두 일치하는 항목이 있는지 확인
      prevSelectedIds.some(
        (item) =>
          item.cm_grp_cd === clickedItem.cm_grp_cd &&
          item.cm_dt_cd === clickedItem.cm_dt_cd
      )
        ? // 2. (TRUE: 이미 선택됨) 필터링으로 제거: 복합키가 일치하는 항목만 제외하고 새 배열 반환
          prevSelectedIds.filter(
            (item) =>
              item.cm_grp_cd !== clickedItem.cm_grp_cd ||
              item.cm_dt_cd !== clickedItem.cm_dt_cd
          )
        : // 3. (FALSE: 선택 안 됨) 새 항목 추가: 기존 배열에 새 항목을 추가하여 새 배열 반환
          [...prevSelectedIds, clickedItem]
    );
  };
  const handleDelete = async () => {
    if (selectedgrpCdList.length === 0) {
      alert("삭제할 식단을 선택해주세요.");
      return;
    }
    if (!confirm("선택한 식단을 삭제하시겠습니까?")) return;

    const result = await deleteAdminCommCodeItems(selectedgrpCdList);

    alert(gfnGetCudResultMessage(result));

    setselectedgrpCdList([]);

    // 현재 페이지 유지한 채 목록 재조회
    fetchCommCodeItems();
  };

  const grpNmChange = (event) => {
    setgrpNm(event?.target.value);
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
  const fetchCommCodeItems = async () => {
    const result = await getCommCodeItems(grpCd, grpNm);
    if (result.ok && result.data) {
      setCommCode(result.data);
    } else {
      console.error(result.message);
    }
  };
  useEffect(() => {
    fetchCommCodeItems();
  }, []);
  const filteredCommCode = CommCode.filter((item) => {
    const groupName = item.cm_grp_nm;

    return groupName.startsWith(grpNm);
  });
  return (
    <Box sx={{ p: 4, backgroundColor: "#fdecef", minHeight: "100vh" }}>
      <Box>
        <Typography variant="h5" fontWeight="bold" color="gray">
          공통코드 관리
        </Typography>

        <Box
          //조회조건
          display={"flex"}
          ml={2}
          mt={5}
          mb={-5}
        >
          <TextField
            id="outlined-basic"
            label="그룹코드 명"
            variant="outlined"
            value={grpNm}
            onChange={grpNmChange}
          ></TextField>
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
              justifyContent={"end"}
              mb={1}
            ></Box>
            <Box display={"flex"} gap={1} mb={1} justifyContent={"end"} mr={0}>
              <Button className={styles.CommButton} onClick={addCommCodeItem}>
                추가
              </Button>
              <Button onClick={handleDelete} className={styles.CommButton}>
                삭제
              </Button>
              <Button className={styles.CommButton}>저장</Button>
            </Box>
            {/* Table */}
            <Card
              sx={{
                width: 1800,
                mx: 0,
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
                        <TableCell align="center">순번</TableCell>{" "}
                        <TableCell align="center">선택</TableCell>
                        <TableCell align="center">공통코드</TableCell>
                        <TableCell align="center">공통코드명</TableCell>
                        <TableCell align="center">상세코드</TableCell>
                        <TableCell align="center">상세코드명</TableCell>
                        <TableCell align="center">설명</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredCommCode.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">
                            <Checkbox
                              color="secondary"
                              checked={selectedgrpCdList.some(
                                (item) =>
                                  item.cm_grp_cd === row.cm_grp_cd &&
                                  item.cm_dt_cd === row.cm_dt_cd
                              )}
                              onChange={() =>
                                handleCheckboxChange({
                                  cm_grp_cd: row.cm_grp_cd, // 현재 행의 그룹 코드
                                  cm_dt_cd: row.cm_dt_cd, // 현재 행의 상세 코드
                                })
                              }
                            ></Checkbox>
                          </TableCell>
                          <TableCell align="center">
                            <Box>
                              <TextField
                                onClick={() => setSelectedGrpCd(row.cm_grp_cd)} //
                                size="small"
                                value={row.cm_grp_cd}
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

                          <TableCell align="center">
                            <Box>
                              <TextField
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

                          <TableCell align="center">{row.cm_dt_cd}</TableCell>
                          <TableCell align="center">
                            <Box>
                              <TextField
                                size="small"
                                value={row.cm_dt_nm}
                                onChange={(event) => {
                                  handleChange(
                                    index,
                                    "cm_dt_nm",
                                    event.target.value
                                  );
                                }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Box>
                              <TextField
                                size="small"
                                value={row.cm_dt_desc}
                                onChange={(event) => {
                                  handleChange(
                                    index,
                                    "cm_dt_desc",
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
          ></Box>{" "}
        </Box>{" "}
      </Box>{" "}
      <Box sx={{ display: "flex", justifyContent: "center", mt: -58 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
}
