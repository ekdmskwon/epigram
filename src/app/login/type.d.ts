import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "main" | "wide";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}