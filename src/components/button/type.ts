import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // main과 wide 구분
  variant?: "main" | "wide";

  bgType?: "fill" | "outline";

  // 기본 버튼과 아이콘 버튼 모양 구분
  shape?: "round" | "pill";

  // 버튼 크기
  size?: "xs" | "sm" | "md" | "md-2" | "lg" | "xl" | "2xl" | "3xl";

  icon?: ReactNode;
  iconPosition?: "left" | "right";

  // 버튼 안에 있는 글자/아이콘
  children: ReactNode;
}
