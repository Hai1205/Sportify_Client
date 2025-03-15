import axiosInstance from "../service/axiosInstance";

export const getAllSong = async (): Promise<any> => {
    return await axiosInstance.get(`/api/songs/`)
}

export const uploadSong = async (
    userId: string,
    albumId: string,
    formData: FormData
): Promise<any> => {
    return await axiosInstance.put(`/api/songs/upload-song/${userId}/${albumId}/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteSong = async (songId: string): Promise<any> => {
    return await axiosInstance.delete(`/api/songs/delete-song/${songId}/`)
}

export const getSong = async (songId: string): Promise<any> => {
    return await axiosInstance.get(`/api/songs/get-song/${songId}/`)
}

export const getFeaturedSongs = async (): Promise<any> => {
    return await axiosInstance.get(`/api/songs/get-featured-songs/`);
}

export const getMadeForYouSongs = async (): Promise<any> => {
    return await axiosInstance.get(`/api/songs/get-made-for-you-songs/`);
}

export const getTrendingSongs = async (): Promise<any> => {
    return await axiosInstance.get(`/api/songs/get-trending-songs/`);
}

export const updateSong = async (songId: string, formData: FormData): Promise<any> => {
    return await axiosInstance.put(`/api/songs/update-song/${songId}/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const addSongToAlbum = async (songId: string, albumIds: string[]): Promise<any> => {
    return await axiosInstance.put(`/api/songs/add-song-to-album/${songId}/`, albumIds);
}

export const downloadSong = async (songId: string): Promise<any> => {
    return await axiosInstance.get(`/api/songs/download-song/${songId}/`);
}

export const searchSongs = async (query: string): Promise<any> => {
  return await axiosInstance.get(`api/songs/search-songs?${query}`);
}