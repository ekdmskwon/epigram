import AuthHeader from "@/components/header/AuthHeader";
import EditEpigramForm from "./EditEpigramForm";
import * as S from "./styles";

type EditEpigramPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditEpigramPage({
  params,
}: EditEpigramPageProps) {
  const { id } = await params;
  const epigramId = Number(id);

  return (
    <S.Page>
      <AuthHeader />
      <S.Main>
        <S.PageTitle>에피그램 수정</S.PageTitle>
        <EditEpigramForm epigramId={epigramId} />
      </S.Main>
    </S.Page>
  );
}
