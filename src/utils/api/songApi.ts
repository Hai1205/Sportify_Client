import axiosInstance from "../service/axiosInstance";

export const getAllSong = async (): Promise<any> => {
    return await axiosInstance.get(`/api/songs/`)
}

export const getUserLikedSong = async (userId: string): Promise<any> => {
    return await axiosInstance.get(`/api/songs/get-user-liked-songs/${userId}/`)
}

export const likeSong = async (userId: string, songId: string): Promise<any> => {
    return await axiosInstance.post(`/api/songs/like-song/${userId}/${songId}/`);
};

export const getUserSongs = async (userId: string): Promise<any> => {
    return await axiosInstance.get(`/api/songs/get-user-songs/${userId}/`)
}

export const uploadSong = async (
    userId: string,
    formData: FormData
): Promise<any> => {
    return await axiosInstance.post(`/api/songs/upload-song/${userId}/`, formData, {
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

export const addSongToAlbum = async (songId: string, albumId: string): Promise<any> => {
    return await axiosInstance.put(`/api/songs/add-song-to-album/${songId}/${albumId}/`);
}

export const downloadSong = async (songId: string): Promise<any> => {
    return await axiosInstance.get(`/api/songs/download-song/${songId}/`);
}

export const searchSongs = async (queryString: string): Promise<any> => {
    return await axiosInstance.get(`api/songs/search-songs/${queryString}`);
}

export const increaseSongView = async (songId: string): Promise<any> => {
    return await axiosInstance.put(`api/songs/increase-song-view/${songId}/`);
}