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
    const { accessToken, refreshToken, user, message } = response.data;

    if (accessToken && refreshToken && user) {
      // 로그인 성공 시, 사용자 정보와 토큰을 반환
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setLoggedIn(true);
      setUser(user);

      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
        message: message,
      };
    } else {
      // 인증 실패 시
      return {
        message: message || "인증 정보가 유효하지 않습니다.",
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
