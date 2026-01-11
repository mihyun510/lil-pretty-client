import {
  Box,
  Typography,
  Card,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  TableBody,
  Checkbox,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  CommonCodeItems,
  CommonCodeId,
} from "@/api/interfaces/AdminCommonCode";
import {
  getAdminGroupCode,
  getAdminDetailCode,
  saveAdminCommonCode,
  deleteAdminCommonCode,
} from "@/api/admin/commonCodeApi";
import { gfnGetCudResultMessage } from "@/lib/crudMessage";

const getRowSpans = (data: any[], key: string) => {
  const spans: number[] = [];
  let i = 0;
  while (i < data.length) {
    let span = 1;
    while (i + span < data.length && data[i + span][key] === data[i][key]) {
      span++;
    }
    spans.push(span);
    for (let j = 1; j < span; j++) spans.push(0);
    i += span;
  }
  return spans;
};

export default function CommonMainForm() {
  const [groupCodes, setGroupCodes] = useState<CommonCodeItems[]>([]);
  const [detailCodes, setDetailCodes] = useState<CommonCodeItems[]>([]);
  const [selectedGrpCd, setSelectedGrpCd] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<CommonCodeItems[]>([]);

  const fetchGroupCodes = async () => {
    const result = await getAdminGroupCode();
    if (result.ok && result.data) {
      const sortedData = [...result.data].sort((a, b) =>
        a.cmGrpCd.localeCompare(b.cmGrpCd)
      );
      setGroupCodes(sortedData);
    }
  };

  const fetchDetailCodes = async (grpCd: string) => {
    setSelectedGrpCd(grpCd);
    const result = await getAdminDetailCode(grpCd);
    setDetailCodes(result.ok && result.data ? result.data : []);
    setSelectedRows([]);
  };

  useEffect(() => {
    fetchGroupCodes();
  }, []);

  const groupSpans = getRowSpans(groupCodes, "cmGrpCd");

  const handleDetailChange = (
    index: number,
    field: keyof CommonCodeItems,
    value: string
  ) => {
    const updatedCodes = [...detailCodes];
    updatedCodes[index] = { ...updatedCodes[index], [field]: value };
    setDetailCodes(updatedCodes);

    // 체크된 상태에서 값이 바뀌면 선택 목록도 동기화
    setSelectedRows((prev) =>
      prev.map((row) =>
        row === detailCodes[index] ? updatedCodes[index] : row
      )
    );
  };

  const handleAddRow = () => {
    if (!selectedGrpCd) {
      alert("그룹을 먼저 선택해 주세요.");
      return;
    }
    const newRow: CommonCodeItems = {
      cmGrpCd: selectedGrpCd,
      cmDtCd: "",
      cmDtNm: "",
      cmDtDesc: "",
      useYn: "Y",
    } as any;
    setDetailCodes([...detailCodes, newRow]);
  };

  const handleDeleteRow = async () => {
    if (selectedRows.length === 0) {
      alert("삭제할 항목을 선택하세요.");
      return;
    }
    if (!confirm("선택한 항목을 삭제하시겠습니까?")) return;

    const existingItems: CommonCodeId[] = selectedRows
      .filter((row) => row.cmDtCd)
      .map((row) => ({ cmGrpCd: row.cmGrpCd, cmDtCd: row.cmDtCd }));

    if (existingItems.length > 0) {
      const result = await deleteAdminCommonCode(existingItems);
      alert(gfnGetCudResultMessage(result, "삭제"));
    }
    if (selectedGrpCd) fetchDetailCodes(selectedGrpCd);
  };

  // --- [수정] 체크된 항목에 그룹 정보를 결합하여 저장 ---
  const handleSave = async () => {
    if (selectedRows.length === 0) {
      alert("저장할 항목을 선택해 주세요.");
      return;
    }

    if (!selectedGrpCd) return;

    // 현재 선택된 그룹의 명칭과 설명을 찾음
    const currentGroup = groupCodes.find((g) => g.cmGrpCd === selectedGrpCd);

    const dataToSave = selectedRows.map((row) => ({
      ...row,
      cmGrpNm: currentGroup?.cmGrpNm || "",
      cmGrpDesc: currentGroup?.cmGrpDesc || "",
    }));

    const result = await saveAdminCommonCode(dataToSave);
    alert(gfnGetCudResultMessage(result, "저장"));

    if (result.successCount > 0) {
      fetchDetailCodes(selectedGrpCd);
      setSelectedRows([]);
    }
  };

  const handleCheckboxChange = (row: CommonCodeItems) => {
    setSelectedRows((prev) =>
      prev.includes(row) ? prev.filter((item) => item !== row) : [...prev, row]
    );
  };

  const ButtonStyle = {
    backgroundColor: "#f29bb8",
    color: "white",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "#d87a99" },
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#fdecef", minHeight: "100vh" }}>
      <Typography variant="h5" fontWeight="bold" color="gray" mb={3}>
        공통코드 관리
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        {/* 그룹 목록 생략 (기존과 동일) */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            그룹 목록
          </Typography>
          <Card sx={{ border: "2px solid #f8a1b5" }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">그룹코드</TableCell>
                    <TableCell align="center">그룹명</TableCell>
                    <TableCell align="center">그룹설명</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupCodes.map((row, index) => {
                    const span = groupSpans[index];
                    return (
                      <TableRow
                        key={`grp-${index}`}
                        hover
                        selected={selectedGrpCd === row.cmGrpCd}
                        onClick={() => fetchDetailCodes(row.cmGrpCd)}
                        sx={{ cursor: "pointer" }}
                      >
                        {span > 0 && (
                          <TableCell
                            align="center"
                            rowSpan={span}
                            sx={{
                              bgcolor: "white",
                              fontWeight: "bold",
                              borderRight: "1px solid #eee",
                            }}
                          >
                            {row.cmGrpCd}
                          </TableCell>
                        )}
                        {span > 0 && (
                          <TableCell
                            align="center"
                            rowSpan={span}
                            sx={{ bgcolor: "white" }}
                          >
                            {row.cmGrpNm}
                          </TableCell>
                        )}
                        {span > 0 && (
                          <TableCell
                            align="center"
                            rowSpan={span}
                            sx={{ bgcolor: "white" }}
                          >
                            {row.cmGrpDesc}
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>

        {/* 상세 코드 목록 */}
        <Box sx={{ flex: 2 }}>
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              상세 코드
            </Typography>
            <Stack direction="row" gap={1}>
              <Button
                onClick={handleAddRow}
                size="small"
                variant="contained"
                sx={ButtonStyle}
              >
                추가
              </Button>
              <Button
                onClick={handleDeleteRow}
                size="small"
                variant="contained"
                sx={ButtonStyle}
              >
                삭제
              </Button>
              <Button
                onClick={handleSave}
                size="small"
                variant="contained"
                color="success"
                sx={ButtonStyle}
              >
                저장
              </Button>
            </Stack>
          </Stack>
          <Card sx={{ border: "2px solid #f8a1b5" }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell align="center">상세코드</TableCell>
                    <TableCell align="center">상세코드명</TableCell>
                    <TableCell align="center">상세코드설명</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detailCodes.map((row, index) => (
                    <TableRow key={`dtl-${index}`}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedRows.includes(row)}
                          onChange={() => handleCheckboxChange(row)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          fullWidth
                          value={row.cmDtCd || ""}
                          disabled={true}
                          sx={{ bgcolor: "#f5f5f5" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          fullWidth
                          value={row.cmDtNm || ""}
                          onChange={(e) =>
                            handleDetailChange(index, "cmDtNm", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          fullWidth
                          value={row.cmDtDesc || ""}
                          onChange={(e) =>
                            handleDetailChange(
                              index,
                              "cmDtDesc",
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
