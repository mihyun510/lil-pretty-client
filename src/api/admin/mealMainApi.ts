import { apiInstance } from "../common/axiosInstance";
import {
  CommonResponse,
  CUDCommonResponse,
  CUDFailItem,
} from "../interfaces/Common";
import { MealAdminItems } from "../interfaces/MealMst";

export async function getAdminMealItems(
  mmSubject: string,
  mmCategory: string
): Promise<CommonResponse<MealAdminItems[]>> {
  try {
    const response = await apiInstance.post(
      "/admin/meal/main/getAdminMealItems",
      {
        mmSubject,
        mmCategory,
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
    console.error("getAdminMealItems Error:", error);
    return {
      ok: false,
      message: "서버 오류 또는 네트워크 문제로 데이터를 불러오지 못했습니다.",
    };
  }
}

export async function deleteAdminMealItems(
  mmCdList: string[]
): Promise<CUDCommonResponse<CUDFailItem>> {
  try {
    const response = await apiInstance.post(
      "/admin/meal/main/deleteAdminMealItems",
      {
        mmCdList,
      }
    );

    return {
      successCount: response.data.successCount,
      failCount: response.data.failCount,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    console.error("deleteAdminMealItems Error:", error);
    return {
      successCount: 0,
      failCount: mmCdList.length,
      message: "서버 오류 또는 네트워크 문제로 삭제하지 못했습니다.",
    };
  }
}
