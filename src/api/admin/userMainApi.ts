import { apiInstance } from "../common/axiosInstance";
import { CommonResponse } from "../interfaces/Common";
import { UserRequest } from "../interfaces/AdminUser";

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
export async function deleteAdminUserItems(
  usId: string
): Promise<CommonResponse<UserRequest[]>> {
  try {
    const response = await apiInstance.post(
      "/admin/user/main/deleteAdminUserItems",
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
export async function updateAdminUserItems(
  selectedUser: UserRequest
): Promise<CommonResponse<number>> {
  try {
    const response = await apiInstance.post(
      "/admin/user/main/updateAdminUserItems",

      selectedUser
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
