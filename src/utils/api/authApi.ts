import axiosInstance from "../service/axiosInstance";
import { FormData } from "../types";

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

export const refreshToken = async (): Promise<any> => {
  return await axiosInstance.post("/api/auth/refresh-token/")
}