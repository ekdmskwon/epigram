import { fetchEpigrams } from "@/lib/fetch-epigrams";
import AuthHeader from "@/components/header/AuthHeader";
import EpigramFabGroup from "./EpigramFabGroup";
import EpigramFeed from "./EpigramFeed";
import { PAGE_SIZE } from "@/lib/epigramlist";
import * as S from "./styles";

export default async function EpigramListPage() {
  let initialData = null;

  try {
    initialData = await fetchEpigrams({ limit: PAGE_SIZE });
  } catch {
    initialData = null;
  }

  return (
    <S.Page>
      <AuthHeader />
      <EpigramFeed initialData={initialData} />
      <EpigramFabGroup />
    </S.Page>
  );
}
