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
  body: CreateEmotionLogRequest
): Promise<CreateEmotionLogResponse> => {
  const response = await instance.post<CreateEmotionLogResponse>('/emotionLogs/today', body);
  return response.data;
};