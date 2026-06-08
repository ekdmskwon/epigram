const ACCESS_TOKEN_KEY = "epigram_access_token";
const REFRESH_TOKEN_KEY = "epigram_refresh_token";
const USER_NICKNAME_KEY = "epigram_user_nickname";
const USER_IMAGE_KEY = "epigram_user_image";

export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function setUserProfile(nickname: string, image: string | null): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_NICKNAME_KEY, nickname);
  if (image) {
    localStorage.setItem(USER_IMAGE_KEY, image);
  } else {
    localStorage.removeItem(USER_IMAGE_KEY);
  }
}

export function getUserProfile(): {
  nickname: string | null;
  image: string | null;
} {
  if (typeof window === "undefined") {
    return { nickname: null, image: null };
  }

  return {
    nickname: localStorage.getItem(USER_NICKNAME_KEY),
    image: localStorage.getItem(USER_IMAGE_KEY),
  };
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
  localStorage.removeItem(USER_NICKNAME_KEY);
  localStorage.removeItem(USER_IMAGE_KEY);
}
