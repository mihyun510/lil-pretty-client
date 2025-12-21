import { apiInstance } from "../common/axiosInstance";
import {
  CommonResponse,
  CUDCommonResponse,
  CUDFailItem,
} from "../interfaces/Common";
import { MealAdminDtlItem } from "../interfaces/MealDtl";
import { MealAdminMstItem } from "../interfaces/MealMst";

export async function getAdminMealItem(
  mmCd: string
): Promise<CommonResponse<MealAdminMstItem>> {
  try {
    const response = await apiInstance.post(
      "/admin/meal/detail/getMealMstItem",
      {
        mmCd,
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
    console.error("getAdminMealItem Error:", error);
    return {
      ok: false,
      message: "서버 오류 또는 네트워크 문제로 데이터를 불러오지 못했습니다.",
    };
  }
}
export async function getAdminMealDtlItems(
  mmCd: string
): Promise<CommonResponse<MealAdminDtlItem[]>> {
  try {
    const response = await apiInstance.post(
      "/admin/meal/detail/getAdminMealDtlItems",
      {
        mmCd,
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
    console.error("getAdminMealItem Error:", error);
    return {
      ok: false,
      message: "서버 오류 또는 네트워크 문제로 데이터를 불러오지 못했습니다.",
    };
  }
}
