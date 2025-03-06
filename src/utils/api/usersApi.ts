import axiosInstance from "../service/axiosInstance";

interface FormData {
  [key: string]: any; // Cho phép các field động khác nếu cần
}

// export const followUser = async (currentUserId: string, userToModifyId: string): Promise<any> => {
//   return await axiosInstance.post(`/api/users/follow/${currentUserId}/${userToModifyId}`);
// };

export const updateUser = async (
  userId: string,
  coverImg?: File,
  profileImg?: File,
  formData?: FormData
): Promise<any> => {
  const data = new FormData();

  if (coverImg) {
    data.append("coverImg", coverImg);
  }

  if (profileImg) {
    console.log(profileImg);
    data.append("profileImg", profileImg);
  }

  if (formData) {
    data.append("formData", JSON.stringify(formData)); // Chuyển formData thành chuỗi JSON
  }

  return await axiosInstance.put(`/api/users/update/${userId}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const suggestedUser = async (userId: string): Promise<any> => {
  return await axiosInstance.get(`/api/users/get-user-suggested/${userId}/`);
};

export const profileUser = async (userId: string): Promise<any> => {
  return await axiosInstance.get(`/api/users/get-profile/${userId}/`);
};

export const getUsers = async (): Promise<any> => {
  return await axiosInstance.get(`/api/users/`);
};

export const userMessages = async (userId: string): Promise<any> => {
  return await axiosInstance.get(`/api/users/messages/${userId}/`);
};