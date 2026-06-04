"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import GuestHeader from "@/components/header/GuestHeader";
import Input from "@/components/input";
import { Button } from "@/components/button";
import { signUp } from "@/api/auth";
import { setTokens } from "@/lib/auth-token";
import {
  getSignUpSubmitErrorMessage,
  hasFieldErrors,
  isSignUpFormReady,
  parseSignUpApiError,
  validateSignUpFieldOnBlur,
  validateSignUpForm,
  type SignUpField,
  type SignUpFieldErrors,
} from "@/lib/validation/signup";
import * as S from "./styled";

const SIGNUP_FIELDS: SignUpField[] = [
  "email",
  "password",
  "passwordConfirmation",
  "nickname",
];

const ALL_SIGNUP_FIELDS_TOUCHED = SIGNUP_FIELDS.reduce(
  (acc, field) => {
    acc[field] = true;
    return acc;
  },
  {} as Record<SignUpField, boolean>,
);

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [nickname, setNickname] = useState("");
  const [fieldErrors, setFieldErrors] = useState<SignUpFieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<SignUpField, boolean>>>(
    {},
  );
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formValues = useMemo(
    () => ({
      email,
      password,
      passwordConfirmation,
      nickname,
    }),
    [email, password, passwordConfirmation, nickname],
  );

  const canSubmit = isSignUpFormReady(formValues);

  const getDisplayError = (field: SignUpField) =>
    touched[field] ? fieldErrors[field] : undefined;

  const handleFieldBlur = (field: SignUpField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const message = validateSignUpFieldOnBlur(field, formValues);
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  };

  const clearFieldError = (field: SignUpField) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    setTouched(ALL_SIGNUP_FIELDS_TOUCHED);

    const errors = validateSignUpForm(formValues);
    if (hasFieldErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const { accessToken, refreshToken } = await signUp({
        email: email.trim(),
        password,
        passwordConfirmation,
        nickname: nickname.trim(),
      });

      setTokens(accessToken, refreshToken);
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          setSubmitError(
            "서버에 연결할 수 없습니다. API 주소를 확인한 뒤 개발 서버를 다시 실행해주세요.",
          );
          return;
        }

        const apiFieldErrors = parseSignUpApiError(
          error.response.data,
          error.response.status,
        );

        if (hasFieldErrors(apiFieldErrors)) {
          setFieldErrors(apiFieldErrors);
          setTouched(ALL_SIGNUP_FIELDS_TOUCHED);
          setSubmitError("");
          return;
        }

        setSubmitError(
          getSignUpSubmitErrorMessage(
            error.response.data,
            error.response.status,
          ),
        );
      } else {
        setSubmitError(
          "회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Container>
      <GuestHeader />

      <S.FormWrapper onSubmit={handleSignUpSubmit} noValidate>
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
            label="이메일"
            type="email"
            placeholder="이메일"
            $size="lg"
            autoComplete="email"
            value={email}
            errorMessage={getDisplayError("email")}
            onBlur={() => handleFieldBlur("email")}
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError("email");
              setSubmitError("");
            }}
          />

          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
            $size="lg"
            autoComplete="new-password"
            value={password}
            errorMessage={getDisplayError("password")}
            onBlur={() => handleFieldBlur("password")}
            onChange={(e) => {
              setPassword(e.target.value);
              clearFieldError("password");
            }}
          />

          <Input
            type="password"
            placeholder="비밀번호 확인"
            $size="lg"
            autoComplete="new-password"
            value={passwordConfirmation}
            errorMessage={getDisplayError("passwordConfirmation")}
            onBlur={() => handleFieldBlur("passwordConfirmation")}
            onChange={(e) => {
              setPasswordConfirmation(e.target.value);
              clearFieldError("passwordConfirmation");
            }}
          />

          <Input
            label="닉네임"
            type="text"
            placeholder="닉네임"
            $size="lg"
            autoComplete="nickname"
            value={nickname}
            errorMessage={getDisplayError("nickname")}
            onBlur={() => handleFieldBlur("nickname")}
            onChange={(e) => {
              setNickname(e.target.value);
              clearFieldError("nickname");
              setSubmitError("");
            }}
          />
        </S.FormFields>

        {submitError && <S.FormError role="alert">{submitError}</S.FormError>}

        <S.ButtonWrapper>
          <Button
            type="submit"
            variant="wide"
            size="3xl"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? "가입 중..." : "가입하기"}
          </Button>
        </S.ButtonWrapper>
      </S.FormWrapper>
    </S.Container>
  );
}
