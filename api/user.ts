import instance from "@/lib/axios";

// 서버가 돌려주는 User 데이터 타입 미리 정의해 둠
export interface UserResponse {
  id: number;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  image: string | null; // 이미지가 없을 수도 있으니까 null도 허용
}

// GET /users/me: 내 정보 조회 API 함수
export const getUserMe = async (): Promise<UserResponse> => {
  const response = await instance.get<UserResponse>(`/users/me`);
  return response.data;
};

// 프로필 수정 요청 시 서버에 보낼 데이터 타입 정의
export interface UpdateUserRequest {
  /**
   * @minLength 1
   * @maxLength 30
   */
  nickname: string;
  image: string | null;
}

// 프로필 수정 성공 시 서버가 돌려주는 데이터 타입
export interface UpdateUserResponse {
  nickname: string;
  image: string | null;
}

// PATCH /users.me: 내 정보 수정 API 함수
export const updateUserMe = async (
  data: UpdateUserRequest,
): Promise<UpdateUserResponse> => {
  const response = await instance.patch<UpdateUserResponse>(`/users/me`, data);
  return response.data;
};

//GET /users/{id}: 특정 유저 정보 조회 API 함수
export const getUserById = async (id: number): Promise<UserResponse> => {
  const response = await instance.get<UserResponse>(`/users/${id}`);
  return response.data;
};

//GET /user/{id}/comments: 유저 댓글 목록 조회 API 함수
export interface CommentWriter {
  id: number;
  nickname: string;
  image: string | null;
}

export interface CommentType {
  updatedAt: string;
  createdAt: string;
  isPrivate: boolean;
  id: number;
  epigramId: number;
  writer: CommentWriter; // 댓글 작성자 정보
  /** 
   * @minLength 1 
   * */
  content: string;
}

export interface CursorBasePaginationResponse {
  totalCount: number;
  nextCursor: number | null;
  list: CommentType[];
}

export interface GetUserCommentsParams {
  limit: number;
  cursor?: number;
}

export const getUserComments = async (
  id: number,
  params: GetUserCommentsParams,
): Promise<CursorBasePaginationResponse> => {
  const response = await instance.get<CursorBasePaginationResponse>(
    `/users/${id}/comments`,
    {
      params,
    },
  );
  return response.data;
};
