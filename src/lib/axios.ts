import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/lib/auth-token";

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processRefreshQueue(error: unknown, token: string | null = null) {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error || !token) {
      reject(error);
      return;
    }

    resolve(token);
  });
  refreshQueue = [];
}

function isAuthRequest(url: string) {
  return (
    url.includes("/auth/signIn") ||
    url.includes("/auth/signUp") ||
    url.includes("/auth/refresh-token")
  );
}

async function requestNewAccessToken(refreshToken: string): Promise<string> {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseURL) {
    throw new Error("API base URL is not configured");
  }

  const response = await axios.post<{ accessToken: string }>(
    `${baseURL}/auth/refresh-token`,
    { refreshToken },
    {
      headers: { "Content-Type": "application/json" },
      timeout: 5000,
    },
  );

  return response.data.accessToken;
}

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
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isAuthRequest(originalRequest.url ?? "")
    ) {
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearTokens();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return instance(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const accessToken = await requestNewAccessToken(refreshToken);
      setTokens(accessToken, refreshToken);
      processRefreshQueue(null, accessToken);
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return instance(originalRequest);
    } catch (refreshError) {
      processRefreshQueue(refreshError, null);
      clearTokens();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default instance;
