import axiosInstance from "../service/axiosInstance";

export const followUser = async (currentUserId: string, opponentId: string): Promise<any> => {
  return await axiosInstance.post(`/api/users/follow/${currentUserId}/${opponentId}`);
};

export const getAllUser = async (): Promise<any> => {
  return await axiosInstance.get(`/api/users/`);
};

export const suggestedUser = async (userId: string): Promise<any> => {
  return await axiosInstance.get(`/api/users/get-user-suggested/${userId}/`);
};

export const getUser = async (userId: string): Promise<any> => {
  return await axiosInstance.get(`/api/users/get-user/${userId}/`);
};

export const updateUser = async (
  userId: string,
  // avatarUrl: File | null,
  formData: FormData
): Promise<any> => {
  // const data = new FormData();

  // if (avatarUrl) {
  //   data.append("avatarUrl", avatarUrl);
  // }

  // if (formData) {
  //   data.append("formData", JSON.stringify(formData)); // Chuyển formData thành chuỗi JSON
  // }

  return await axiosInstance.put(`/api/users/update/${userId}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteUser = async (userId: string): Promise<any> => {
  return await axiosInstance.delete(`/api/users/delete-user/${userId}/`);
};

export const requireUpdateUserToArtist = async (userId: string): Promise<any> => {
  return await axiosInstance.get(`/api/users/require-update-user-to-artist/${userId}/`);
};

export const responseUpdateUserToArtist = async (userId: string): Promise<any> => {
  return await axiosInstance.get(`/api/users/response-update-user-to-artist/${userId}/`);
};

export const searchUsers = async (query: string): Promise<any> => {
  return await axiosInstance.get(`api/users/search-users?${query}`);
}