import instance from "@/lib/axios";

// POST 오늘의 감정 저장 API
export type EmotionType = "MOVED" | "HAPPY" | "WORRIED" | "SAD" | "ANGRY";

export interface CreateEmotionLogRequest {
  emotion: EmotionType;
}

export interface CreateEmotionLogResponse {
  id: number;
  userId: number;
  emotion: EmotionType;
  createdAt: string;
}

export const createTodayEmotionLog = async (
  body: CreateEmotionLogRequest,
): Promise<CreateEmotionLogResponse> => {
  const response = await instance.post<CreateEmotionLogResponse>(
    "/emotionLogs/today",
    body,
  );
  return response.data;
};

// GET 오늘의 감정 조회 API
export interface GetTodayEmotionLogRequest {
  userId: number;
}

export interface GetTodayEmotionLogResponse {
  id: number;
  userId: number;
  emotion: EmotionType;
  createdAt: string;
}

export const getTodayEmotionLog = async (
  params: GetTodayEmotionLogRequest,
): Promise<GetTodayEmotionLogResponse | null> => {
  const response = await instance.get<GetTodayEmotionLogResponse | null>(
    "/emotionLogs/today",
    {
      params,
    },
  );
  return response.data;
};
