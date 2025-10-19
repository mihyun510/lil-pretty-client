import { apiInstance } from "./common/axiosInstance";

// 📤 파일 업로드
export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await apiInstance.post("/file/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data; // 서버에서 반환한 파일명
};

// 📥 파일 다운로드
export const downloadFile = async (filePath: string) => {
  // 폴더와 파일명 분리
  const parts = filePath.split("/");
  const folder = encodeURIComponent(parts[0]);
  const fileName = encodeURIComponent(parts.slice(1).join("/")); // 나머지 경로

  const res = await apiInstance.get(`/file/download/${folder}/${fileName}`, {
    responseType: "blob",
  });

  const blob = new Blob([res.data]);
  // 다운로드 시 실제 파일명만 사용
  const actualFileName = parts[parts.length - 1];

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = actualFileName;
  link.click();
};
