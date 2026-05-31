import styled from "styled-components";
import { ButtonProps } from "./type";

export const StyledButton = styled.button<ButtonProps & { $hasIcon: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 600;
  white-space: nowrap;
  
  transition: background-color 0.2s ease, transform 0.1s ease, border-color 0.2s ease;
  cursor: pointer;

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
    if (bgType === "outline" || $hasIcon) {
      switch (size) {
        case "xs": return `height: 32px; padding: 0 8px; font-size: ${theme.fontSizes.main.textXs.size};`;
        case "sm": return `height: 44px; padding: 0 10px; font-size: ${theme.fontSizes.main.textSm.size};`;
        case "md-2": return `height: 56px; padding: 0 20px; font-size: ${theme.fontSizes.main.text2lg.size};`;
        case "lg": return `height: 64px; padding: 0 24px; font-size: ${theme.fontSizes.main.text2xl.size};`;
        case "xl": return `height: 44px; padding: 0 16px; font-size: ${theme.fontSizes.main.textSm.size};`;
        case "2xl": return `height: 44px; padding: 0 16px; font-size: ${theme.fontSizes.main.textMd.size};`;
        case "3xl": return `height: 64px; padding: 0 24px; font-size: ${theme.fontSizes.main.text2xl.size};`;
        case "md":
        default: return `height: 48px; padding: 0 12px; font-size: ${theme.fontSizes.main.textMd.size};`;
      }
    }

    switch (size) {
      case "xs": return `height: 32px; padding: 0 12px; font-size: ${theme.fontSizes.main.textXs.size};`;
      case "sm": return `height: 44px; padding: 0 16px; font-size: ${theme.fontSizes.main.textSm.size};`;
      case "md-2": return `height: 56px; padding: 0 24px; font-size: ${theme.fontSizes.main.text2lg.size};`;
      case "lg": return `height: 64px; padding: 0 32px; font-size: ${theme.fontSizes.main.text2xl.size};`;
      case "xl": return `height: 44px; padding: 0 24px; font-size: ${theme.fontSizes.main.textSm.size};`;
      case "2xl": return `height: 44px; padding: 0 32px; font-size: ${theme.fontSizes.main.textMd.size};`;
      case "3xl": return `height: 64px; padding: 0 48px; font-size: ${theme.fontSizes.main.text2xl.size};`;
      case "md":
      default: return `height: 48px; padding: 0 20px; font-size: ${theme.fontSizes.main.textMd.size};`;
    }
  }}

  ${({ bgType, theme }) =>
    bgType === "outline"
      ? `
          background-color: #ffffff; 
          border: 1px solid ${theme.colors.line200};
          color: ${theme.colors.black600};

          &:hover:not(:disabled) { 
            background-color: ${theme.colors.line100}; 
          }
          &:active:not(:disabled) { 
            background-color: ${theme.colors.gray100}; 
            transform: scale(0.98);
          }
          &:disabled {
            background-color: #ffffff;
            border: 1px solid ${theme.colors.line100};
            color: ${theme.colors.black200};
          }
        `
      : `
          background-color: ${theme.colors.black800};
          border: none;
          color: #ffffff;

          &:hover:not(:disabled) { 
            background-color: ${theme.colors.black900}; 
          }
          &:active:not(:disabled) { 
            background-color: ${theme.colors.black950}; 
            transform: scale(0.98);
          }
          &:disabled {
            background-color: ${theme.colors.black400};
            color: ${theme.colors.black200};
          }
        `}

  &:disabled {
    cursor: not-allowed;
  }
`;