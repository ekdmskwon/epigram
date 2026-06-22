import instance from "@/lib/axios";

// 댓글 작성 응답 및 공통 댓글 아이템 인터페이스
export interface CommentItem {
  id: number;
  content: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  epigramId: number;
  writer: {
    id: number;
    nickname: string;
    image: string | null;
  };
}

// 1. POST 댓글 작성 API
export interface CreateCommentRequest {
  content: string;
  isPrivate?: boolean;
}

export const createComment = async (
  epigramId: number,
  body: CreateCommentRequest,
): Promise<CommentItem> => {
  const response = await instance.post<CommentItem>("/comments", {
    epigramId,
    content: body.content,
    isPrivate: body.isPrivate ?? false,
  });
  return response.data;
};

// 2. GET 댓글 목록 조회 API
export interface GetCommentsRequest {
  limit?: number;
  cursor?: number;
}

export interface GetCommentsResponse {
  totalCount: number;
  nextCursor: number | null;
  list: CommentItem[];
}

export const getComments = async (
  epigramId: number,
  params?: GetCommentsRequest,
): Promise<GetCommentsResponse> => {
  const response = await instance.get<GetCommentsResponse>(
    `/epigrams/${epigramId}/comments`,
    { params },
  );
  
  return {
    totalCount: response.data?.totalCount ?? 0,
    nextCursor: response.data?.nextCursor ?? null,
    list: response.data?.list || [],
  };
};

// 3. PATCH 댓글 수정 API
export interface UpdateCommentRequest {
  content: string;
  isPrivate?: boolean;
}

export const updateComment = async (
  id: number,
  body: UpdateCommentRequest,
): Promise<CommentItem> => {
  const response = await instance.patch<CommentItem>(`/comments/${id}`, {
    content: body.content,
    isPrivate: body.isPrivate ?? false,
  });
  return response.data;
};

// 4. DELETE 댓글 삭제 API
export interface DeleteCommentResponse {
  id: number;
}

export const deleteComment = async (
  id: number,
): Promise<DeleteCommentResponse> => {
  const response = await instance.delete<DeleteCommentResponse>(
    `/comments/${id}`,
  );
  return response.data;
};