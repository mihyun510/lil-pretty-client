import {
  getDateCourse,
  updateDateCourse,
  getDetailDateCourse,
  deleteDateCourse,
  deleteDetailDateCourse,
} from "@/api/admin/dateMainApi";
import { DateDtlItems } from "@/api/interfaces/DateDtl";
import { DateDtlCourse } from "@/api/interfaces/DateDtlCourse";
import { useNavigate } from "react-router-dom";
import { CommonResponse } from "@/api/interfaces/Common";
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
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function DateMainForm() {
  const [DateCourse, SetDateCourse] = useState<DateDtlItems[]>([]);
  const [DetailDateCourse, SetDetailDateCourse] = useState<DateDtlCourse[]>([]);
  const [dmCd, setDmCd] = useState("");
  const [ddCd, setDdCd] = useState(""); // 현재 선택된 데이트 코스 코드

  const FetchDateCourse = async (targetDmCd: string) => {
    if (!targetDmCd) return;
    const response: CommonResponse<DateDtlItems[]> = await getDateCourse(
      targetDmCd
    );
    if (response.ok && response.data) {
      SetDateCourse(response.data);
    }
  };

  useEffect(() => {
    FetchDateCourse(dmCd);
  }, [dmCd]);

  const FetchDetailDateCourse = async (targetDdCd: string) => {
    if (!targetDdCd) return;
    setDdCd(targetDdCd); // 현재 보고 있는 상세 코드 업데이트
    const response: CommonResponse<DateDtlCourse[]> = await getDetailDateCourse(
      targetDdCd
    );
    if (response.ok && response.data) {
      SetDetailDateCourse(response.data);
    } else {
      SetDetailDateCourse([]);
    }
  };

  const onaddRow = () => {
    const newRow: DateDtlItems = {
      dd_cd: "",
      dd_title: "",
      dd_img: "",
      dd_desc: "",
    };
    SetDateCourse((prevCourse) => [...prevCourse, newRow]);
  };

  const onDelete = async () => {
    if (!ddCd) return alert("삭제할 행의 체크박스를 선택해주세요.");
    if (!confirm("정말 삭제하시겠습니까?")) return;

    const deleteResponse = await deleteDateCourse(ddCd);
    if (deleteResponse.ok) {
      alert("삭제되었습니다.");
      FetchDateCourse(dmCd);
      SetDetailDateCourse([]); // 삭제 후 상세 리스트 초기화
      setDdCd("");
    }
  };

  // 상세 카드 삭제 로직 수정 (dcCd를 인자로 직접 받음)
  const handleDetailDelete = async (targetDcCd: string) => {
    if (!confirm("해당 상세 코스를 삭제하시겠습니까?")) return;
    const deleteResponse = await deleteDetailDateCourse(targetDcCd);
    if (deleteResponse.ok) {
      alert("삭제되었습니다.");
      FetchDetailDateCourse(ddCd); // 현재 ddCd 기반으로 재조회
    }
  };

  const onUpdate = async () => {
    if (!dmCd) return alert("유형을 선택해주세요.");
    await updateDateCourse(dmCd, DateCourse);
    alert("저장되었습니다.");
  };

  const handleChange = (
    index: number,
    field: keyof DateDtlItems,
    value: string
  ) => {
    SetDateCourse((prevCourse) =>
      prevCourse.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const headers = [
    { value: "check", text: "선택" },
    { value: "dd_cd", text: "순번" },
    { value: "dd_title", text: "데이트 제목" },
    { value: "dd_img", text: "이미지" },
    { value: "dd_desc", text: "설명" },
  ];
  const ButtonStyle = {
    backgroundColor: "#f29bb8",
    color: "white",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "#d87a99" },
  };
  return (
    <Box sx={{ p: 2 }}>
      <Typography
        sx={{ fontSize: "25px", color: "grey", fontWeight: "bold", mb: 2 }}
      >
        데이트 존 관리
      </Typography>

      <Box display={"flex"} alignItems="center" mb={3}>
        <Typography sx={{ fontSize: "20px", ml: 3, fontWeight: "bold", mr: 2 }}>
          데이트 유형
        </Typography>
        <select
          style={{
            color: "black",
            backgroundColor: "white",
            padding: "8px",
            border: "2px solid pink",
            borderRadius: "10px",
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

      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        mb={1}
        ml={2}
      >
        <Typography sx={{ fontWeight: "bold" }}>데이트 코스</Typography>
        <Box display="flex" gap={1}>
          <button
            style={{
              backgroundColor: "#f29bb8",
              color: "white",
              borderRadius: "8px",
            }}
            onClick={onaddRow}
          >
            행 추가
          </button>
          <button
            style={{
              backgroundColor: "#f29bb8",
              color: "white",
              borderRadius: "8px",
              padding: "5px 15px",
              cursor: "pointer",
            }}
            onClick={onDelete}
          >
            행 삭제
          </button>
          <button
            style={{
              backgroundColor: "#f29bb8",
              color: "white",
              borderRadius: "8px",
              padding: "5px 15px",
              cursor: "pointer",
            }}
            onClick={onUpdate}
          >
            저장
          </button>
        </Box>
      </Box>

      <Box display={"flex"} gap={3} ml={2}>
        <Paper sx={{ flex: 1, border: 2, borderColor: "pink" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell
                    key={header.value}
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {header.text}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {DateCourse.map((item, index) => (
                <TableRow
                  key={index}
                  selected={ddCd === item.dd_cd}
                  sx={{ "&.Mui-selected": { backgroundColor: "#fff0f3" } }}
                >
                  <TableCell align="center">
                    <Checkbox
                      checked={ddCd === item.dd_cd}
                      onChange={() => FetchDetailDateCourse(item.dd_cd)}
                    />
                  </TableCell>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      fullWidth
                      onChange={(e) =>
                        handleChange(index, "dd_title", e.target.value)
                      }
                      value={item.dd_title}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="클릭 시 상세조회"
                      onChange={(e) =>
                        handleChange(index, "dd_img", e.target.value)
                      }
                      value={item.dd_img}
                      onClick={() =>
                        item.dd_cd && FetchDetailDateCourse(item.dd_cd)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      fullWidth
                      onChange={(e) =>
                        handleChange(index, "dd_desc", e.target.value)
                      }
                      value={item.dd_desc}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Box
          sx={{
            width: "400px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="subtitle2" color="secondary">
            상세 코스 정보
          </Typography>
          {DetailDateCourse.length === 0 && (
            <Typography variant="body2" color="grey">
              코스를 선택하면 상세 정보가 표시됩니다.
            </Typography>
          )}
          {DetailDateCourse.map((item, index) => (
            <Card
              key={index}
              sx={{ border: 1, borderColor: "pink", position: "relative" }}
            >
              <Box display={"flex"} p={1}>
                <CardMedia
                  sx={{
                    width: 80,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption">No Image</Typography>
                  <button style={{ fontSize: "10px", marginTop: "5px" }}>
                    이미지 등록
                  </button>
                </CardMedia>
                <CardContent sx={{ flex: 1, pt: 1 }}>
                  <button
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      cursor: "pointer",
                    }}
                    onClick={() => handleDetailDelete(item.dc_cd)}
                  >
                    x
                  </button>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                      제목: {item.dc_title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.dc_desc}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="caption">가격:</Typography>
                    <input
                      type="text"
                      style={{ width: "60px" }}
                      defaultValue={item.dc_price || 0}
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
              }}
            >
              + 상세 코스 추가
            </button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
