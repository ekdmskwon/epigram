"use client";

import type { ReactNode } from "react";
import * as S from "../styled";

type EpigramListShellProps = {
  children: ReactNode;
};

export default function EpigramListShell({ children }: EpigramListShellProps) {
  return <S.Page>{children}</S.Page>;
}
