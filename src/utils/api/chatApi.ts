import axiosInstance from "../service/axiosInstance";

export const getAllMessage = async (): Promise<any> => {
    return await axiosInstance.get(`/api/messages/`)
}

export const getMessages = async (myId: string, opponentId: string): Promise<any> => {
    return await axiosInstance.get(`/api/messages/get-message/${myId}/${opponentId}/`)
}