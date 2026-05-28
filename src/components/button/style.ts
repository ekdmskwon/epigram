import styled, { css } from "styled-components";
import { ButtonProps } from "./type";

export const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  white-space: nowrap;

  ${({ variant, size, theme }) => {
    // 1) Main 버튼 계열 스타일
    if (variant === "main") {
      switch (size) {
        case "xs":
          return css`
            width: 53px;
            height: 32px;
            font-size: ${theme.fontSizes.main.textXs.size};
          `;
        case "sm":
          return css`
            width: 60px;
            height: 44px;
            font-size: ${theme.fontSizes.main.textSm.size};
          `;
        case "md-2":
          return css`
            width: 136px;
            height: 56px;
            font-size: ${theme.fontSizes.main.text2lg.size};
          `;
        case "lg":
          return css`
            width: 286px;
            height: 64px;
            font-size: ${theme.fontSizes.main.text2xl.size};
          `;
        case "md":
        default:
          return css`
            width: 112px;
            height: 48px;
            font-size: ${theme.fontSizes.main.textMd.size};
          `;
      }
    }

    // 2) Wide 버튼 계열 스타일
    if (variant === "wide") {
      switch (size) {
        case "2xl":
          return css`
            width: 384px;
            height: 44px;
            font-size: ${theme.fontSizes.main.textMd.size};
          `;
        case "3xl":
          return css`
            width: 640px;
            height: 64px;
            font-size: ${theme.fontSizes.main.text2xl.size};
          `;
        case "xl":
        default:
          return css`
            width: 312px;
            height: 44px;
            font-size: ${theme.fontSizes.main.textSm.size};
          `;
      }
    }
  }}

  /* 컬러 인터랙션 상태 */
  background-color: ${({ theme }) => theme.colors.black950};
  color: ${({ theme }) => theme.colors.blue100};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.black800};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.black700};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray300};
    cursor: not-allowed;
  }
`;
