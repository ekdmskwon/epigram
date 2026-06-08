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

export function validateLoginFieldOnBlur(
  field: LoginField,
  values: LoginFormValues,
): string | undefined {
  switch (field) {
    case "email": {
      const email = values.email.trim();
      if (!email) return LOGIN_ERROR_MESSAGES.emailRequired;
      if (!EMAIL_REGEX.test(email)) return LOGIN_ERROR_MESSAGES.emailInvalid;
      return undefined;
    }
    case "password": {
      if (!values.password) return LOGIN_ERROR_MESSAGES.passwordRequired;
      return undefined;
    }
    default:
      return undefined;
  }
}

export function validateLoginForm(values: LoginFormValues): LoginFieldErrors {
  const errors: LoginFieldErrors = {};
  (["email", "password"] as LoginField[]).forEach((field) => {
    const message = validateLoginFieldOnBlur(field, values);
    if (message) errors[field] = message;
  });
  return errors;
}

export function hasLoginFieldErrors(errors: LoginFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function isLoginFormReady(values: LoginFormValues): boolean {
  return !hasLoginFieldErrors(validateLoginForm(values));
}
