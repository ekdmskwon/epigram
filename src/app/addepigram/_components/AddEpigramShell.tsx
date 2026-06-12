"use client";

import type { ReactNode } from "react";
import * as S from "../styled";

type AddEpigramShellProps = {
  children: ReactNode;
};

export default function AddEpigramShell({ children }: AddEpigramShellProps) {
  return <S.Page>{children}</S.Page>;
}
