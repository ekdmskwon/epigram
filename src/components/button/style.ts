import styled, { css } from "styled-components";

interface StyledButtonProps {
  $variant?: "main" | "wide";
  $bgType?: "fill" | "outline";
  $shape?: "pill" | "round";
  $size?: "xs" | "sm" | "md" | "md-2" | "lg" | "xl" | "2xl" | "3xl";
  $iconPosition?: "left" | "right";
  $hasIcon: boolean;
}

const fillButtonStyles = css`
  background-color: ${({ theme }) => theme.colors.buttonFillDefault};
  border: none;
  color: ${({ theme }) => theme.colors.buttonFillDisabledText};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.buttonFillHover};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.buttonFillActive};
    transform: scale(0.98);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.buttonFillDisabled};
    color: ${({ theme }) => theme.colors.buttonFillDisabledText};
    opacity: 0.9;
  }
`;

const outlineButtonStyles = css`
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.line200};
  color: ${({ theme }) => theme.colors.black600};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.line100};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.gray100};
    transform: scale(0.98);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.buttonFillDisabled};
    border: none;
    color: ${({ theme }) => theme.colors.buttonFillDisabledText};
  }
`;

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 600;
  white-space: nowrap;

  transition:
    background-color 0.2s ease,
    transform 0.1s ease,
    border-color 0.2s ease;
  cursor: pointer;

  flex-direction: ${({ $iconPosition }) =>
    $iconPosition === "right" ? "row-reverse" : "row"};

  border-radius: ${({ $shape }) => ($shape === "pill" ? "999px" : "12px")};

  width: auto;

  ${({ $variant }) =>
    $variant === "wide" &&
    css`
      width: 100%;
    `}

  ${({ $size, theme, $bgType, $hasIcon }) => {
    if ($bgType === "outline" || $hasIcon) {
      switch ($size) {
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
          return `height: 64px; padding: 0 24px; font-size: ${theme.fontSizes.main.textXl.size}; line-height: ${theme.fontSizes.main.textXl.lineHeight};`;
        case "md":
        default:
          return `height: 48px; padding: 0 12px; font-size: ${theme.fontSizes.main.textMd.size};`;
      }
    }

    switch ($size) {
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
        return `height: 64px; padding: 0 48px; font-size: ${theme.fontSizes.main.textXl.size}; line-height: ${theme.fontSizes.main.textXl.lineHeight};`;
      case "md":
      default:
        return `height: 48px; padding: 0 20px; font-size: ${theme.fontSizes.main.textMd.size};`;
    }
  }}

  ${({ $bgType }) => ($bgType === "outline" ? outlineButtonStyles : fillButtonStyles)}

  &:disabled {
    cursor: not-allowed;
    transform: none;
  }
`;
