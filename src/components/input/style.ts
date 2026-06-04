import styled, { css } from "styled-components";
import type { InputSize } from "./type";

const widthStyles: Record<InputSize, ReturnType<typeof css>> = {
  sm: css`
    max-width: 320px;
  `,
  md: css`
    max-width: 480px;
  `,
  lg: css`
    width: 100%;
    max-width: 640px;
  `,
};

export const InputWrapper = styled.div<{ $size: InputSize }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${({ $size }) => widthStyles[$size]}
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black950};
  margin-bottom: 12px;
  text-align: left;
  line-height: 1.4;
`;

export const InputContainer = styled.div<{
  $hasError?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  min-height: 64px;
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.state : theme.colors.inputBorder};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.inputBg};
  box-sizing: border-box;
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.state : theme.colors.inputBorderFocus};
  }
`;

export const BaseInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
  padding: 0 48px 0 16px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black950};
  font-size: 16px;
  font-weight: 500;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.colors.black200};
    font-weight: 400;
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.black200};
  }
`;

export const IconButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 24px;
  height: 24px;
  z-index: 10;
`;

export const HintMessage = styled.span`
  color: ${({ theme }) => theme.colors.black200};
  font-size: 12px;
  margin-top: 6px;
  text-align: left;
`;

export const GuideMessage = styled.span`
  color: ${({ theme }) => theme.colors.state};
  font-size: 12px;
  margin-top: 8px;
  text-align: left;
  line-height: 1.5;
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.state};
  font-size: 12px;
  margin-top: 8px;
  text-align: left;
  line-height: 1.5;
`;
