import { login, logout, refreshToken, register, registerAdmin } from './../utils/api/authApi';
import { checkAdmin } from "@/utils/api/authApi";
import { create } from "zustand";
import { FormData, User } from "../utils/types";

interface AuthStore {
	user: User | null;
	isAuth: boolean;
	isAdmin: boolean;
	isLoading: boolean;
	error: string | null;

	checkAdminStatus: () => Promise<void>;
	registerUser: (formData: FormData) => Promise<void>;
	registerAdminUser: (formData: FormData) => Promise<void>;
	loginUser: (formData: FormData) => Promise<void>;
	logoutUser: () => Promise<void>;
	refreshTokenUser: () => Promise<void>;
	reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	isAuth: false,
	isAdmin: false,
	isLoading: false,
	error: null,

	checkAdminStatus: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await checkAdmin();
			const data: boolean = response.data.isAdmin;
			
			set({ isAdmin: data });
		} catch (error: any) {
			set({ isAdmin: false, error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
	
	registerUser: async (formData) => {
		set({ isLoading: true, error: null });
		try {
			await register(formData);
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
	
	registerAdminUser: async (formData) => {
		set({ isLoading: true, error: null });
		try {
			await registerAdmin(formData);
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	loginUser: async (formData) => {
		set({ isLoading: true, error: null });
		try {
			const response = await login(formData);
			const data: User = response.data.user;

			set({ user: data, isAuth: true });

			await useAuthStore.getState().checkAdminStatus();
		} catch (error: any) {
			set({ user: null, error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	logoutUser: async () => {
		set({ isLoading: true, error: null });
		try {
			await logout();
			
			set({ isAuth: false, isAdmin: false, user: null });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	refreshTokenUser: async () => {
		set({ isLoading: true, error: null });
		try {
			await refreshToken();
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	reset: () => {
		set({ isAdmin: false, isLoading: false, error: null });
	},
}));

