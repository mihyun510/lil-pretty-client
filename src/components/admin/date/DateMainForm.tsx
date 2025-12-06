import {
  getDateCourse,
  updateDateCourse,
  getDetailDateCourse,
  deleteDateCourse,
  deleteDetailDateCourse,
} from "@/api/dateManagerApi";
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
  colors,
} from "@mui/material";
import { useEffect, useState } from "react";
export default function DateMainForm() {
  const [DateCourse, SetDateCourse] = useState<DateDtlItems[]>([]);
  const [DetailDateCourse, SetDetailDateCourse] = useState<DateDtlCourse[]>([]);
  const [dmCd, setDmCd] = useState("");
  const [ddCd, setDdCd] = useState("");
  const [dcCd, setDcCd] = useState("");
  const navigate = useNavigate();
  const FetchDateCourse = async (dmCd: string) => {
    const response: CommonResponse<DateDtlItems[]> = await getDateCourse(dmCd);
    if (response.ok && response.data) {
      return SetDateCourse(response.data);
    } else {
      console.error("데이트 정보 조회 실패:", response.message);
    }
  };
  useEffect(() => {
    FetchDateCourse(dmCd);
  }, [dmCd]);

  const FetchDetailDateCourse = async (ddCd: string) => {
    const response: CommonResponse<DateDtlCourse[]> = await getDetailDateCourse(
      ddCd
    );
    if (response.ok && response.data) {
      return SetDetailDateCourse(response.data);
    } else {
      console.error("데이트 상세정보 조회 실패:", response.message);
    }
  };
  const onaddRow = () => {
    const newRow: DateDtlItems = {
      // 실제 API 타입에 맞게 필드 이름과 기본값을 조정해야 합니다.
      // 예시:
      dd_cd: "", // 임시 고유 ID
      dd_title: "",
      dd_img: "",
      dd_desc: "",
    };

    // 2. 기존 배열을 복사하고 새로운 행을 추가한 후 상태를 업데이트합니다.
    SetDateCourse((prevCourse) => [...prevCourse, newRow]);
  };

  const onDelete = async () => {
    const FetchDateCourse = async (dmCd: string) => {
      const response: CommonResponse<DateDtlItems[]> = await getDateCourse(
        dmCd
      );
      if (response.ok && response.data) {
        return SetDateCourse(response.data);
      } else {
        console.error("데이트 정보 조회 실패:", response.message);
      }
    };
    const deleteResponse: CommonResponse<DateDtlItems[]> =
      await deleteDateCourse(ddCd);
    console.log("deleteResponse::" + deleteResponse.ok);
    if (deleteResponse.ok) {
      alert("삭제되었습니다.");
      FetchDateCourse(dmCd);
    }
  };
  const onDetailDelete = async () => {
    const FetchDateCourse = async (dcCd: string) => {
      const response: CommonResponse<DateDtlCourse[]> =
        await getDetailDateCourse(dcCd);
      if (response.ok && response.data) {
        return SetDateCourse(response.data);
      } else {
        console.error("데이트 정보 조회 실패:", response.message);
      }
    };
    const deleteResponse: CommonResponse<DateDtlCourse[]> =
      await deleteDetailDateCourse(dcCd);
    console.log("deleteResponse::" + deleteResponse.ok);
    if (deleteResponse.ok) {
      alert("삭제되었습니다.");
      FetchDetailDateCourse(ddCd);
    }
  };
  const onUpdate = async () => {
    await updateDateCourse(dmCd, DateCourse);
  };
  const handleChange = (
    index: number,
    field: keyof DateDtlItems,
    value: string
  ) => {
    SetDateCourse((prevCourse) =>
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
  const handleDateCodeChange = (value: string) => {
    setDmCd(value);
  };
  const headers = [
    { value: "dd_cd", text: "순번" },
    { value: "dd_title", text: "데이트 제목" },
    { value: "dd_img", text: "이미지" },
    { value: "dd_desc", text: "설명" },
  ];
  const firstDetail = DetailDateCourse.length > 0 ? DetailDateCourse[0] : null; // firstDetail이 있을 때만 문자열 처리 로직을 실행합니다.

  let titleValue = "";
  let locationValue = "";

  if (firstDetail && firstDetail.dc_title) {
    // '장소:' 인덱스 찾기
    const index = firstDetail.dc_title.indexOf("장소:");
    if (index !== -1) {
      // '장소:' 이전까지를 제목으로 사용
      titleValue = firstDetail.dc_title.slice(0, index).trim(); // '장소:' 이후를 장소로 사용 (옵션: 필요 시 추가 처리)
      locationValue = firstDetail.dc_title.slice(index + 3).trim();
    } else {
      // '장소:'가 없으면 전체를 제목으로 사용
      titleValue = firstDetail.dc_title.trim();
    }
  }
  return (
    <Box>
      <Typography sx={{ fontSize: "25px", color: "grey", fontWeight: "bold" }}>
        데이트 존 관리
      </Typography>
      <Box display={"flex"}>
        <Typography sx={{ fontSize: "20px", ml: 3, fontWeight: "bold", mr: 2 }}>
          데이트 유형
        </Typography>
        <select
          id="dateCode"
          name="dateCode"
          style={{
            color: "black",
            backgroundColor: "white",
            padding: "8px",
            border: "2px solid pink",
            borderRadius: "10px",
          }}
          onChange={(e) => handleDateCodeChange(e.target.value)}
        >
          <option value="">선택하세요</option>
          <option value="DM00000001">힐링 데이트</option>
          <option value="DM00000002">추억 데이트</option>
          <option value="DM00000003">액티비티 데이트</option>
        </select>
      </Box>
      <Box display={"flex"} gap={1} mb={1} ml={2}>
        <Typography mr={104} sx={{ fontWeight: "bold" }}>
          데이트 코스
        </Typography>
        <button
          style={{
            backgroundColor: "#f29bb8",
            color: "white",
            borderRadius: "8px",
            borderColor: "white",
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
            borderColor: "white",
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
            borderColor: "white",
          }}
          onClick={onUpdate}
        >
          저장
        </button>
      </Box>
      <Box display={"flex"} gap={20} ml={2}>
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            border: 2,
            borderColor: "pink",
          }}
        >
          <Table sx={{ minWidth: 400 }}>
            {/* 테이블 헤더 (여기는 이미 잘 되어 있었어요!) */}
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={header.value} sx={{ fontWeight: "bold" }}>
                    {header.text}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* 🌟🌟🌟 테이블 본문: 로직 수정 완료! 🌟🌟🌟 */}
            <TableBody>
              {/* 1. items 배열을 반복하여 행(<TableRow>)을 만듭니다. */}
              {DateCourse.map((item, index) => (
                <TableRow
                  sx={{
                    border: 2,
                    borderColor: "pink",
                  }}
                  key={index} // 행마다 고유한 key를 줍니다.
                >
                  <TableCell>
                    {" "}
                    <Checkbox onChange={() => setDdCd(item.dd_cd)}> </Checkbox>
                  </TableCell>
                  <TableCell>
                    {/* 3. item[header.value]로 알맞은 데이터를 넣습니다. */}
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <TextField
                      onChange={(e) => {
                        handleChange(index, "dd_title", e.target.value);
                      }}
                      value={`${item.dd_title}`}
                    ></TextField>
                  </TableCell>
                  <TableCell>
                    <TextField
                      onChange={(e) => {
                        handleChange(index, "dd_img", e.target.value);
                      }}
                      onClick={() => {
                        console.log("메롱" + item.dd_cd);

                        FetchDetailDateCourse(item.dd_cd);
                      }}
                      value={`${item.dd_img}`}
                    ></TextField>
                  </TableCell>
                  <TableCell>
                    <TextField
                      onChange={(e) =>
                        handleChange(index, "dd_desc", e.target.value)
                      }
                      value={`${item.dd_desc}`}
                    ></TextField>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Box display="flex" flexDirection="column" gap={2}>
          <button>+</button>
          {DetailDateCourse.map((item, index) => (
            <Grid item key={index} mr={5}>
              <Card sx={{ background: "pink", border: 2, borderColor: "red" }}>
                <Box display={"flex"}>
                  <CardMedia>
                    <span>이미지등록해라</span>
                    <button
                      style={{
                        backgroundColor: "#f29bb8",
                        color: "white",
                        borderRadius: "8px",
                        borderColor: "white",
                      }}
                    >
                      이미지 등록
                    </button>
                  </CardMedia>

                  <CardContent>
                    <button
                      onClick={() => {
                        setDcCd(item.dc_cd);
                        onDetailDelete();
                      }}
                    >
                      x
                    </button>
                    <Box sx={{ background: "white" }}>
                      <Typography>제목:{item.dc_title}</Typography>

                      <Typography>{item.dc_desc}</Typography>
                    </Box>
                    <Box display="flex">
                      <label>총 가격:{}</label>
                      <input type="text" value={222}></input>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
