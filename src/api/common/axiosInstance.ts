import axios from "axios";

// 기본 API URL 설정
const API_URL = "http://localhost:8080/api";
const AUTH_URL = "http://localhost:8080/auth";

// Axios 인스턴스 생성
const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth 서버를 위한 인스턴스
const authInstance = axios.create({
  baseURL: AUTH_URL, // Auth 기본 URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (Request Interceptor)
apiInstance.interceptors.request.use(
  (config) => {
    // 로컬스토리지에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");

    // 토큰이 있으면 Authorization 헤더에 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (Response Interceptor)
interface FailedQueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiInstance.interceptors.response.use(
  (response) => response, // 정상 응답 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // AccessToken 만료로 401 발생한 경우
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // 이미 Refresh 진행 중이라면 큐에 대기
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("Refresh Token 없음");
        }

        // 🔥 Refresh API 호출
        const res = await authInstance.post("/refresh", {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;

        // 새로운 Access Token 저장
        localStorage.setItem("accessToken", newAccessToken);

        // 큐에 대기 중인 요청들 처리
        processQueue(null, newAccessToken);

        // 다시 요청 시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // 모든 토큰 제거 후 로그인 페이지로 이동
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // if (error.response) {
    //   // 401(Unauthorized) 에러 발생 시 로그아웃 처리
    //   if (error.response.status === 401) {
    //     console.error("인증이 만료되었습니다. 다시 로그인하세요.");
    //     localStorage.removeItem("accessToken");
    //     window.location.href = "/"; // 인트로페이지
    //   }
    // }
    return Promise.reject(error);
  }
);

export { apiInstance, authInstance };
