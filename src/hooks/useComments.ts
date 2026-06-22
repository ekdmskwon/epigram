"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getComments,
  type CommentItem,
  type GetCommentsResponse,
} from "@/api/comment";

const INITIAL_LOAD_ERROR =
  "댓글을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";
const LOAD_MORE_ERROR =
  "댓글을 더 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";

export function useComments(
  epigramId: number,
  pageSize: number,
  initialData?: GetCommentsResponse | null,
) {
  const [comments, setComments] = useState<CommentItem[]>(
    initialData?.list ?? [],
  );
  const [totalCount, setTotalCount] = useState(initialData?.totalCount ?? 0);
  const [nextCursor, setNextCursor] = useState<number | null>(
    initialData?.nextCursor ?? null,
  );
  const [isLoading, setIsLoading] = useState(!initialData);
  const [loadError, setLoadError] = useState("");

  const applyResponse = useCallback(
    (response: GetCommentsResponse, isInitialLoad: boolean) => {
      setComments((prev) =>
        isInitialLoad ? response.list : [...prev, ...response.list],
      );
      setTotalCount(response.totalCount);
      setNextCursor(response.nextCursor);
    },
    [],
  );

  const loadComments = useCallback(
    async (cursor?: number) => {
      const isInitialLoad = cursor === undefined;

      if (isInitialLoad) {
        setLoadError("");
      }

      setIsLoading(true);

      try {
        const response = await getComments(epigramId, {
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
    [applyResponse, epigramId, pageSize],
  );

  useEffect(() => {
    if (!initialData) {
      loadComments();
    }
  }, [initialData, loadComments]);

  const loadMore = useCallback(() => {
    if (nextCursor === null || isLoading) return;
    loadComments(nextCursor);
  }, [nextCursor, isLoading, loadComments]);

  const prependComment = useCallback((comment: CommentItem) => {
    setComments((prev) => [comment, ...prev]);
    setTotalCount((prev) => prev + 1);
  }, []);

  const updateCommentInList = useCallback((updated: CommentItem) => {
    setComments((prev) =>
      prev.map((comment) => (comment.id === updated.id ? updated : comment)),
    );
  }, []);

  const removeCommentFromList = useCallback((commentId: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    setTotalCount((prev) => Math.max(0, prev - 1));
  }, []);

  return {
    comments,
    totalCount,
    nextCursor,
    isLoading,
    loadError,
    loadMore,
    prependComment,
    updateCommentInList,
    removeCommentFromList,
    refresh: () => loadComments(),
  };
}
