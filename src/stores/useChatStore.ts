import { toast } from "react-toastify";
import { Message, User } from "@/utils/types";
import { create } from "zustand";
// import { io } from "socke	t.io-client";
import { getMessages } from "@/utils/api/chatApi";
// import { getAllUser } from "@/utils/api/usersApi";

// const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

// const socket = io(baseURL, {
// 	autoConnect: false, // only connect if user is authenticated
// 	withCredentials: true,
// });


interface ChatStore {
	isLoading: boolean;
	error: string | null;
	status: number;

	socket: any;
	isConnected: boolean;
	onlineUsers: Set<string>;
	userActivities: Map<string, string>;
	messages: Message[];
	selectedUser: User | null;

	initSocket: (userId: string) => void;
	disconnectSocket: () => void;
	sendMessage: (receiverId: string, senderId: string, content: string) => void;
	getMessages: (currentUserId: string, opponentId: string) => Promise<any>;
	setSelectedUser: (user: User | null) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
	users: [],
	isLoading: false,
	error: null,
	socket: null,
	isConnected: false,
	onlineUsers: new Set(),
	userActivities: new Map(),
	messages: [],
	selectedUser: null,
	status: 0,
	message: null,

	setSelectedUser: (user) => set({ selectedUser: user }),

	initSocket: (userId) => {
		if (!get().isConnected) {
			const baseURL = import.meta.env.MODE === "development" ? "ws://localhost:8001" : "wss://your-production-url";
			const socket = new WebSocket(`${baseURL}/ws/chat/${userId}/`);
			set({ socket: socket })
			socket.onopen = () => {
				set({ isConnected: true, socket });
				console.log("WebSocket connected");
			};

			socket.onmessage = (event) => {
				const data = JSON.parse(event.data);
				console.log("📩 Received event:", data);

				switch (data.type) {
					case "users_online":
						set({ onlineUsers: new Set(data.users) });
						console.log("🟢 Online users updated:", data.users);
						break;

					case "receive_message":
						console.log("📨 New message:", data);
						set((state) => ({
							messages: [...state.messages, data.message],
						}));
						break;

					case "user_connected":
						set((state) => ({
							onlineUsers: new Set([...state.onlineUsers, data.userId]),
						}));
						console.log(`✅ ${data.userId} vừa online`);
						break;

					case "user_disconnected":
						set((state) => {
							const newOnlineUsers = new Set(state.onlineUsers);
							newOnlineUsers.delete(data.userId);
							return { onlineUsers: newOnlineUsers };
						});
						console.log(`❌ ${data.userId} vừa offline`);
						break;

					case "activities":
						set({ userActivities: new Map(data.activities) });
						console.log(`❌ ${data.userId} vừa offline`);
						break;

					case "message_sent":
						set((state) => ({
							messages: [...state.messages, data.message],
						}));
						console.log(`❌ ${data.userId} vừa offline`);
						break;

					case "activity_updated":
						set((state) => {
							const newActivities = new Map(state.userActivities);
							newActivities.set(userId, data.activity);
							return { userActivities: newActivities };
						});
						console.log(`❌ ${data.userId} vừa offline`);
						break;

					default:
						console.warn("⚠️ Không nhận diện được event type:", data.type);
				}
			};

			socket.onclose = () => {
				set({ isConnected: false, socket: null });
				console.log("WebSocket disconnected");
			};
		}
	},

	disconnectSocket: () => {
		if (get().isConnected) {
			get().socket.disconnect();
			set({ isConnected: false });
		}
	},

	sendMessage: async (receiverId, senderId, content) => {
		const socket = get().socket;
		if (!socket) return;

		socket.emit("send_message", { receiverId, senderId, content });
	},

	getMessages: async (currentUserId, opponentId) => {
		set({ isLoading: true, error: null });

		try {
			const response = await getMessages(currentUserId, opponentId);
			const { messages } = response.data;

			return messages;
		} catch (error: any) {
			console.error(error)
			const { message } = error.response.data;
			set({ error: message });

			toast.error(message);
			return message;
		} finally {
			set({ isLoading: false });
		}
	},

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
		});
	},
}));