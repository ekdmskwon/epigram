import styled from "styled-components";
import { ButtonProps } from "./type";

export const StyledButton = styled.button<ButtonProps & { $hasIcon: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  white-space: nowrap;

  flex-direction: ${({ iconPosition }) =>
    iconPosition === "right" ? "row-reverse" : "row"};

  border-radius: ${({ shape }) => (shape === "pill" ? "999px" : "12px")};

  width: auto;

  ${({ variant }) =>
    variant === "wide" &&
    `
      width: 100%;
    `}

  ${({ size, theme, bgType, $hasIcon }) => {
    // 1) 기능형 버튼 스타일
    if (bgType === "outline" || $hasIcon) {
      switch (size) {
        case "xs":
          return `height: 32px; padding: 0 8px; font-size: ${theme.fontSizes.main.textXs.size};`;
        case "sm":
          return `height: 44px; padding: 0 10px; font-size: ${theme.fontSizes.main.textSm.size};`;
        case "md-2":
          return `height: 56px; padding: 0 20px; font-size: ${theme.fontSizes.main.text2lg.size};`;
        case "lg":
          return `height: 64px; padding: 0 24px; font-size: ${theme.fontSizes.main.text2xl.size};`;

        case "xl":
          return `height: 44px; padding: 0 16px; font-size: ${theme.fontSizes.main.textSm.size};`;
        case "2xl":
          return `height: 44px; padding: 0 16px; font-size: ${theme.fontSizes.main.textMd.size};`;
        case "3xl":
          return `height: 64px; padding: 0 24px; font-size: ${theme.fontSizes.main.text2xl.size};`;

        case "md":
        default:
          return `height: 48px; padding: 0 12px; font-size: ${theme.fontSizes.main.textMd.size};`;
      }
    }

    // 2) 일반 기본형 버튼 스타일
    switch (size) {
      case "xs":
        return `height: 32px; padding: 0 12px; font-size: ${theme.fontSizes.main.textXs.size};`;
      case "sm":
        return `height: 44px; padding: 0 16px; font-size: ${theme.fontSizes.main.textSm.size};`;
      case "md-2":
        return `height: 56px; padding: 0 24px; font-size: ${theme.fontSizes.main.text2lg.size};`;
      case "lg":
        return `height: 64px; padding: 0 32px; font-size: ${theme.fontSizes.main.text2xl.size};`;

      case "xl":
        return `height: 44px; padding: 0 24px; font-size: ${theme.fontSizes.main.textSm.size};`;
      case "2xl":
        return `height: 44px; padding: 0 32px; font-size: ${theme.fontSizes.main.textMd.size};`;
      case "3xl":
        return `height: 64px; padding: 0 48px; font-size: ${theme.fontSizes.main.text2xl.size};`;

      case "md":
      default:
        return `height: 48px; padding: 0 20px; font-size: ${theme.fontSizes.main.textMd.size};`;
    }
  }}

  /* 스타일 테마 컬러 매핑 */
  ${({ bgType, theme }) =>
    bgType === "outline"
      ? `
          background-color: #ffffff; 
          border: 1px solid ${theme.colors.line200};
          color: ${theme.colors.black600};
          &:hover:not(:disabled) { background-color: ${theme.colors.line100}; }
          &:active:not(:disabled) { background-color: ${theme.colors.gray100}; }
        `
      : `
          background-color: ${theme.colors.black950};
          border: none;
          color: ${theme.colors.blue100};
          &:hover:not(:disabled) { background-color: ${theme.colors.black800}; }
          &:active:not(:disabled) { background-color: ${theme.colors.black700}; }
        `}

  /* 비활성화 상태 */
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray300};
    border: none;
    cursor: not-allowed;
  }
`;
