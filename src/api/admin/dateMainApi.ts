import { apiInstance } from "../common/axiosInstance";

import { CommonResponse } from "@/api/interfaces/Common";

import { DateDtlItems } from "../interfaces/DateDtl";

import { DateDtlCourse } from "../interfaces/DateDtlCourse";

//다이어트 존 코스

export async function getDateCourse(
  dmCd: string,
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

export async function getDateCourseDetailItems(
  ddCd: string,
): Promise<CommonResponse<DateDtlCourse[]>> {
  try {
    const response = await apiInstance.post(
      "/date/manager/getDateCourseDetailItems",

      {
        ddCd,
      },
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

export async function updateDateCourse(
  dmCd: string,

  DateCourse: DateDtlItems[],
) {
  try {
    // 🚩 아래처럼 객체 구조를 명확히 해서 보내야 합니다.

    const response = await apiInstance.post("/date/manager/saveDateCourse", {
      dmCd: dmCd, // dmCd 키

      DateCourse: DateCourse, // DateCourse 키 (백엔드가 이걸 찾음)
    });

    return response.data;
  } catch (error) {
    console.log("Update Error:", error);

    return { ok: false };
  }
}

//데이트 코스 삭제

export async function deleteDateCourse(ddCd: string) {
  try {
    console.log("ddCd::" + ddCd);

    const response = await apiInstance.post("/date/manager/deleteDateCourse", {
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
    console.log("getMst Error:", error);
  }
}

//데이트 상세 코스 삭제

export async function deleteDetailDateCourse(dcCd: string) {
  try {
    console.log("ddCd::" + dcCd);

    const response = await apiInstance.post(
      "/date/manager/deleteDetailDateCourse",

      {
        dcCd,
      },
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
  }
}
export async function saveTotalDateCourse(
  dmCd: string,
  dateCourseList: any[], // 상세 정보(detailList)가 포함된 배열
): Promise<CommonResponse<any>> {
  try {
    const response = await apiInstance.post("/date/manager/saveDateCourse", {
      dmCd: dmCd,
      DateCourse: dateCourseList,
    });
    return response.data;
  } catch (error) {
    console.error("Save Error:", error);
    return { ok: false, message: "저장 중 네트워크 오류가 발생했습니다." };
  }
}
