/**
 * 토큰 저장/조회 (localStorage)
 * Epigram API는 응답 body로 토큰을 내려주므로 현재는 localStorage를 사용합니다.
 * httpOnly 쿠키 전환은 백엔드 Set-Cookie 지원이 필요합니다.
 */
const ACCESS_TOKEN_KEY = "epigram_access_token";
const REFRESH_TOKEN_KEY = "epigram_refresh_token";

export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
