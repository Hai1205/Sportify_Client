import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { checkArtist, login, logout, refreshToken, register, registerAdmin, changePassword } from './../utils/api/authApi';
import { checkAdmin } from "@/utils/api/authApi";
import { User } from "../utils/types";

interface AuthStore {
	user: User | null;
	isAuth: boolean;
	isArtist: boolean;
	isAdmin: boolean;
	isLoading: boolean;
	error: string | null;

	checkAdmin: () => Promise<void>;
	checkArtist: () => Promise<void>;
	register: (formData: FormData) => Promise<void>;
	registerAdmin: (formData: FormData) => Promise<void>;
	login: (formData: FormData) => Promise<void>;
	logout: () => Promise<void>;
	changePassword: (userId: string, formData: FormData) => Promise<void>;
	refreshToken: () => Promise<void>;
	setUserAuth: (user: User | null) => void;
	reset: () => void;
}

export const useAuthStore = create<AuthStore>()(
	persist(
		(set, get) => ({
			user: null,
			isAuth: false,
			isArtist: false,
			isAdmin: false,
			isLoading: false,
			error: null,

			checkAdmin: async () => {
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

			checkArtist: async () => {
				set({ isLoading: true, error: null });

				try {
					const response = await checkArtist();
					const data: boolean = response.data.isArtist;

					set({ isArtist: data });
				} catch (error: any) {
					set({ isArtist: false, error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			register: async (formData) => {
				set({ isLoading: true, error: null });

				try {
					await register(formData);
				} catch (error: any) {
					set({ error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			registerAdmin: async (formData) => {
				set({ isLoading: true, error: null });

				try {
					await registerAdmin(formData);
				} catch (error: any) {
					set({ error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			login: async (formData) => {
				set({ isLoading: true, error: null });

				try {
					const response = await login(formData);
					const data: User = response.data.user;

					set({ user: data, isAuth: true });

					await get().checkAdmin();
				} catch (error: any) {
					set({ user: null, error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			logout: async () => {
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

			changePassword: async (userId, formData) => {
				set({ isLoading: true, error: null });

				try {
					await changePassword(userId, formData);
				} catch (error: any) {
					set({ error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			refreshToken: async () => {
				set({ isLoading: true, error: null });

				try {
					await refreshToken();
				} catch (error: any) {
					set({ error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			setUserAuth: (user) => {
				set({ user: user });
			},

			reset: () => {
				set({ 
					user: null, 
					isAdmin: false, 
					isArtist: false, 
					isLoading: false, 
					error: null 
				});
			},
		}),

		{
			name: "auth-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);


