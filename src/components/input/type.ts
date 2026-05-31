import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  $size?: "normal" | "large";
}
