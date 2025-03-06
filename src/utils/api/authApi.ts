import axiosInstance from "../service/axiosInstance";

interface FormData {
  [key: string]: any; // Cho phép các field động khác nếu cần
}

export const register = async (formData: FormData): Promise<any> => {
  return await axiosInstance.post("/api/auth/register/", formData);
};

export const callback = async (
  userId: string,
  formData: FormData
): Promise<any> => {
  return await axiosInstance.post(`/api/auth/callback/${userId}/`, formData);
};

export const login = async (formData: FormData): Promise<any> => {
  return await axiosInstance.post("/api/auth/login/", formData);
};

export const logout = async (): Promise<any> => {
  return await axiosInstance.post("/api/auth/logout/");
};
