import axiosInstance from "../service/axiosInstance";

export const getAllMessage = async (): Promise<any> => {
    return await axiosInstance.get(`/api/messages/`)
}

export const getMessages = async (myId: string, opponentId: string, page: number = 1, limit: number = 20): Promise<any> => {
    return await axiosInstance.get(`/api/messages/get-message/${myId}/${opponentId}/`, {
        params: { page, limit }
    });
}

// Thêm API start direct chat
export const startDirectChat = async (recipientId: string): Promise<any> => {
    return await axiosInstance.post(`/api/chats/start-direct/`, {
        recipient_id: recipientId
    });
}