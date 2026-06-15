import { fetchEpigrams } from "@/lib/fetch-epigrams";
import AuthHeader from "@/components/header/AuthHeader";
import EpigramFabGroup from "./_components/EpigramFabGroup";
import EpigramFeed from "./_components/EpigramFeed";
import { PAGE_SIZE } from "./constants";

export default async function EpigramListPage() {
  let initialData = null;

  try {
    initialData = await fetchEpigrams({ limit: PAGE_SIZE });
  } catch {
    initialData = null;
  }

  return (
    <>
      <AuthHeader />
      <EpigramFeed initialData={initialData} />
      <EpigramFabGroup />
    </>
  );
}
