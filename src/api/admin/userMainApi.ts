import { apiInstance } from "../common/axiosInstance";
import {
  CommonResponse,
  CUDCommonResponse,
  CUDFailItem,
} from "../interfaces/Common";
import { UserRequest } from "../interfaces/AdminUser";
/* ---------------- 사용자 권한 정보 조회 ---------------- */
export async function getAdminUserItems(
  usId: string
): Promise<CommonResponse<UserRequest[]>> {
  try {
    const response = await apiInstance.post(
      "/admin/user/main/getAdminUserItems",
      {
        usId,
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
/* ---------------- 사용자 권한 정보 단건 삭제 ---------------- */
export async function deleteAdminUserItems(
  usId: string
): Promise<CUDCommonResponse<CUDFailItem>> {
  try {
    const response = await apiInstance.post(
      "/admin/user/main/deleteAdminUserItems",
      {
        usId, //단일 삭제
      }
    );
    return {
      successCount: response.data.successCount,
      failCount: response.data.failCount,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    console.error("deleteAdminUserItems Error:", error);
    return {
      successCount: 0,
      failCount: 0,
      message: "서버 오류 또는 네트워크 문제로 삭제하지 못했습니다.",
    };
  }
}
/* ---------------- 사용자 권한 정보 수정---------------- */
export async function updateAdminUserItems(
  selectedUser: UserRequest
): Promise<CUDCommonResponse<CUDFailItem>> {
  try {
    const response = await apiInstance.post(
      "/admin/user/main/updateAdminUserItems",
      selectedUser
    );

    return {
      successCount: response.data.successCount,
      failCount: response.data.failCount,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    console.error("updateAdminUserItems Error:", error);
    return {
      successCount: 0,
      failCount: 0,
      message: "서버 오류 또는 네트워크 문제로 수정하지 못했습니다.",
    };
  }
}
/* ---------------- 사용자 권한 정보 추가---------------- */
export async function insertAdminUserItems(
  selectedUser: UserRequest
): Promise<CUDCommonResponse<CUDFailItem>> {
  try {
    const response = await apiInstance.post(
      "/admin/user/main/insertAdminUserItems",
      selectedUser
    );

    return {
      successCount: response.data.successCount,
      failCount: response.data.failCount,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    console.error("insertAdminUserItems Error:", error);
    return {
      successCount: 0,
      failCount: 0,
      message: "서버 오류 또는 네트워크 문제로 저장하지 못했습니다.",
    };
  }
}
