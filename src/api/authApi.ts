import { authInstance } from "./common/axiosInstance";
import { CommonResponse } from "@/api/interfaces/Common";
import { UserRequest, UserResponse } from "@/api/interfaces/User";
import { useAuthStore } from "@/store/useAuthStore";

//로그인
export async function login(usId: string, usPw: string): Promise<UserResponse> {
  try {
    const response = await authInstance.post<UserResponse>("/login", {
      usId,
      usPw,
    });

    const { setLoggedIn, setUser } = useAuthStore.getState();

    if (response.data.token && response.data.user) {
      // 로그인 성공 시, 사용자 정보와 토큰을 반환
      localStorage.setItem("accessToken", response.data.token);
      setLoggedIn(true);
      setUser(response.data.user);

      return {
        token: response.data.token,
        user: response.data.user,
        message: response.data.message,
      };
    } else {
      // 인증 실패 시
      return {
        message: response.data.message || "인증 정보가 유효하지 않습니다.",
      };
    }
  } catch (error) {
    console.error("SignIn Error:", error);
    return {
      message: "서버 오류 또는 네트워크 문제로 로그인에 실패했습니다.",
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
