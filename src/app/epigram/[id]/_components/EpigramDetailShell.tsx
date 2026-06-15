"use client";

import type { ReactNode } from "react";
import * as S from "../styled";

type EpigramDetailShellProps = {
  children: ReactNode;
};

export default function EpigramDetailShell({
  children,
}: EpigramDetailShellProps) {
  return <S.Page>{children}</S.Page>;
}
