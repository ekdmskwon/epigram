import styled from "styled-components";

const sizeStyles = {
  normal: {
    width: "384px",
    height: "44px",
  },
  large: {
    width: "640px",
    height: "64px",
  },
};

export const InputWrapper = styled.div<{ $size: "normal" | "large" }>`
  display: flex;
  flex-direction: column;
  width: ${({ $size }) => sizeStyles[$size].width};
`;

export const InputContainer = styled.div<{
  $hasError: boolean;
  $size: "normal" | "large";
}>`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${({ $size }) => sizeStyles[$size].height};
  padding: 0 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.state : theme.colors.blue300};
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.state : theme.colors.blue500};
  }

  &:has(input:disabled) {
    background-color: ${({ theme }) => theme.colors.black100};
    border-color: ${({ theme }) => theme.colors.line100};
    cursor: not-allowed;
  }
`;

export const BaseInput = styled.input<{ $size: "normal" | "large" }>`
  width: 100%;
  height: 100%;
  font-family: ${({ theme }) => theme.fonts.main};

  font-size: ${({ theme, $size }) =>
    $size === "large"
      ? theme.fontSizes.main.textLg?.size || "20px"
      : theme.fontSizes.main.textMd.size};
  color: ${({ theme }) => theme.colors.black950};

  caret-color: ${({ theme }) => theme.colors.blue500};

  div[data-error="true"] & {
    caret-color: ${({ theme }) => theme.colors.state};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.black300};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.black400};
  }
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.black400};
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.black600};
  }
`;

export const ErrorMessage = styled.span`
  margin-top: 8px;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textXs.size};
  color: ${({ theme }) => theme.colors.state};
`;
