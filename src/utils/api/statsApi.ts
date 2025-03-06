import axiosInstance from "../service/axiosInstance";

export const getStats = async(): Promise<any> => {
    return await axiosInstance.get(`/api/stats/`)
}