import { apiInstance } from "./common/axiosInstance";
import { CommonResponse } from "./interfaces/Common";
import { CommonCodeItems } from "./interfaces/CommonCode";

export async function getCommonCodeItems(
  cmGrpCd: string
): Promise<CommonResponse<CommonCodeItems[]>> {
  try {
    const response = await apiInstance.post("/commoncode/getCommonCodeItems", {
      cmGrpCd,
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
    console.error("getCommonCodeItems Error:", error);
    return {
      ok: false,
      message: "서버 오류 또는 네트워크 문제로 데이터를 불러오지 못했습니다.",
    };
  }
}
