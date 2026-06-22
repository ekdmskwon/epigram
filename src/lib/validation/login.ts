import { z } from "zod";

export const LOGIN_ERROR_MESSAGES = {
  emailRequired: "이메일은 필수 입력입니다.",
  emailInvalid: "이메일 형식으로 작성해 주세요.",
  passwordRequired: "비밀번호는 필수 입력입니다.",
  invalidCredentials: "이메일 혹은 비밀번호를 확인해주세요.",
  serverError: "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LoginField = "email" | "password";

export type LoginFieldErrors = Partial<Record<LoginField, string>>;

export type LoginFormValues = {
  email: string;
  password: string;
};

export const loginSchema = z.object({
  email: z
    .string()
    .transform((value) => value.trim())
    .pipe(
      z
        .string()
        .min(1, LOGIN_ERROR_MESSAGES.emailRequired)
        .refine((value) => EMAIL_REGEX.test(value), {
          message: LOGIN_ERROR_MESSAGES.emailInvalid,
        }),
    ),
  password: z.string().min(1, LOGIN_ERROR_MESSAGES.passwordRequired),
});

export function validateLoginField(
  field: LoginField,
  values: LoginFormValues,
): string {
  const result = loginSchema.shape[field].safeParse(values[field]);
  if (result.success) return "";
  return result.error.issues[0]?.message ?? "";
}

export function validateLoginForm(values: LoginFormValues): LoginFieldErrors {
  const result = loginSchema.safeParse(values);
  if (result.success) return {};

  const errors: LoginFieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (field === "email" || field === "password") {
      errors[field] = issue.message;
    }
  }
  return errors;
}

export function hasLoginFieldErrors(errors: LoginFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function isLoginFormReady(values: LoginFormValues): boolean {
  return loginSchema.safeParse(values).success;
}

export function getLoginSubmitErrorMessage(
  data: unknown,
  status?: number,
): string {
  if (status !== undefined && status >= 500) {
    return LOGIN_ERROR_MESSAGES.serverError;
  }

  const message =
    data && typeof data === "object" && typeof (data as { message?: string }).message === "string"
      ? (data as { message: string }).message
      : "";

  if (message.trim()) return message;

  if (status !== undefined) {
    return `로그인에 실패했습니다. (오류 코드: ${status})`;
  }

  return "로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}
