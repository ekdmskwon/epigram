import { InputHTMLAttributes } from "react";

export type InputSize = "sm" | "md" | "lg";
export type InputAppearance = "filled" | "outlined";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  /** 회원가입 시안: 비밀번호 확인 아래 항상 표시되는 빨간 안내 문구 */
  guideMessage?: string;
  errorMessage?: string;
  /** 에러 메시지 없이 테두리만 에러 상태로 표시 */
  showErrorState?: boolean;
  $size?: InputSize;
  $appearance?: InputAppearance;
}
