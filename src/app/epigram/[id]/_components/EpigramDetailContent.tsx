"use client";

import EpigramDetail from "./EpigramDetail";
import * as S from "../styled";

type EpigramDetailContentProps = {
  epigramId: number;
};

export default function EpigramDetailContent({
  epigramId,
}: EpigramDetailContentProps) {
  return (
    <S.Main>
      <EpigramDetail epigramId={epigramId} />
    </S.Main>
  );
}
