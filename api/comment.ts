import instance from "@/lib/axios";

// POST 댓글 작성 API
export interface CreateCommentRequest {
  content: string;
  isPrivate?: boolean;
}

export interface CreateCommentResponse {
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

export const createComment = async (
  epigramId: number,
  body: CreateCommentRequest,
): Promise<CreateCommentResponse> => {
  const response = await instance.post<CreateCommentResponse>(
    `/epigrams/${epigramId}/comments`,
    body,
  );
  return response.data;
};

// GET 댓글 목록 조회 API
export interface GetCommentsRequest {
  limit?: number;
  cursor?: number;
}

export type CommentItem = CreateCommentResponse;

export interface GetCommentsResponse {
  totalCount: number;
  nextCursor: number | null;
  list: CommentItem[];
}

export const getComments = async (
  teamId: string,
  params?: GetCommentsRequest,
): Promise<GetCommentsResponse> => {
  const response = await instance.get<GetCommentsResponse>(
    `/${teamId}/comments`,
    {
      params,
    },
  );

  // 데이터가 안전하게 내려오지 않을 경우 대비
  return {
    totalCount: response.data?.totalCount ?? 0,
    nextCursor: response.data?.nextCursor ?? null,
    list: response.data?.list || [],
  };
};
