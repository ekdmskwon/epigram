import { forwardRef, useState } from "react";
import Image from "next/image";
import eyeIcon from "../../../public/icons/eye-icon.svg";
import { InputProps } from "./type";
import * as S from "./style";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, type = "text", $size = "normal", ...props }, ref) => {
    const hasError = !!errorMessage;
    const isPasswordType = type === "password";

    const [showPassword, setShowPassword] = useState(false);
    const currentType = isPasswordType
      ? showPassword
        ? "text"
        : "password"
      : type;

    const handleTogglePassword = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <S.InputWrapper $size={$size}>
        <S.InputContainer $hasError={hasError} $size={$size}>
          <S.BaseInput
            ref={ref}
            type={currentType}
            $size={$size}
            $hasError={hasError}
            {...props}
          />

          {isPasswordType && (
            <S.IconButton type="button" onClick={handleTogglePassword}>
              <Image
                src={eyeIcon}
                alt="비밀번호 토글 아이콘"
                width={24}
                height={24}
                style={{ opacity: showPassword ? 1 : 0.4 }}
              />
            </S.IconButton>
          )}
        </S.InputContainer>
        {hasError && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
      </S.InputWrapper>
    );
  },
);

Input.displayName = "Input";

export default Input;
