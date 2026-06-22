import { SIGNUP_ERROR_MESSAGES, type SignUpFieldErrors } from "@/lib/validation/signup";

type ApiDetailItem = { message?: string };

type ApiErrorBody = {
  message?: string;
  error?: string;
  code?: string;
  details?: Record<string, string | string[] | ApiDetailItem>;
};

function includesAny(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some(
    (keyword) => lower.includes(keyword.toLowerCase()) || text.includes(keyword),
  );
}

function collectErrorTexts(data: unknown): string[] {
  if (!data || typeof data !== "object") return [];
  const body = data as ApiErrorBody;
  const texts: string[] = [];
  if (typeof body.message === "string") texts.push(body.message);
  if (typeof body.error === "string") texts.push(body.error);
  if (body.details && typeof body.details === "object") {
    Object.values(body.details).forEach((value) => {
      if (typeof value === "string") texts.push(value);
      if (value && typeof value === "object" && "message" in value) {
        const msg = (value as ApiDetailItem).message;
        if (typeof msg === "string") texts.push(msg);
      }
    });
  }
  return texts;
}

function isEmailConflictMessage(text: string): boolean {
  return (
    text.includes(SIGNUP_ERROR_MESSAGES.emailExists) ||
    text.includes("이미 사용중인 이메일") ||
    (includesAny(text, ["email", "이메일"]) &&
      includesAny(text, ["이미", "중복", "사용중", "exist", "duplicate"]))
  );
}

function isNicknameConflictMessage(text: string): boolean {
  return (
    text.includes(SIGNUP_ERROR_MESSAGES.nicknameExists) ||
    text.includes("이미 사용중인 닉네임") ||
    text.includes("이미 존재하는 닉네임") ||
    (includesAny(text, ["nickname", "닉네임"]) &&
      includesAny(text, ["이미", "중복", "사용중", "exist", "duplicate", "conflict"]))
  );
}

function canMapFieldErrorsFromApi(status?: number): boolean {
  if (status === undefined) return true;
  return status >= 400 && status < 500;
}

function applyDetailFieldErrors(
  body: ApiErrorBody,
  errors: SignUpFieldErrors,
  status?: number,
): void {
  if (!canMapFieldErrorsFromApi(status) || !body.details) return;

  const { details } = body;

  const emailDetail = details.email;
  if (emailDetail) {
    const text =
      typeof emailDetail === "string"
        ? emailDetail
        : (emailDetail as ApiDetailItem).message ?? "";
    if (isEmailConflictMessage(text)) {
      errors.email = SIGNUP_ERROR_MESSAGES.emailExists;
    }
  }

  const nicknameDetail = details.nickname;
  if (nicknameDetail) {
    const text =
      typeof nicknameDetail === "string"
        ? nicknameDetail
        : (nicknameDetail as ApiDetailItem).message ?? "";
    if (isNicknameConflictMessage(text)) {
      errors.nickname = SIGNUP_ERROR_MESSAGES.nicknameExists;
    }
  }
}

function extractApiMessage(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const message = (data as ApiErrorBody).message;
  return typeof message === "string" && message.trim() ? message : "";
}

export function getSignUpSubmitErrorMessage(
  data: unknown,
  status?: number,
): string {
  if (status !== undefined && status >= 500) {
    return SIGNUP_ERROR_MESSAGES.serverError;
  }

  const apiMessage = extractApiMessage(data);
  if (
    apiMessage &&
    !apiMessage.toLowerCase().includes("internal server error")
  ) {
    return apiMessage;
  }

  if (status !== undefined) {
    return `회원가입에 실패했습니다. (오류 코드: ${status})`;
  }

  return "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

export function parseSignUpApiError(
  data: unknown,
  status?: number,
): SignUpFieldErrors {
  const errors: SignUpFieldErrors = {};
  if (!canMapFieldErrorsFromApi(status)) {
    return errors;
  }

  const body =
    data && typeof data === "object" ? (data as ApiErrorBody) : undefined;
  const combined = collectErrorTexts(data).join(" ");

  if (isEmailConflictMessage(combined)) {
    errors.email = SIGNUP_ERROR_MESSAGES.emailExists;
  }

  if (isNicknameConflictMessage(combined)) {
    errors.nickname = SIGNUP_ERROR_MESSAGES.nicknameExists;
  }

  if (includesAny(combined, ["일치하지 않", "password mismatch"])) {
    errors.passwordConfirmation = SIGNUP_ERROR_MESSAGES.passwordMismatch;
  }

  if (body) {
    applyDetailFieldErrors(body, errors, status);
  }

  return errors;
}
