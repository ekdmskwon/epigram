import type { EpigramDetailResponse } from "@/api/epigram";

export async function fetchEpigramDetail(
  id: number,
): Promise<EpigramDetailResponse> {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseURL) {
    throw new Error("API base URL is not configured");
  }

  const response = await fetch(`${baseURL}/epigrams/${id}`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch epigram: ${response.status}`);
  }

  return response.json();
}
