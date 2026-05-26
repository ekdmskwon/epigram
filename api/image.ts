import instance from "@/lib/axios";

export interface UploadImageResponse {
  imageUrl: string;
}

/**
 * @params file 유저가 선택한 이미지 파일 객체
 */
export const uploadImage = async (file: File): Promise<UploadImageResponse> => {
  const formData = new FormData;

  formData.append("image", file);

  const response = await instance.post<UploadImageResponse>(  
    "/images/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}