/** 공통 사용자 타입 */
export interface User {
  id: number;
  email: string;
  nickname: string;
  teamId: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}
