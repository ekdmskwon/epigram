import { notFound } from "next/navigation";
import AuthHeader from "@/components/header/AuthHeader";
import EpigramDetailContent from "./_components/EpigramDetailContent";

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

  return (
    <>
      <AuthHeader />
      <EpigramDetailContent epigramId={epigramId} />
    </>
  );
}
