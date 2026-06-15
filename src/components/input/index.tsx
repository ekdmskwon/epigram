import { forwardRef, useId, useState } from "react";
import Image from "next/image";
import { InputProps } from "./type";
import * as S from "./style";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      guideMessage,
      errorMessage,
      showErrorState,
      type = "text",
      $size = "lg",
      $appearance = "filled",
      id: idProp,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;
    const hasError = !!errorMessage || !!showErrorState;
    const isPasswordType = type === "password";

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const currentType =
      isPasswordType && isPasswordVisible ? "text" : type;

    return (
      <S.InputWrapper $size={$size}>
        {label && <S.Label htmlFor={inputId}>{label}</S.Label>}
        <S.InputContainer $hasError={hasError} $appearance={$appearance}>
          <S.BaseInput
            ref={ref}
            id={inputId}
            type={currentType}
            disabled={disabled}
            $hasError={hasError}
            $isPassword={isPasswordType}
            aria-invalid={hasError}
            aria-describedby={
              errorMessage
                ? `${inputId}-error`
                : guideMessage
                  ? `${inputId}-guide`
                  : hint
                    ? `${inputId}-hint`
                    : undefined
            }
            {...props}
          />

          {isPasswordType && !disabled && (
            <S.IconButton
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              aria-label={
                isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 표시"
              }
            >
              <Image
                src={
                  isPasswordVisible
                    ? "/icons/eye-visible.svg"
                    : "/icons/eye-icon.svg"
                }
                alt=""
                width={24}
                height={24}
                aria-hidden
              />
            </S.IconButton>
          )}
        </S.InputContainer>
        {errorMessage && (
          <S.ErrorMessage id={`${inputId}-error`} role="alert">
            {errorMessage}
          </S.ErrorMessage>
        )}
        {!hasError && guideMessage && (
          <S.GuideMessage id={`${inputId}-guide`}>{guideMessage}</S.GuideMessage>
        )}
        {!hasError && !guideMessage && hint && (
          <S.HintMessage id={`${inputId}-hint`}>{hint}</S.HintMessage>
        )}
      </S.InputWrapper>
    );
  },
);

Input.displayName = "Input";

export default Input;
