import { apiInstance } from "./common/axiosInstance";
import { CommonResponse } from "@/api/interfaces/Common";
import { MealRecItems } from "@/api/interfaces/MealRec";

export async function getMealRecItems(): Promise<
  CommonResponse<MealRecItems[]>
> {
  try {
    const response = await apiInstance.post("/diet/main/mealRecItems");

    if (response.data.ok && response.data.data) {
      return {
        ok: response.data.ok,
        data: response.data.data,
        message: response.data.message,
      };
    } else {
      return {
        ok: false,
        message: response.data.message || "인증 정보가 유효하지 않습니다.",
      };
    }
  } catch (error) {
    console.error("SignIn Error:", error);
    return {
      ok: false,
      message: "서버 오류 또는 네트워크 문제로 로그인에 실패했습니다.",
    };
  }
}
