import axios from "axios";

type ApiErrorBody = {
  message?: string;
  details?: Record<string, { message?: string; value?: unknown }>;
};

export function getEpigramSubmitErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "서버에 연결할 수 없습니다. API 주소를 확인한 뒤 다시 시도해주세요.";
    }

    const { status, data } = error.response;
    const body = data as ApiErrorBody;

    if (status === 401) {
      return "로그인이 만료되었습니다. 다시 로그인해주세요.";
    }

    if (status >= 500) {
      if (body.message === "Internal Server Error") {
        return "출처 URL이 너무 길거나 서버에서 처리할 수 없는 값입니다. URL 길이와 형식을 확인해주세요.";
      }
      return "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    }

    if (body.details) {
      const detailMessage = Object.values(body.details).find(
        (detail) => detail.message,
      )?.message;

      if (detailMessage) {
        if (detailMessage.includes("https?://")) {
          return "http:// 또는 https://로 시작하는 유효한 URL을 입력해주세요.";
        }
        return detailMessage;
      }
    }

    if (body.message && body.message !== "Validation Failed") {
      return body.message;
    }

    if (status === 400) {
      return "입력값을 확인해주세요.";
    }
  }

  return "에피그램 저장에 실패했습니다. 잠시 후 다시 시도해주세요.";
}
