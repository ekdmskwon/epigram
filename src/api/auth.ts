import instance from "@/lib/axios";
import type { User } from "@/types/user";

export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const signUp = async (body: SignUpRequest): Promise<SignUpResponse> => {
  const response = await instance.post<SignUpResponse>(`/auth/signUp`, body);
  return response.data;
};

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const signIn = async (body: SignInRequest): Promise<SignInResponse> => {
  const response = await instance.post<SignInResponse>(`/auth/signIn`, body);
  return response.data;
};

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
