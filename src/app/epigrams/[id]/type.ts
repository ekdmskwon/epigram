import type { EpigramDetailResponse } from "@/api/epigram";
import type { GetCommentsResponse } from "@/api/comment";

export interface EpigramDetailViewProps {
  epigramId: number;
  initialEpigram: EpigramDetailResponse;
  initialComments: GetCommentsResponse | null;
}
