import axiosInstance from "../service/axiosInstance";

export const register = async (formData: FormData): Promise<any> => {
  return await axiosInstance.post("/api/auth/register/", formData);
};

export const registerAdmin = async (formData: FormData): Promise<any> => {
  return await axiosInstance.post("/api/auth/register-admin/", formData);
};

// export const callback = async (
//   userId: string,
//   formData: FormData
// ): Promise<any> => {
//   return await axiosInstance.post(`/api/auth/callback/${userId}/`, formData);
// };

export const login = async (formData: FormData): Promise<any> => {
  return await axiosInstance.post("/api/auth/login/", formData);
};

export const logout = async (): Promise<any> => {
  return await axiosInstance.post("/api/auth/logout/");
};

export const refreshToken = async (): Promise<any> => {
  return await axiosInstance.post("/api/auth/refresh-token/")
}

export const checkAdmin = async (): Promise<any> => {
  return await axiosInstance.post("/api/auth/check-admin/")
}

export const checkArtist = async (): Promise<any> => {
  return await axiosInstance.post("/api/auth/check-artist/")
}


export const changePassword = async (userId: string, formData: FormData): Promise<any> => {
  return await axiosInstance.put(`/api/auth/change-password/${userId}/`, formData);
};