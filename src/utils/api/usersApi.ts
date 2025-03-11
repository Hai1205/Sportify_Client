import axiosInstance from "../service/axiosInstance";
// import { FormData } from "../types";

// export const followUser = async (currentUserId: string, userToModifyId: string): Promise<any> => {
//   return await axiosInstance.post(`/api/users/follow/${currentUserId}/${userToModifyId}`);
// };

export const getAllUsers = async (): Promise<any> => {
  return await axiosInstance.get(`/api/users/`);
};

// export const suggestedUser = async (userId: string): Promise<any> => {
  //   return await axiosInstance.get(`/api/users/get-user-suggested/${userId}/`);
  // };

  export const getUser = async (userId: string): Promise<any> => {
    return await axiosInstance.get(`/api/users/get-user/${userId}/`);
  };
  
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

export const deleteUser = async (userId: string): Promise<any> => {
  return await axiosInstance.delete(`/api/users/delete-user/${userId}/`);
};

// export const getUserSongs = async (userId: string): Promise<any> => {
//   return await axiosInstance.get(`/api/users/get-user-songs/${userId}/`);
// };

export const requireUpdateUserToArtist = async (userId: string): Promise<any> => {
  return await axiosInstance.get(`/api/users/require-update-user-to-artist/${userId}/`);
};

export const responseUpdateUserToArtist = async (userId: string): Promise<any> => {
  return await axiosInstance.get(`/api/users/response-update-user-to-artist/${userId}/`);
};