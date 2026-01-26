import {
  getDateCourse,
  updateDateCourse,
  getDateCourseDetailItems,
  deleteDateCourse,
  deleteDetailDateCourse, // 상세 삭제 API 추가
} from "@/api/admin/dateMainApi";
import { DateDtlItems } from "@/api/interfaces/DateDtl";
import { DateDtlCourse } from "@/api/interfaces/DateDtlCourse";
import {
  Box,
  Typography,
  Table,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Checkbox,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";

export default function DateMainForm() {
  const [DateCourse, SetDateCourse] = useState<DateDtlItems[]>([]);
  const [DetailDateCourse, SetDetailDateCourse] = useState<DateDtlCourse[]>([]);
  const [dmCd, setDmCd] = useState("");
  const [ddCd, setDdCd] = useState("");
  const lastRowInputRef = useRef<HTMLInputElement | null>(null);

  const FetchDateCourse = async (targetDmCd: string) => {
    if (!targetDmCd) {
      SetDateCourse([]);
      return;
    }
    const response = await getDateCourse(targetDmCd);
    if (response.ok && Array.isArray(response.data)) {
      SetDateCourse(response.data);
    } else {
      SetDateCourse([]);
    }
  };

  useEffect(() => {
    FetchDateCourse(dmCd);
  }, [dmCd]);

  useEffect(() => {
    if (DateCourse.length > 0 && lastRowInputRef.current) {
      setTimeout(() => lastRowInputRef.current?.focus(), 10);
    }
  }, [DateCourse.length]);

  const FetchDetailDateCourse = async (targetDdCd: string) => {
    if (!targetDdCd) return;
    if (ddCd === targetDdCd) {
      setDdCd("");
      SetDetailDateCourse([]);
    } else {
      setDdCd(targetDdCd);
      const response = await getDateCourseDetailItems(targetDdCd);
      SetDetailDateCourse(
        response.ok && Array.isArray(response.data) ? response.data : [],
      );
    }
  };

  const onaddRow = () => {
    const newRow: DateDtlItems = {
      dd_cd: "",
      dd_title: "",
      dd_img: "",
      dd_desc: "",
    };
    setDdCd("");
    SetDetailDateCourse([]);
    SetDateCourse((prev) => [...(Array.isArray(prev) ? prev : []), newRow]);
  };

  const handleChange = (
    index: number,
    field: keyof DateDtlItems,
    value: string,
  ) => {
    SetDateCourse((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const handleChangeDetail = (
    index: number,
    field: keyof DateDtlCourse,
    value: any,
  ) => {
    SetDetailDateCourse((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  // 🚩 상세 코스 삭제 로직 (DB 연동)
  const onDeleteDetail = async (index: number, dcCd: string) => {
    if (!confirm("이 상세 코스 항목을 영구 삭제하시겠습니까?")) return;

    // 만약 dc_cd가 존재하고 신규 데이터(NEW_)가 아니라면 DB 삭제 요청
    if (dcCd && !dcCd.startsWith("NEW")) {
      const res = await deleteDetailDateCourse(dcCd);
      if (!res?.ok) {
        alert("DB 삭제에 실패했습니다.");
        return;
      }
    }

    // UI에서 제거
    SetDetailDateCourse((prev) => prev.filter((_, i) => i !== index));
    if (dcCd && !dcCd.startsWith("NEW")) alert("삭제되었습니다.");
  };

  const onUpdate = async () => {
    if (!dmCd) return alert("유형을 선택해주세요.");
    if (!ddCd) return alert("저장할 코스를 선택(체크)해주세요.");
    const selectedCourse = DateCourse.filter((item) => item.dd_cd === ddCd);
    if (selectedCourse.length === 0) {
      alert("선택된 데이터가 없습니다.");
      return;
    }
    const res = await updateDateCourse(dmCd, selectedCourse);
    if (res?.ok) {
      alert("저장되었습니다.");
      FetchDateCourse(dmCd);
    } else {
      alert("저장에 실패했습니다.");
    }
  };

  const onDelete = async () => {
    if (!ddCd) return alert("삭제할 행을 선택해주세요.");
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const res = await deleteDateCourse(ddCd);
    if (res?.ok) {
      alert("삭제되었습니다.");
      FetchDateCourse(dmCd);
      SetDetailDateCourse([]);
      setDdCd("");
    }
  };

  const buttonStyle = {
    backgroundColor: "#f29bb8",
    color: "white",
    borderRadius: "8px",
    padding: "6px 14px",
    cursor: "pointer",
    border: "none",
    fontSize: "13px",
    fontWeight: "bold",
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        sx={{ fontSize: "25px", color: "grey", fontWeight: "bold", mb: 2 }}
      >
        데이트 존 관리
      </Typography>

      <Box display={"flex"} alignItems="center" mb={3}>
        <Typography sx={{ fontSize: "18px", ml: 1, fontWeight: "bold", mr: 2 }}>
          데이트 유형
        </Typography>
        <select
          style={{
            padding: "8px",
            border: "2px solid pink",
            borderRadius: "10px",
            outline: "none",
          }}
          onChange={(e) => setDmCd(e.target.value)}
          value={dmCd}
        >
          <option value="">선택하세요</option>
          <option value="DM00000001">힐링 데이트</option>
          <option value="DM00000002">추억 데이트</option>
          <option value="DM00000003">액티비티 데이트</option>
        </select>
      </Box>

      <Box display={"flex"} gap={3} alignItems="flex-start">
        <Box sx={{ flex: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            mb={1}
          >
            <Typography sx={{ fontWeight: "bold", ml: 1, color: "#555" }}>
              데이트 코스 목록
            </Typography>
            <Box display="flex" gap={1}>
              <button style={buttonStyle} onClick={onaddRow}>
                행 추가
              </button>
              <button style={buttonStyle} onClick={onDelete}>
                행 삭제
              </button>
              <button style={buttonStyle} onClick={onUpdate}>
                저장
              </button>
            </Box>
          </Box>
          <Paper
            sx={{
              border: 2,
              borderColor: "pink",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Table size="small">
              <TableHead sx={{ backgroundColor: "#fff5f7" }}>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", width: "60px" }}
                  >
                    선택
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", width: "60px" }}
                  >
                    순번
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    데이트 제목
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    이미지 경로
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    설명
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {DateCourse.map((item, index) => (
                  <TableRow
                    key={index}
                    hover
                    onClick={() =>
                      item.dd_cd && FetchDetailDateCourse(item.dd_cd)
                    }
                    selected={ddCd === item.dd_cd}
                    sx={{
                      cursor: "pointer",
                      "&.Mui-selected": {
                        backgroundColor: "#fff0f3 !important",
                      },
                    }}
                  >
                    <TableCell align="center">
                      <Checkbox checked={ddCd === item.dd_cd} size="small" />
                    </TableCell>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <TextField
                        size="small"
                        fullWidth
                        value={item.dd_title || ""}
                        onChange={(e) =>
                          handleChange(index, "dd_title", e.target.value)
                        }
                        inputRef={
                          index === DateCourse.length - 1
                            ? lastRowInputRef
                            : null
                        }
                      />
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <TextField
                        size="small"
                        fullWidth
                        value={item.dd_img || ""}
                        onChange={(e) =>
                          handleChange(index, "dd_img", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <TextField
                        size="small"
                        fullWidth
                        value={item.dd_desc || ""}
                        onChange={(e) =>
                          handleChange(index, "dd_desc", e.target.value)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>

        <Box
          sx={{
            width: "400px",
            minWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              maxHeight: "70vh",
              overflowY: "auto",
              pr: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {DetailDateCourse.length === 0 && (
              <Typography
                variant="body2"
                color="grey"
                textAlign="center"
                mt={4}
              >
                목록에서 코스를 선택해 주세요.
              </Typography>
            )}

            {DetailDateCourse.map((item, index) => (
              <Card
                key={index}
                sx={{
                  border: 1,
                  borderColor: "pink",
                  boxShadow: "none",
                  position: "relative",
                }}
              >
                {/* 🚩 상세 개별 삭제 버튼 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteDetail(index, item.dc_cd);
                  }}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    background: "#ff4d4f",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                  }}
                >
                  ×
                </button>

                <Box display={"flex"} p={1}>
                  <CardMedia
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: "#f9f9f9",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="caption" sx={{ fontSize: "10px" }}>
                      No Image
                    </Typography>
                  </CardMedia>
                  <CardContent
                    sx={{ flex: 1, pt: 0, pb: "8px !important", pl: 2, pr: 3 }}
                  >
                    <TextField
                      variant="standard"
                      placeholder="상세 제목"
                      fullWidth
                      value={item.dc_title || ""}
                      onChange={(e) =>
                        handleChangeDetail(index, "dc_title", e.target.value)
                      }
                    />
                    <TextField
                      variant="standard"
                      placeholder="설명"
                      fullWidth
                      multiline
                      value={item.dc_desc || ""}
                      onChange={(e) =>
                        handleChangeDetail(index, "dc_desc", e.target.value)
                      }
                    />
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <Typography variant="caption">가격:</Typography>
                      <input
                        type="number"
                        style={{
                          width: "80px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                        value={item.dc_price || 0}
                        onChange={(e) =>
                          handleChangeDetail(
                            index,
                            "dc_price",
                            Number(e.target.value),
                          )
                        }
                      />
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            ))}

            {ddCd && (
              <button
                style={{
                  padding: "10px",
                  border: "1px dashed pink",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: "#fff5f7",
                  color: "#f29bb8",
                  fontWeight: "bold",
                }}
                onClick={() =>
                  SetDetailDateCourse([
                    ...DetailDateCourse,
                    {
                      dc_cd: `NEW_${Date.now()}`,
                      dd_cd: ddCd,
                      dc_title: "",
                      dc_desc: "",
                      dc_price: 0,
                    },
                  ])
                }
              >
                + 상세 코스 추가
              </button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
