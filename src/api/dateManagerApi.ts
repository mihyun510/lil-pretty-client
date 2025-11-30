import { apiInstance } from "./common/axiosInstance";
import { CommonResponse } from "@/api/interfaces/Common";
import { DateDtlItems } from "./interfaces/DateDtl";
import { DateDtlCourse } from "./interfaces/DateDtlCourse";

//다이어트 존 코스
export async function getDateCourse(
  dmCd: string
): Promise<CommonResponse<DateDtlItems[]>> {
  try {
    const response = await apiInstance.post("/date/manager/getDateCourse", {
      dmCd,
    });
    if (response.data.ok && response.data.data) {
      return {
        data: response.data.data,
        ok: response.data.ok,
        message: response.data.message,
      };
    } else {
      return {
        ok: false,
        message: response.data.message || "데이터를 불러올 수 없습니다.",
      };
    }
  } catch (error) {
    console.log("getMst Error:", error);
    return {
      ok: false,
      message: "서버 오류 또는 네트워크 문제로 데이터를 불러오지 못했습니다.",
    };
  }
} //데이트 존 상세코스
export async function getDetailDateCourse(
  ddCd: string
): Promise<CommonResponse<DateDtlCourse[]>> {
  try {
    const response = await apiInstance.post(
      "/date/manager/getDetailDateCourse",
      {
        ddCd,
      }
    );
    if (response.data.ok && response.data.data) {
      return {
        data: response.data.data,
        ok: response.data.ok,
        message: response.data.message,
      };
    } else {
      return {
        ok: false,
        message: response.data.message || "데이터를 불러올 수 없습니다.",
      };
    }
  } catch (error) {
    console.log("getMst Error:", error);
    return {
      ok: false,
      message: "서버 오류 또는 네트워크 문제로 데이터를 불러오지 못했습니다.",
    };
  }
}
//다이어트 존 코스
export async function insertDateCourse(dmCd: string) {
  try {
    const response = await apiInstance.post("/date/manager/DateCourse", {
      dmCd,
    });
    if (response.data.ok && response.data.data) {
      return {
        data: response.data.data,
        ok: response.data.ok,
        message: response.data.message,
      };
    } else {
      return {
        ok: false,
        message: response.data.message || "데이터를 불러올 수 없습니다.",
      };
    }
  } catch (error) {
    console.log("getMst Error:", error);
    return {
      ok: false,
      message: "서버 오류 또는 네트워크 문제로 데이터를 불러오지 못했습니다.",
    };
  }
}
//데이트 코스 수정
export async function updateDateCourse(
  dmCd: string,
  DateCourse: DateDtlItems[]
) {
  try {
    console.log("dmCd::" + dmCd);
    console.log("DateCourse::" + DateCourse);
    await apiInstance.post("/date/manager/updateDateCourse", {
      dmCd: dmCd,
      DateCourse: DateCourse,
    });
  } catch (error) {
    console.log("getMst Error:", error);
  }
}
