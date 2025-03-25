import { toast } from "react-toastify";
import { Message, User } from "@/utils/types";
import { create } from "zustand";
import { io } from "socket.io-client";
import { getMessages } from "@/utils/api/chatApi";
// import { getAllUser } from "@/utils/api/usersApi";

const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

const socket = io(baseURL, {
	autoConnect: false, // only connect if user is authenticated
	withCredentials: true,
});

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
	socket: socket,
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
			socket.auth = { userId };
			socket.connect();

			socket.emit("user_connected", userId);

			socket.on("users_online", (users: string[]) => {
				set({ onlineUsers: new Set(users) });
			});

			socket.on("activities", (activities: [string, string][]) => {
				set({ userActivities: new Map(activities) });
			});

			socket.on("user_connected", (userId: string) => {
				set((state) => ({
					onlineUsers: new Set([...state.onlineUsers, userId]),
				}));
			});

			socket.on("user_disconnected", (userId: string) => {
				set((state) => {
					const newOnlineUsers = new Set(state.onlineUsers);
					newOnlineUsers.delete(userId);
					return { onlineUsers: newOnlineUsers };
				});
			});

			socket.on("receive_message", (message: Message) => {
				set((state) => ({
					messages: [...state.messages, message],
				}));
			});

			socket.on("message_sent", (message: Message) => {
				set((state) => ({
					messages: [...state.messages, message],
				}));
			});

			socket.on("activity_updated", ({ userId, activity }) => {
				set((state) => {
					const newActivities = new Map(state.userActivities);
					newActivities.set(userId, activity);
					return { userActivities: newActivities };
				});
			});

			set({ isConnected: true });
		}
	},

	disconnectSocket: () => {
		if (get().isConnected) {
			socket.disconnect();
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
			const {messages} = response.data;

			return messages;
		} catch (error: any) {
			console.log(error)
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
			socket: socket,
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