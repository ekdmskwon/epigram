import React from "react";
import { ButtonProps } from "./type";
import { StyledButton } from "./style";

export const Button = ({
  variant = "main",
  bgType = "fill",
  shape,
  size,
  icon,
  iconPosition = "left",
  children,
  disabled = false,
  ...props
}: ButtonProps) => {
  const defaultSize = size || (variant === "wide" ? "xl" : "md");

  const defaultShape =
    shape || (bgType === "outline" || icon ? "pill" : "round");

  return (
    <StyledButton
      variant={variant}
      bgType={bgType}
      shape={defaultShape}
      size={defaultSize}
      iconPosition={iconPosition}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </StyledButton>
  );
};
