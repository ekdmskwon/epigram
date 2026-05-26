import instance from "@/lib/axios"; 

interface OauthAppConfig {
  appKey: string;
  appSecret?: string;
}

export interface RegisterOauthAppsRequest {
  google?: OauthAppConfig;
  kakao?: OauthAppConfig;
  naver?: OauthAppConfig;
}

export interface OauthAppResponse {
  id: number;
  teamId: string;
  provider: 'GOOGLE' | 'NAVER' | 'KAKAO';
  appKey: string;
  appSecret: string | null;
  createdAt: string;
  updatedAt: string;
}

// POST /oauthApps : 간편 로그인 App 등록/수정 API 함수
export const registerOauthApps = async (
  body: RegisterOauthAppsRequest
): Promise<OauthAppResponse[]> => {
  const response = await instance.post<OauthAppResponse[]>('/oauthApps', body);
  return response.data;
};