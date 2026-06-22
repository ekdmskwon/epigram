"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import GuestHeader from "@/components/header/GuestHeader";
import Input from "@/components/input";
import { signIn } from "@/api/auth";
import { getUserMe } from "@/api/user";
import {
  clearTokens,
  getAccessToken,
  setTokens,
  setUserProfile,
} from "@/lib/auth-token";
import {
  getLoginSubmitErrorMessage,
  hasLoginFieldErrors,
  isLoginFormReady,
  LOGIN_ERROR_MESSAGES,
  validateLoginField,
  validateLoginForm,
  type LoginField,
  type LoginFieldErrors,
  type LoginFormValues,
} from "@/lib/validation/login";
import * as S from "./styles";

const INITIAL_FORM_DATA: LoginFormValues = {
  email: "",
  password: "",
};

const ALL_LOGIN_FIELDS_BLURRED: Record<LoginField, boolean> = {
  email: true,
  password: true,
};

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormValues>(INITIAL_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [passwordErrorState, setPasswordErrorState] = useState(false);
  const [blurredFields, setBlurredFields] = useState<
    Partial<Record<LoginField, boolean>>
  >({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    getUserMe()
      .then(() => {
        router.replace("/");
      })
      .catch(() => {
        clearTokens();
      });
  }, [router]);

  const canSubmit = isLoginFormReady(formData);

  const getDisplayError = (field: LoginField) =>
    blurredFields[field] ? fieldErrors[field] : undefined;

  const updateField = (field: LoginField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFieldBlur = (field: LoginField) => {
    setBlurredFields((prev) => ({ ...prev, [field]: true }));
    const message = validateLoginField(field, formData);
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
    if (field === "password") {
      setPasswordErrorState(false);
    }
  };

  const clearFieldError = (field: LoginField) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setPasswordErrorState(false);
  };

  const applyInvalidCredentialsError = () => {
    setFieldErrors({
      email: LOGIN_ERROR_MESSAGES.invalidCredentials,
    });
    setPasswordErrorState(true);
    setBlurredFields(ALL_LOGIN_FIELDS_BLURRED);
    setSubmitError("");
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setPasswordErrorState(false);
    setBlurredFields(ALL_LOGIN_FIELDS_BLURRED);

    const errors = validateLoginForm(formData);
    if (hasLoginFieldErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const { accessToken, refreshToken, user } = await signIn({
        email: formData.email.trim(),
        password: formData.password,
      });

      setTokens(accessToken, refreshToken);
      setUserProfile(user.nickname, user.image);
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          setSubmitError(
            "서버에 연결할 수 없습니다. API 주소를 확인한 뒤 개발 서버를 다시 실행해주세요.",
          );
          return;
        }

        const { status, data } = error.response;

        if (status >= 500) {
          setSubmitError(LOGIN_ERROR_MESSAGES.serverError);
          return;
        }

        if (status === 400 || status === 401) {
          applyInvalidCredentialsError();
          return;
        }

        setSubmitError(getLoginSubmitErrorMessage(data, status));
        return;
      }

      setSubmitError("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.LoginPageContainer>
      <GuestHeader />

      <S.LoginMain>
        <S.FormWrapper onSubmit={handleLoginSubmit} noValidate>
          <S.LogoWrapper>
            <Image
              src="/icons/logo-black.svg"
              alt="Epigram 로고"
              width={172}
              height={48}
              priority
            />
          </S.LogoWrapper>

          <S.FormFields>
            <Input
              type="email"
              placeholder="이메일"
              $size="lg"
              $appearance="outlined"
              autoComplete="email"
              value={formData.email}
              errorMessage={getDisplayError("email")}
              onBlur={() => handleFieldBlur("email")}
              onChange={(e) => {
                updateField("email", e.target.value);
                clearFieldError("email");
                setSubmitError("");
              }}
            />

            <Input
              type="password"
              placeholder="비밀번호"
              $size="lg"
              $appearance="outlined"
              autoComplete="current-password"
              value={formData.password}
              errorMessage={getDisplayError("password")}
              showErrorState={passwordErrorState}
              onBlur={() => handleFieldBlur("password")}
              onChange={(e) => {
                updateField("password", e.target.value);
                clearFieldError("password");
              }}
            />
          </S.FormFields>

          {submitError && <S.FormError role="alert">{submitError}</S.FormError>}

          <S.ButtonWrapper>
            <S.LoginButton
              type="submit"
              $ready={canSubmit && !isSubmitting}
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? "로그인 중..." : "로그인"}
            </S.LoginButton>
          </S.ButtonWrapper>

          <S.SignUpLinkRow>
            회원이 아니신가요?{" "}
            <Link href="/signup">
              <S.SignUpLinkText>가입하기</S.SignUpLinkText>
            </Link>
          </S.SignUpLinkRow>
        </S.FormWrapper>
      </S.LoginMain>
    </S.LoginPageContainer>
  );
}
