import axios from "axios";
import { getAccessToken } from "@/lib/auth-token";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청 에러가 발생했을 때 처리
    return Promise.reject(error);
  },
);

// 3. Response 인터셉터 설정
instance.interceptors.response.use(
  (response) => {
    // 서버 응답이 성공(200번대)이면 데이터만 돌려줌
    return response;
  },
  (error) => {
    // 서버 에러(400번대, 500번대 등)가 났을 때 공통 처리
    if (error.response) {
      const status = error.response.status;

      // 로그인이 안 되어 있거나 만료된 경우 (401 에러)
      if (status === 401) {
        console.error("로그인이 필요하거나 만료되었어요.");
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
