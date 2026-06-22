import AuthHeader from "@/components/header/AuthHeader";
import AddEpigramForm from "./AddEpigramForm";
import * as S from "./styles";

export default function AddEpigramPage() {
  return (
    <S.Page>
      <AuthHeader />
      <S.Main>
        <S.PageTitle>에피그램 만들기</S.PageTitle>
        <AddEpigramForm />
      </S.Main>
    </S.Page>
  );
}
