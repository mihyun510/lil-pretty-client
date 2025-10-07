import { apiInstance } from "./common/axiosInstance";
import { CommonResponse } from "@/api/interfaces/Common";
import { DateDtlItems } from "@/api/interfaces/DateDtl";
import { DateDtlReviews } from "./interfaces/DateDtlReviews";
import { DateDtlCourse } from "./interfaces/DateDtlCourse";
export async function getDateDtlItems(
  dmCd: string
): Promise<CommonResponse<DateDtlItems[]>> {
  try {
    const response = await apiInstance.post("/date/detail/getDateDtlItems", {
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
    console.error("getMst Error:", error);
    return {
      ok: false,
      message: "서버 오류 또는 네트워크 문제로 데이터를 불러오지 못했습니다.",
    };
  }
}
export async function getDateDtlReviews(
  ddCd: string
): Promise<CommonResponse<DateDtlReviews[]>> {
  try {
    const response = await apiInstance.post("date/detail/getDateDtlReviews", {
      ddCd,
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
    console.error("getMst Error:", error);
    return {
      ok: false,
      message: "서버 오류 또는 네트워크 문제로 데이터를 불러오지 못했습니다.",
    };
  }
}
export async function getDateDtlCourse(
  ddCd: string
): Promise<CommonResponse<DateDtlCourse[]>> {
  try {
    const response = await apiInstance.post("date/detail/getDateDtlCourse", {
      ddCd,
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
    console.error("getMst Error:", error);
    return {
      ok: false,
      message: "서버 오류 또는 네트워크 문제로 데이터를 불러오지 못했습니다.",
    };
  }
}
