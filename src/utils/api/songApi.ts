import axiosInstance from "../service/axiosInstance";
import { FormData } from "../types";

export const uploadSong = async (
    userId: string,
    albumId: string,
    formData: FormData
): Promise<any> => {
    return await axiosInstance.put(`/api/songs/upload/${userId}/${albumId}/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteSong = async (songId: string): Promise<any> => {
    return await axiosInstance.delete(`/api/songs/delete/${songId}/`)
}

export const getSongs = async(): Promise<any> => {
    return await axiosInstance.get(`/api/songs/`)
}

export const getFeaturedSongs = async(): Promise<any> => {
    return await axiosInstance.get(`/api/songs/featured/`);
}

export const getMadeForYouSongs = async(): Promise<any> => {
    return await axiosInstance.get(`/api/songs/made-for-you/`);
}

export const getTrendingSongs = async(): Promise<any> => {
    return await axiosInstance.get(`/api/songs/trending-songs/`);
}