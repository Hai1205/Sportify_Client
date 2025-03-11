import axiosInstance from "../service/axiosInstance";

export const getAllMessage = async (): Promise<any> => {
    return await axiosInstance.get(`/api/messages/`)
}

export const getMessage = async (senderId: string, receiverId: string): Promise<any> => {
    return await axiosInstance.get(`/api/messages/get-message/${senderId}/${receiverId}/`)
}