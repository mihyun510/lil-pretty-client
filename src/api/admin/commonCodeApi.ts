import { apiInstance } from "../common/axiosInstance";
import { CommonCodeItems, CommonCodeId } from "../interfaces/AdminCommonCode";
import {
  CommonResponse,
  CUDCommonResponse,
  CUDFailItem,
} from "../interfaces/Common";
/* ----------------공통코드  조회 ----------------- */
export async function getAdminCommonCodeItems(
  grpNm: string
): Promise<CommonResponse<CommonCodeItems[]>> {
  try {
    const response = await apiInstance.post(
      "/admin/commcode/main/getAdminCommonCodeItems",

      { cmGrpNm: grpNm }
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
    console.error("getMst Error:", error);
    return {
      ok: false,
      message: "서버 오류 또는 네트워크 문제로 데이터를 불러오지 못했습니다.",
    };
  }
}
/* ----------------공통코드 삭제 ----------------- */
export async function deleteAdminCommCodeItems(
  grpCdList: CommonCodeId[]
): Promise<CUDCommonResponse<CUDFailItem>> {
  try {
    const response = await apiInstance.post(
      "/admin/commcode/main/deleteAdminCommCodeItems",
      {
        grpCdList,
      }
    );

    return {
      successCount: response.data.successCount,
      failCount: response.data.failCount,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    console.error("deleteAdminCommCodeItems Error:", error);
    return {
      successCount: 0,
      failCount: grpCdList.length,
      message: "서버 오류 또는 네트워크 문제로 삭제하지 못했습니다.",
    };
  }
}
/* ----------------공통코드 저장 ----------------- */
export async function saveAdminCommCodeItems(
  newCommCodeItem: CommonCodeItems[]
): Promise<CUDCommonResponse<CUDFailItem>> {
  try {
    const response = await apiInstance.post(
      "/admin/commcode/main/saveAdminCommCodeItems",

      newCommCodeItem
    );

    return {
      successCount: response.data.successCount,
      failCount: response.data.failCount,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    console.error("insertAdminCommCodeItems Error:", error);
    return {
      successCount: 0,
      failCount: 0,
      message: "서버 오류 또는 네트워크 문제로 삭제하지 못했습니다.",
    };
  }
}
