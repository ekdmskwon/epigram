import instance from "@/lib/axios";

export type EmotionType = "MOVED" | "HAPPY" | "WORRIED" | "SAD" | "ANGRY";

// 공통 감정 로그 인터페이스
export interface EmotionLog {
  id: number;
  userId: number;
  emotion: EmotionType;
  createdAt: string;
}

// POST 오늘의 감정 저장 API
export interface CreateEmotionLogRequest {
  emotion: EmotionType;
}

export type CreateEmotionLogResponse = EmotionLog;

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

export type GetTodayEmotionLogResponse = EmotionLog;

export const getTodayEmotionLog = async (
  params: GetTodayEmotionLogRequest,
): Promise<GetTodayEmotionLogResponse | null> => {
  const response = await instance.get<GetTodayEmotionLogResponse | null>(
    "/emotionLogs/today",
    {
      params,
    },
  );
  return response.data ?? null;
};

// GET 월별 감정 조회 API
export interface GetMonthlyEmotionLogsRequest {
  userId: number;
  year: number;
  month: number;
}

export type MonthlyEmotionLogItem = EmotionLog;

export const getMonthlyEmotionLogs = async (
  params: GetMonthlyEmotionLogsRequest,
): Promise<MonthlyEmotionLogItem[]> => {
  const response = await instance.get<MonthlyEmotionLogItem[]>(
    "/emotionLogs/monthly",
    {
      params,
    },
  );
  return response.data || [];
};
