import React from "react";
import { ButtonProps } from "./type";
import { StyledButton } from "./style";

export const Button = ({
  variant = "main",
  size,
  children,
  disabled = false,
  ...props
}: ButtonProps) => {
  const defaultSize = size || (variant === "wide" ? "xl" : "md");

  return (
    <StyledButton
      variant={variant}
      size={defaultSize}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};