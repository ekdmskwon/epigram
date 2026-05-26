import instance from "@/lib/axios";
import { OauthProvider } from "./oauth";

// 회원가입 API
export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  teamId: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SignUpResponse {
  accessToken: string;
  refreshToke: string;
  user: UserInfo;
}

export const signUp = async (body: SignUpRequest): Promise<SignUpResponse> => {
  const response = await instance.post<SignUpResponse>(`/auth/signUp`, body);
  return response.data;
};

// 로그인 API
export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}

export const signIn = async (body: SignInRequest): Promise<SignInResponse> => {
  const response = await instance.post<SignInResponse>(`/auth/signIn`, body);
  return response.data;
};

// 토큰 갱신 API
export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export const refreshAccessToken = async (
  body: RefreshTokenRequest,
): Promise<RefreshTokenResponse> => {
  const response = await instance.post<RefreshTokenResponse>(
    `/auth/refresh-token`,
    body,
  );
  return response.data;
};

// OAuth 간편 로그인 전용 API
export interface OauthSignInRequest {
  state?: string;
  redirectUri: string;
}

export const oauthSignIn = async (
  provider: OauthProvider,
  body: OauthSignInRequest,
): Promise<SignInResponse> => {
  const response = await instance.post<SignInResponse>(
    `/auth/signIn/${provider}`,
    body,
  );
  return response.data;
};
