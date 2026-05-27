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