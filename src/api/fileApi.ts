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
export const downloadFile = async (fileName: string) => {
  const res = await apiInstance.get(`/file/download/${fileName}`, {
    responseType: "blob",
  });

  const blob = new Blob([res.data]);
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};
