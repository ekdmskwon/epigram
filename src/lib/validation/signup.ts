import { z } from "zod";

export const SIGNUP_ERROR_MESSAGES = {
  emailRequired: "이메일은 필수 입력입니다.",
  emailInvalid: "이메일 형식으로 작성해 주세요.",
  emailExists: "이미 존재하는 이메일입니다.",
  nicknameRequired: "닉네임은 필수 입력입니다.",
  nicknameMaxLength: "닉네임은 최대 20자까지 가능합니다.",
  nicknameExists: "이미 존재하는 닉네임입니다.",
  passwordRequired: "비밀번호는 필수 입력입니다.",
  passwordMinLength: "비밀번호는 최소 8자 이상입니다.",
  passwordCharset: "비밀번호는 숫자, 영문, 특수문자로만 가능합니다.",
  passwordConfirmRequired: "비밀번호 확인을 입력해주세요.",
  passwordMismatch: "비밀번호가 일치하지 않습니다.",
  serverError: "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_CHARSET_REGEX =
  /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
const NICKNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;

export type SignUpField =
  | "email"
  | "nickname"
  | "password"
  | "passwordConfirmation";

export type SignUpFieldErrors = Partial<Record<SignUpField, string>>;

export type SignUpFormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
};

export const signUpSchema = z
  .object({
    email: z
      .string()
      .transform((value) => value.trim())
      .pipe(
        z
          .string()
          .min(1, SIGNUP_ERROR_MESSAGES.emailRequired)
          .refine((value) => EMAIL_REGEX.test(value), {
            message: SIGNUP_ERROR_MESSAGES.emailInvalid,
          }),
      ),
    nickname: z
      .string()
      .transform((value) => value.trim())
      .pipe(
        z
          .string()
          .min(1, SIGNUP_ERROR_MESSAGES.nicknameRequired)
          .max(NICKNAME_MAX_LENGTH, SIGNUP_ERROR_MESSAGES.nicknameMaxLength),
      ),
    password: z
      .string()
      .min(1, SIGNUP_ERROR_MESSAGES.passwordRequired)
      .min(PASSWORD_MIN_LENGTH, SIGNUP_ERROR_MESSAGES.passwordMinLength)
      .refine((value) => PASSWORD_CHARSET_REGEX.test(value), {
        message: SIGNUP_ERROR_MESSAGES.passwordCharset,
      }),
    passwordConfirmation: z
      .string()
      .min(1, SIGNUP_ERROR_MESSAGES.passwordConfirmRequired),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    message: SIGNUP_ERROR_MESSAGES.passwordMismatch,
    path: ["passwordConfirmation"],
  });

export function validateSignUpFieldOnBlur(
  field: SignUpField,
  values: SignUpFormValues,
): string {
  if (field === "passwordConfirmation") {
    if (!values.passwordConfirmation) {
      return SIGNUP_ERROR_MESSAGES.passwordConfirmRequired;
    }
    if (values.password !== values.passwordConfirmation) {
      return SIGNUP_ERROR_MESSAGES.passwordMismatch;
    }
    return "";
  }

  const result = signUpSchema.shape[field].safeParse(values[field]);
  if (result.success) return "";
  return result.error.issues[0]?.message ?? "";
}

export function validateSignUpForm(values: SignUpFormValues): SignUpFieldErrors {
  const result = signUpSchema.safeParse(values);
  if (result.success) return {};

  const errors: SignUpFieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (
      field === "email" ||
      field === "nickname" ||
      field === "password" ||
      field === "passwordConfirmation"
    ) {
      errors[field] = issue.message;
    }
  }
  return errors;
}

export function hasFieldErrors(errors: SignUpFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function isSignUpFormReady(values: SignUpFormValues): boolean {
  return signUpSchema.safeParse(values).success;
}
