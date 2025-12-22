import {
  Box,
  Typography,
  Card,
  Button,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  TableBody,
  Checkbox,
  Pagination,
} from "@mui/material";

import { useEffect, useState } from "react";
import {
  CommonCodeItems,
  CommonCodeId,
} from "@/api/interfaces/AdminCommonCode";
import {
  getAdminCommonCodeItems,
  deleteAdminCommCodeItems,
  saveAdminCommCodeItems,
} from "@/api/admin/commonCodeApi";

import { gfnGetCudResultMessage } from "@/lib/crudMessage";
import styles from "./CommonCode.module.css";
export default function CommonMainForm() {
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
      cmGrpCd: "",
      cmDtCd: "",
      cmGrpNm: "",
      cmGrpDesc: "",
      cmDtNm: "",
      cmDtDesc: "",
    };

    setPage(1);
    setCommCode([newRow, ...CommCode]);
  };

  /* ---------------- 삭제 ----------------- */
  const [selectedRows, setSelectedRows] = useState<CommonCodeItems[]>([]);

  const handleCheckboxChange = (row: CommonCodeItems) => {
    // 상태 Setter 함수를 사용하여 상태 업데이트
    setSelectedRows((prevSelectedIds) =>
      // 1. 선택 여부 확인: 복합키(두 필드)가 모두 일치하는 항목이 있는지 확인
      prevSelectedIds.some(
        (item) => item.cmGrpCd === row.cmGrpCd && item.cmDtCd === row.cmDtCd
      )
        ? // 2. (TRUE: 이미 선택됨) 필터링으로 제거: 복합키가 일치하는 항목만 제외하고 새 배열 반환
          prevSelectedIds.filter(
            (item) => item.cmGrpCd !== row.cmGrpCd || item.cmDtCd !== row.cmDtCd
          )
        : // 3. (FALSE: 선택 안 됨) 새 항목 추가: 기존 배열에 새 항목을 추가하여 새 배열 반환
          [...prevSelectedIds, row]
    );
  };
  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      alert("삭제할 공통코드를 선택해주세요.");
      return;
    }
    if (!confirm("선택한 공통코드를 삭제하시겠습니까?")) return;
    const idListOnly = selectedRows.map((row) => ({
      cmGrpCd: row.cmGrpCd,
      cmDtCd: row.cmDtCd,
    }));
    const result = await deleteAdminCommCodeItems(idListOnly);

    alert(gfnGetCudResultMessage(result));

    setSelectedRows([]);

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
    return selectedGrpCd !== null && item.cmGrpCd === selectedGrpCd;
  });
  const fetchCommCodeItems = async () => {
    const result = await getAdminCommonCodeItems(grpNm);
    if (result.ok && result.data) {
      setCommCode(result.data);
    } else {
      console.error(result.message);
    }
  };
  useEffect(() => {
    fetchCommCodeItems();
  }, []);
  /* ---------------- 저장 ----------------- */
  const saveItems = async () => {
    if (selectedRows.length === 0) {
      alert("저장할 공통코드를 선택해주세요.");
      return;
    }
    if (!confirm("선택한 공통코드를 저장하시겠습니까?")) return;
    const result = await saveAdminCommCodeItems(selectedRows);
    if (gfnGetCudResultMessage(result) == "Success") {
      alert("저장이 완료되었습니다.");
    }
    setSelectedRows([]);
    fetchCommCodeItems();
  };
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
              <Button className={styles.CommButton} onClick={saveItems}>
                저장
              </Button>
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
                      {paginatedCommonCode.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">
                            <Checkbox
                              color="secondary"
                              checked={selectedRows.some(
                                (item) =>
                                  item.cmGrpCd === row.cmGrpCd &&
                                  item.cmDtCd === row.cmDtCd
                              )}
                              onChange={() => handleCheckboxChange(row)}
                            ></Checkbox>
                          </TableCell>
                          <TableCell align="center">
                            <Box>
                              <TextField
                                onClick={() => setSelectedGrpCd(row.cmGrpCd)} //
                                size="small"
                                value={row.cmGrpCd}
                                onChange={(event) => {
                                  handleChange(
                                    index,
                                    "cmGrpCd",
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
                                value={row.cmGrpNm}
                                onChange={(event) => {
                                  handleChange(
                                    index,
                                    "cmGrpNm",
                                    event.target.value
                                  );
                                }}
                              />
                            </Box>
                          </TableCell>

                          <TableCell align="center">{row.cmDtCd}</TableCell>
                          <TableCell align="center">
                            <Box>
                              <TextField
                                size="small"
                                value={row.cmDtNm}
                                onChange={(event) => {
                                  handleChange(
                                    index,
                                    "cmDtNm",
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
                                value={row.cmDtDesc}
                                onChange={(event) => {
                                  handleChange(
                                    index,
                                    "cmDtDesc",
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
