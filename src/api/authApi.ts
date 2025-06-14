import { authInstance } from "./common/axiosInstance";
import { CommonResponse } from "@/api/interfaces/Common";
import { UserRequest, UserResponse } from "@/api/interfaces/User";

//로그인
export async function loginUser(
  usId: string,
  usPw: string
): Promise<CommonResponse> {
  try {
    const response = await authInstance.post<UserResponse>("/login", {
      usId,
      usPw,
    });

    if (response.data.token && response.data.user) {
      // 로그인 성공 시, 사용자 정보와 토큰을 반환
      return {
        ok: true,
        data: response.data,
        message: response.data.message,
      };
    } else {
      // 인증 실패 시
      return {
        ok: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.error("SignIn Error:", error);
    return {
      ok: false,
      message: "Authentication failed",
    };
  }
}

//회원가입
export async function signup(
  user: Omit<UserRequest, "usRole" | "token">
): Promise<CommonResponse> {
  try {
    // Send request
    const response = await authInstance.post("/save/user", user);
    return {
      ok: true,
      message: response.data,
    };
  } catch {
    return {
      ok: false,
      message: "Failed to create account",
    };
  }
}
