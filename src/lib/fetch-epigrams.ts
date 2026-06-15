import type {
  GetEpigramsRequest,
  GetEpigramsResponse,
} from "@/api/epigram";

export async function fetchEpigrams(
  params?: GetEpigramsRequest,
): Promise<GetEpigramsResponse> {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseURL) {
    throw new Error("API base URL is not configured");
  }

  const searchParams = new URLSearchParams();
  if (params?.limit != null) searchParams.set("limit", String(params.limit));
  if (params?.cursor != null) searchParams.set("cursor", String(params.cursor));
  if (params?.keyword) searchParams.set("keyword", params.keyword);
  if (params?.writerId != null) {
    searchParams.set("writerId", String(params.writerId));
  }

  const query = searchParams.toString();
  const url = `${baseURL}/epigrams${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch epigrams: ${response.status}`);
  }

  return response.json();
}
