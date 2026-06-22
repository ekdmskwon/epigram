import { notFound } from "next/navigation";
import AuthHeader from "@/components/header/AuthHeader";
import { fetchComments } from "@/lib/fetch-comments";
import { fetchEpigramDetail } from "@/lib/fetch-epigram-detail";
import EpigramDetailView from "./EpigramDetailView";
import * as S from "./styles";

type EpigramDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EpigramDetailPage({
  params,
}: EpigramDetailPageProps) {
  const { id } = await params;
  const epigramId = Number(id);

  if (!Number.isInteger(epigramId) || epigramId <= 0) {
    notFound();
  }

  let epigram;
  let initialComments = null;

  try {
    [epigram, initialComments] = await Promise.all([
      fetchEpigramDetail(epigramId),
      fetchComments(epigramId).catch(() => null),
    ]);
  } catch {
    notFound();
  }

  if (!epigram) notFound();

  return (
    <S.Page>
      <AuthHeader />
      <S.EpigramHeroBackground aria-hidden />
      <S.Main>
        <EpigramDetailView
          key={epigramId}
          epigramId={epigramId}
          initialEpigram={epigram}
          initialComments={initialComments}
        />
      </S.Main>
    </S.Page>
  );
}
