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

export function isPasswordCharsetValid(password: string): boolean {
  return PASSWORD_CHARSET_REGEX.test(password);
}

export function isPasswordValid(password: string): boolean {
  return (
    password.length >= PASSWORD_MIN_LENGTH && isPasswordCharsetValid(password)
  );
}

export function validateSignUpFieldOnBlur(
  field: SignUpField,
  values: SignUpFormValues,
): string | undefined {
  switch (field) {
    case "email": {
      const email = values.email.trim();
      if (!email) return SIGNUP_ERROR_MESSAGES.emailRequired;
      if (!EMAIL_REGEX.test(email)) return SIGNUP_ERROR_MESSAGES.emailInvalid;
      return undefined;
    }
    case "nickname": {
      const nickname = values.nickname.trim();
      if (!nickname) return SIGNUP_ERROR_MESSAGES.nicknameRequired;
      if (nickname.length > NICKNAME_MAX_LENGTH) {
        return SIGNUP_ERROR_MESSAGES.nicknameMaxLength;
      }
      return undefined;
    }
    case "password": {
      if (!values.password) return SIGNUP_ERROR_MESSAGES.passwordRequired;
      if (values.password.length < PASSWORD_MIN_LENGTH) {
        return SIGNUP_ERROR_MESSAGES.passwordMinLength;
      }
      if (!isPasswordCharsetValid(values.password)) {
        return SIGNUP_ERROR_MESSAGES.passwordCharset;
      }
      return undefined;
    }
    case "passwordConfirmation": {
      if (!values.passwordConfirmation) {
        return SIGNUP_ERROR_MESSAGES.passwordConfirmRequired;
      }
      if (values.password !== values.passwordConfirmation) {
        return SIGNUP_ERROR_MESSAGES.passwordMismatch;
      }
      return undefined;
    }
    default:
      return undefined;
  }
}

export function validateSignUpForm(values: SignUpFormValues): SignUpFieldErrors {
  const errors: SignUpFieldErrors = {};
  const fields: SignUpField[] = [
    "email",
    "nickname",
    "password",
    "passwordConfirmation",
  ];

  fields.forEach((field) => {
    const message = validateSignUpFieldOnBlur(field, values);
    if (message) errors[field] = message;
  });

  return errors;
}

export function hasFieldErrors(errors: SignUpFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function isSignUpFormReady(values: SignUpFormValues): boolean {
  return !hasFieldErrors(validateSignUpForm(values));
}

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
    (includesAny(text, ["nickname", "닉네임"]) &&
      includesAny(text, ["이미", "중복", "사용중", "exist", "duplicate"]))
  );
}

export function extractSignUpApiMessage(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return undefined;
  const message = (data as ApiErrorBody).message;
  return typeof message === "string" && message.trim() ? message : undefined;
}

export function isLikelyNicknameDuplicateApiError(
  status: number,
  data: unknown,
): boolean {
  if (status !== 500) return false;
  const message = extractSignUpApiMessage(data)?.toLowerCase() ?? "";
  return message.includes("internal server error");
}

export function parseSignUpApiError(
  data: unknown,
  status?: number,
): SignUpFieldErrors {
  const errors: SignUpFieldErrors = {};
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
  if (
    !errors.nickname &&
    status &&
    isLikelyNicknameDuplicateApiError(status, data)
  ) {
    errors.nickname = SIGNUP_ERROR_MESSAGES.nicknameExists;
  }

  return errors;
}
