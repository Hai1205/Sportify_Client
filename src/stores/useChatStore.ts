import { toast } from "react-toastify";
import { Message, User, ChatRoom } from "@/utils/types";
import { create } from "zustand";
import { getMessages } from "@/utils/api/chatApi";
import axiosInstance from "@/utils/service/axiosInstance";

// Thêm helper function để sắp xếp tin nhắn
const sortMessagesByDate = (messages: Message[]) => {
    return [...messages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
};

interface ChatStore {
    isLoading: boolean;
    isLoadingMore: boolean; // Thêm trạng thái loading khi tải thêm tin nhắn cũ
    error: string | null;
    status: number;
    socket: any;
    isConnected: boolean;
    onlineUsers: Set<string>;
    userActivities: Map<string, string>;
    messages: Message[];
    selectedUser: User | null;
    chatRooms: ChatRoom[];
    activeRoomId: string | null;
    currentPage: number; // Thêm trang hiện tại
    hasMoreMessages: boolean; // Có thêm tin nhắn cũ không

    initSocket: (userId: string) => void;
    disconnectSocket: () => void;
    sendMessage: (receiverId: string, senderId: string, content: string) => void;
    getMessages: (currentUserId: string, opponentId: string, page?: number, reset?: boolean) => Promise<any>;
    loadMoreMessages: () => Promise<boolean>; // Hàm load thêm tin nhắn
    setSelectedUser: (user: User | null) => void;
    getChatRooms: () => Promise<any>;
    setActiveRoom: (roomId: string) => void;
    sendGroupMessage: (roomId: string, senderId: string, content: string) => void;
    reset: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
    users: [],
    isLoading: false,
    isLoadingMore: false,
    error: null,
    socket: null,
    isConnected: false,
    onlineUsers: new Set(),
    userActivities: new Map(),
    messages: [],
    selectedUser: null,
    status: 0,
    message: null,
    chatRooms: [],
    activeRoomId: null,
    currentPage: 1, 
    hasMoreMessages: true,

    setSelectedUser: (user) => {
        // Reset pagination khi chọn user mới
        set({ 
            selectedUser: user, 
            currentPage: 1, 
            hasMoreMessages: true 
        });

        // Tự động load tin nhắn
        if (user) {
            const authStore = useAuthStore.getState();
            if (authStore.user?.id) {
                get().getMessages(authStore.user.id, user.id, 1, true);
            }
        }
    },

    initSocket: (userId) => {
        const store = get();
        // Đóng kết nối cũ nếu có
        if (store.socket && store.socket.readyState === WebSocket.OPEN) {
            store.socket.close();
        }
        const baseURL = import.meta.env.MODE === "development" ? "ws://localhost:8001" : "wss://your-production-url";
        const socket = new WebSocket(`${baseURL}/ws/chat/${userId}/`);
        set({ socket });

        socket.onopen = () => {
            set({ isConnected: true });
            console.log("WebSocket connected");
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("📩 Received event:", data);

                switch (data.type) {
                    case "users_online":
                        set({ onlineUsers: new Set(data.users) });
                        console.log("🟢 Online users updated:", data.users);
                        break;

                    case "receive_message":
                        if (data.message) {
                            console.log("Received message:", data.message);

                            // Cải thiện logic xử lý tin nhắn để tránh duplicate
                            set((state) => {
                                // Tạo bản sao của messages hiện tại
                                let updatedMessages = [...state.messages];
                                const receivedMsg = data.message;

                                // 1. Xóa tin nhắn tạm (pending) có nội dung và người gửi/nhận giống nhau
                                // Đây là thay đổi quan trọng: chúng ta dựa vào cả nội dung và các thông tin khác,
                                // không chỉ dựa vào tempId, vì backend có thể không trả về tempId
                                updatedMessages = updatedMessages.filter(msg => {
                                    // Giữ lại nếu không phải tin nhắn pending
                                    if (!msg.pending) return true;

                                    // Hoặc nếu là pending nhưng không khớp với tin nhắn vừa nhận
                                    const isSameContent = msg.content === receivedMsg.content;
                                    const isSameSender = msg.senderId === receivedMsg.senderId;
                                    const isSameReceiver =
                                        (msg.receiverId === receivedMsg.receiverId) ||
                                        (msg.receiverId === undefined && receivedMsg.receiverId === undefined);

                                    // Loại bỏ nếu khớp tất cả điều kiện
                                    return !(isSameContent && isSameSender && isSameReceiver);
                                });

                                // 2. Thêm tin nhắn mới chỉ khi không tồn tại tin nhắn có cùng id (tránh duplicate)
                                const messageExists = updatedMessages.some(msg => msg.id === receivedMsg.id);
                                if (!messageExists) {
                                    updatedMessages.push({
                                        ...receivedMsg,
                                        pending: false,
                                    });
                                }

                                // 3. Sắp xếp lại tin nhắn theo thời gian
                                return { messages: sortMessagesByDate(updatedMessages) };
                            });
                        }
                        break;

                    case "user_connected":
                        set((state) => ({
                            onlineUsers: new Set([...state.onlineUsers, data.userId]),
                        }));
                        break;
                    case "user_disconnected":
                        set((state) => {
                            const newOnlineUsers = new Set(state.onlineUsers);
                            newOnlineUsers.delete(data.userId);
                            return { onlineUsers: newOnlineUsers };
                        });
                        break;
                    case "error":
                        console.error("WebSocket error:", data.message);
                        toast.error(`Lỗi chat: ${data.message}`);
                        break;
                    default:
                        console.warn("⚠️ Không nhận diện được event type:", data.type);
                }
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        socket.onclose = (event) => {
            console.log(`WebSocket disconnected, code: ${event.code}, reason: ${event.reason || "No reason provided"}`);
            set({ isConnected: false, socket: null });
            // Tự động kết nối lại sau 3 giây nếu không phải đóng có chủ ý
            if (event.code !== 1000) {
                setTimeout(() => {
                    console.log("Reconnecting WebSocket...");
                    get().initSocket(userId);
                }, 3000);
            }
        };
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    },

    disconnectSocket: () => {
        if (get().isConnected && get().socket) {
            get().socket.close();
            set({ isConnected: false, socket: null });
        }
    },

    sendMessage: (receiverId, senderId, content) => {
        const socket = get().socket;
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            toast.error("Kết nối chat bị gián đoạn. Đang thử kết nối lại...");
            get().initSocket(senderId);
            return;
        }

        if (!content.trim()) return;

        const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const now = new Date().toISOString();

        const tempMessage: Message = {
            id: tempId,
            senderId,
            receiverId,
            content,
            createdAt: now,
            updatedAt: now,
            pending: true,
            tempId,
        };

        // Thêm tin nhắn tạm vào state và sắp xếp lại
        set(state => ({
            messages: sortMessagesByDate([...state.messages, tempMessage])
        }));

        // Gửi tin nhắn qua WebSocket
        socket.send(JSON.stringify({
            type: "send_message",
            senderId,
            receiverId,
            content,
            tempId
        }));
    },

    sendGroupMessage: (roomId, senderId, content) => {
        const socket = get().socket;
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            toast.error("Không thể kết nối đến server chat");
            return;
        }
        socket.send(JSON.stringify({
            type: "send_message",
            senderId,
            roomId,
            content
        }));
    },

    loadMoreMessages: async () => {
        const { currentPage, hasMoreMessages, selectedUser, isLoadingMore } = get();
        const userAuth = useAuthStore.getState().user;
        
        // Không load thêm nếu không còn tin nhắn cũ hoặc đang load
        if (!hasMoreMessages || isLoadingMore || !selectedUser || !userAuth?.id) {
            return false;
        }
        
        set({ isLoadingMore: true });
        
        try {
            // Load tin nhắn với trang tiếp theo
            const nextPage = currentPage + 1;
            await get().getMessages(userAuth.id, selectedUser.id, nextPage);
            return true;
        } catch (error) {
            console.error("Lỗi khi tải thêm tin nhắn cũ:", error);
            return false;
        } finally {
            set({ isLoadingMore: false });
        }
    },

    getMessages: async (currentUserId, opponentId, page = 1, reset = false) => {
        if (reset) {
            set({ isLoading: true, messages: [], currentPage: 1, hasMoreMessages: true });
        } else {
            set({ isLoading: page === 1 });
        }
        
        try {
            const response = await getMessages(currentUserId, opponentId, page);
            const fetchedMessages = response.data?.messages || [];
            const pagination = response.data?.pagination || { hasMore: false };
            
            set(state => {
                let allMessages = reset ? [] : [...state.messages];
                
                // Khi load thêm tin nhắn cũ, thêm vào đầu danh sách
                if (page > 1) {
                    // Thêm tin nhắn mới load vào đầu mảng (tin nhắn cũ)
                    allMessages = [...fetchedMessages, ...allMessages];
                } else {
                    // Trang đầu tiên thì ghi đè hoàn toàn
                    allMessages = fetchedMessages;
                }
                
                // Sử dụng Map để xóa duplicate
                const uniqueMessages = new Map();
                allMessages.forEach((msg: Message) => {
                    uniqueMessages.set(msg.id, { ...msg, pending: false });
                });
                
                // Thêm tin nhắn pending vào (nếu có)
                state.messages.forEach((msg: Message) => {
                    if (msg.pending) {
                        uniqueMessages.set(msg.tempId || msg.id, msg);
                    }
                });
                
                // Cập nhật trạng thái phân trang
                return {
                    messages: sortMessagesByDate(Array.from(uniqueMessages.values())),
                    isLoading: false,
                    currentPage: page,
                    hasMoreMessages: pagination.hasMore
                };
            });
            
            return fetchedMessages;
        } catch (error: any) {
            console.error("Lỗi khi lấy tin nhắn:", error);
            const message = error.response?.data?.message || "Không thể lấy tin nhắn";
            set({ error: message, isLoading: false });
            return [];
        }
    },

    getChatRooms: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/api/chats/rooms/');
            set({ chatRooms: response.data.rooms });
            return response.data.rooms;
        } catch (error: any) {
            console.error("Lỗi khi lấy danh sách phòng chat:", error);
            const message = error.response?.data?.message || "Không thể lấy danh sách phòng chat";
            set({ error: message });
            toast.error(message);
            return [];
        } finally {
            set({ isLoading: false });
        }
    },

    setActiveRoom: (roomId) => set({ activeRoomId: roomId }),

    reset: () => {
        set({
            socket: null,
            isConnected: false,
            onlineUsers: new Set(),
            userActivities: new Map(),
            messages: [],
            selectedUser: null,
            isLoading: false,
            error: null,
            status: 0,
            chatRooms: [],
            activeRoomId: null,
        });
    },
}));

// Import useAuthStore để lấy thông tin user hiện tại
import { useAuthStore } from "./useAuthStore";