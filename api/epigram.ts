import instance from "@/lib/axios";

// POST 에피그램 작성 API
export interface CreateEpigramRequest {
  content: string;
  author: string;
  referenceTitle?: string;
  referenceUrl?: string;
  tags?: string[];
}

export interface Epigram {
  id: number;
  content: string;
  author: string;
  referenceTitle: string | null;
  referenceUrl: string | null;
  writerId: number;
  tags: { id: number; name: string }[];
  likeCount: number;
}

export type EpigramResponse = Epigram;

export const createEpigram = async (
  body: CreateEpigramRequest,
): Promise<EpigramResponse> => {
  const response = await instance.post<EpigramResponse>("/epigrams", body);
  return response.data;
};

// GET 에피그램 목록 조회 API
export interface GetEpigramsRequest {
  limit?: number;
  cursor?: number;
  keyword?: string;
  writerId?: number;
}

export interface GetEpigramsResponse {
  totalCount: number;
  nextCursor: number | null;
  list: Epigram[];
}

export const getEpigrams = async (
  params?: GetEpigramsRequest,
): Promise<GetEpigramsResponse> => {
  const response = await instance.get<GetEpigramsResponse>("/epigrams", {
    params,
  });
  return response.data;
};

// GET 오늘의 에피그램 조회 API
export interface TodayEpigramResponse extends Epigram {
  isLiked: boolean | null;
}

export const getTodayEpigram = async (): Promise<TodayEpigramResponse> => {
  const response = await instance.get<TodayEpigramResponse>("/epigrams/today");
  return response.data;
};

// GET 에피그램 상세 조회
export interface EpigramDetailResponse extends Epigram {
  isLiked: boolean;
}

export const getEpigramDetail = async (
  id: number,
): Promise<EpigramDetailResponse> => {
  const response = await instance.get<EpigramDetailResponse>(`/epigrams/${id}`);
  return response.data;
};

// PATCH 에피그램 수정 API
export interface UpdateEpigramRequest {
  content?: string;
  author?: string;
  referenceTitle?: string;
  referenceUrl?: string;
  tags?: string[];
}

export const updateEpigram = async (
  id: number,
  body: UpdateEpigramRequest,
): Promise<EpigramResponse> => {
  const response = await instance.patch<EpigramResponse>(
    `/epigrams/${id}`,
    body,
  );
  return response.data;
};

// DELETE 에피그램 삭제 API
export interface DeleteEpigramResponse {
  id: number;
}

export const deleteEpigram = async (
  id: number,
): Promise<DeleteEpigramResponse> => {
  const response = await instance.delete<DeleteEpigramResponse>(
    `/epigrams/${id}`,
  );
  return response.data;
};

// POST 에피그램 좋아요 API
export const toggleEpigramLike = async (
  id: number,
): Promise<EpigramDetailResponse> => {
  const response = await instance.post<EpigramDetailResponse>(
    `/epigrams/${id}/like`,
  );
  return response.data;
};

// DELETE 에피그램 좋아요 취소 API
export const cancelEpigramLike = async (
  id: number,
): Promise<EpigramDetailResponse> => {
  const response = await instance.delete<EpigramDetailResponse>(
    `/epigrams/${id}/like`,
  );
  return response.data;
};

// GET 에피그램 댓글 목록 조회 API
export interface GetCommentsRequest {
  limit?: number;
  cursor?: number;
}

export interface CommentWriter {
  id: number;
  nickname: string;
  image: string | null;
}

export interface CommentItem {
  id: number;
  content: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  epigramId: number;
  writer: CommentWriter;
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
    {
      params,
    },
  );
  return response.data;
};