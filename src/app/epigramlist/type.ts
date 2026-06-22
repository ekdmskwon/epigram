import type { GetEpigramsResponse } from "@/api/epigram";

export interface EpigramFeedProps {
  initialData: GetEpigramsResponse | null;
}
