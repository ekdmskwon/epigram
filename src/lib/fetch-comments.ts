import type { GetCommentsResponse } from "@/api/comment";
import { COMMENT_PAGE_SIZE } from "@/lib/epigram-detail";

export async function fetchComments(
  epigramId: number,
  limit = COMMENT_PAGE_SIZE,
): Promise<GetCommentsResponse> {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseURL) {
    throw new Error("API base URL is not configured");
  }

  const response = await fetch(
    `${baseURL}/epigrams/${epigramId}/comments?limit=${limit}`,
    {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch comments: ${response.status}`);
  }

  return response.json();
}
