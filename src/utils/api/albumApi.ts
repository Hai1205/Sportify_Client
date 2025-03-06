import axiosInstance from "../service/axiosInstance";
import { FormData } from "../types";

export const uploadAlbum = async (
    userId: string,
    formData: FormData
): Promise<any> => {
    return await axiosInstance.put(`/api/albums/upload/${userId}/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteAlbum = async (albumId: string): Promise<any> => {
    return await axiosInstance.delete(`/api/albums/delete/${albumId}/`)
}

export const getAlbumById = async (albumId: string): Promise<any> => {
    return await axiosInstance.get(`/api/albums/get-by-id/${albumId}/`)
}

export const getAlbums = async (): Promise<any> => {
    return await axiosInstance.get(`/api/albums/`)
}