"use client";

import AddEpigramForm from "./AddEpigramForm";
import * as S from "../styled";

export default function AddEpigramContent() {
  return (
    <S.Main>
      <S.PageTitle>에피그램 만들기</S.PageTitle>
      <AddEpigramForm />
    </S.Main>
  );
}
