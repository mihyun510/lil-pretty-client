import { apiInstance } from "./common/axiosInstance";
import { CommonResponse } from "@/api/interfaces/Common";
import { MealDtlItems } from "@/api/interfaces/MealDtl";

export async function getMealDtlItems(
  mmCd: string
): Promise<CommonResponse<MealDtlItems[]>> {
  try {
    const response = await apiInstance.post("/diet/detail/getMealDtlItems", {
      mmCd,
    });

    if (response.data.ok && response.data.data) {
      return {
        ok: response.data.ok,
        data: response.data.data,
        message: response.data.message,
      };
    } else {
      return {
        ok: false,
        message: response.data.message || "데이터를 불러올 수 없습니다.",
      };
    }
  } catch (error) {
    console.error("getMealsByPrice Error:", error);
    return {
      ok: false,
      message: "서버 오류 또는 네트워크 문제로 데이터를 불러오지 못했습니다.",
    };
  }
}
