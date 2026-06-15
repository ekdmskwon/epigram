"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getEpigrams,
  type Epigram,
  type GetEpigramsResponse,
} from "@/api/epigram";

const INITIAL_LOAD_ERROR =
  "에피그램을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";
const LOAD_MORE_ERROR =
  "에피그램을 더 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";

export function useEpigrams(
  pageSize: number,
  initialData?: GetEpigramsResponse | null,
) {
  const [epigrams, setEpigrams] = useState<Epigram[]>(initialData?.list ?? []);
  const [nextCursor, setNextCursor] = useState<number | null>(
    initialData?.nextCursor ?? null,
  );
  const [isLoading, setIsLoading] = useState(!initialData);
  const [loadError, setLoadError] = useState("");

  const applyResponse = useCallback(
    (response: GetEpigramsResponse, isInitialLoad: boolean) => {
      setEpigrams((prev) =>
        isInitialLoad ? response.list : [...prev, ...response.list],
      );
      setNextCursor(response.nextCursor);
    },
    [],
  );

  const loadEpigrams = useCallback(
    async (cursor?: number) => {
      const isInitialLoad = cursor === undefined;

      if (isInitialLoad) {
        setLoadError("");
      }

      setIsLoading(true);

      try {
        const response = await getEpigrams({
          limit: pageSize,
          cursor,
        });
        applyResponse(response, isInitialLoad);
      } catch {
        setLoadError(isInitialLoad ? INITIAL_LOAD_ERROR : LOAD_MORE_ERROR);
      } finally {
        setIsLoading(false);
      }
    },
    [applyResponse, pageSize],
  );

  useEffect(() => {
    if (!initialData) {
      loadEpigrams();
    }
  }, [initialData, loadEpigrams]);

  const loadMore = useCallback(() => {
    if (nextCursor === null || isLoading) return;
    loadEpigrams(nextCursor);
  }, [nextCursor, isLoading, loadEpigrams]);

  return { epigrams, nextCursor, isLoading, loadError, loadMore };
}
