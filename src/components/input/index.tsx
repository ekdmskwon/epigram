import { forwardRef } from "react";
import { InputProps } from "./type";
import * as S from "./style";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, ...props }, ref) => {
    const hasError = !!errorMessage;

    return (
      <S.InputWrapper>
        <S.InputContainer $hasError={hasError}>
          <S.BaseInput ref={ref} {...props} />
        </S.InputContainer>
        {hasError && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
      </S.InputWrapper>
    );
  },
);

Input.displayName = "Input";

export default Input;
