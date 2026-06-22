"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import GuestHeader from "@/components/header/GuestHeader";
import Input from "@/components/input";
import { Button } from "@/components/button";
import { signUp } from "@/api/auth";
import { setTokens, setUserProfile } from "@/lib/auth-token";
import {
  getSignUpSubmitErrorMessage,
  parseSignUpApiError,
} from "@/lib/signup-api-error";
import {
  hasFieldErrors,
  isSignUpFormReady,
  validateSignUpFieldOnBlur,
  validateSignUpForm,
  type SignUpField,
  type SignUpFieldErrors,
  type SignUpFormValues,
} from "@/lib/validation/signup";
import * as S from "./styles";

const SIGNUP_FIELDS: SignUpField[] = [
  "email",
  "password",
  "passwordConfirmation",
  "nickname",
];

const INITIAL_FORM_DATA: SignUpFormValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
  nickname: "",
};

const ALL_SIGNUP_FIELDS_TOUCHED = SIGNUP_FIELDS.reduce(
  (acc, field) => {
    acc[field] = true;
    return acc;
  },
  {} as Record<SignUpField, boolean>,
);

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormValues>(INITIAL_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState<SignUpFieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<SignUpField, boolean>>>(
    {},
  );
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = isSignUpFormReady(formData);

  const getDisplayError = (field: SignUpField) =>
    touched[field] ? fieldErrors[field] : undefined;

  const updateField = (field: SignUpField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFieldBlur = (field: SignUpField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const message = validateSignUpFieldOnBlur(field, formData);
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

    const errors = validateSignUpForm(formData);
    if (hasFieldErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const { accessToken, refreshToken, user } = await signUp({
        email: formData.email.trim(),
        password: formData.password,
        passwordConfirmation: formData.passwordConfirmation,
        nickname: formData.nickname.trim(),
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
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
            $size="lg"
            autoComplete="new-password"
            value={formData.password}
            errorMessage={getDisplayError("password")}
            onBlur={() => handleFieldBlur("password")}
            onChange={(e) => {
              updateField("password", e.target.value);
              clearFieldError("password");
            }}
          />

          <Input
            type="password"
            placeholder="비밀번호 확인"
            $size="lg"
            autoComplete="new-password"
            value={formData.passwordConfirmation}
            errorMessage={getDisplayError("passwordConfirmation")}
            onBlur={() => handleFieldBlur("passwordConfirmation")}
            onChange={(e) => {
              updateField("passwordConfirmation", e.target.value);
              clearFieldError("passwordConfirmation");
            }}
          />

          <Input
            label="닉네임"
            type="text"
            placeholder="닉네임"
            $size="lg"
            autoComplete="nickname"
            value={formData.nickname}
            errorMessage={getDisplayError("nickname")}
            onBlur={() => handleFieldBlur("nickname")}
            onChange={(e) => {
              updateField("nickname", e.target.value);
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
