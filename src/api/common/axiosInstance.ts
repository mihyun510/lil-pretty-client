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

// 요청 인터셉터 (Request Interceptor)
apiInstance.interceptors.request.use(
  (config) => {
    // 로컬스토리지에서 토큰 가져오기
    const token = localStorage.getItem("token");

    // 토큰이 있으면 Authorization 헤더에 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth 서버를 위한 인스턴스
const authInstance = axios.create({
  baseURL: AUTH_URL, // Auth 기본 URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 인터셉터 (Response Interceptor)
apiInstance.interceptors.response.use(
  (response) => response, // 정상 응답 그대로 반환
  (error) => {
    if (error.response) {
      // 401(Unauthorized) 에러 발생 시 로그아웃 처리
      if (error.response.status === 401) {
        console.error("인증이 만료되었습니다. 다시 로그인하세요.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // 로그인 페이지로 리디렉션
      }
    }
    return Promise.reject(error);
  }
);

export { apiInstance, authInstance };
