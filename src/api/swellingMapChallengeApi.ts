import { apiInstance } from "./common/axiosInstance";
import { CommonResponse } from "@/api/interfaces/Common";
import { WaterDailyItem } from "./interfaces/WaterDaily";

export async function getWaterDailyItem(
  wdDate: string
): Promise<CommonResponse<WaterDailyItem>> {
  try {
    const response = await apiInstance.post(
      "/swellingMap/challenge/getWaterDailyItem",
      {
        wdDate,
      }
    );

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

/**
 * 💧 물 섭취 데이터 저장 API
 */
export async function saveWaterDailyItem(
  waterDailyItem: WaterDailyItem
): Promise<CommonResponse<WaterDailyItem>> {
  try {
    const response = await apiInstance.post(
      "/swellingMap/challenge/saveWaterDailyItem",
      {
        wdCd: waterDailyItem.wd_cd,
        usId: waterDailyItem.us_id,
        wdDate: waterDailyItem.wd_date,
        wdMl: waterDailyItem.wd_ml,
      }
    );

    if (response.data.ok) {
      return {
        ok: true,
        data: response.data.data,
        message: response.data.message || "기록이 저장되었습니다.",
      };
    } else {
      return {
        ok: false,
        message: response.data.message || "기록 저장에 실패했습니다.",
      };
    }
  } catch (error) {
    console.error("insertWaterDailyItem Error:", error);
    return {
      ok: false,
      message: "서버 오류 또는 네트워크 문제로 기록 저장에 실패했습니다.",
    };
  }
}
