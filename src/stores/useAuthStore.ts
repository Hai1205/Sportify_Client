import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
	checkArtist,
	login,
	logout,
	refreshToken,
	register,
	changePassword,
	resetPassword,
	sendOTP,
	checkOTP,
	forgotPassword,
	loginWithGoogle
} from './../utils/api/authApi';
import { checkAdmin } from "@/utils/api/authApi";
import { useUserStore } from "./useUserStore";
import { useMusicStore } from "./useMusicStore";
import { usePlayerStore } from "./usePlayerStore";
import { useStatStore } from "./useStatStore";
import { User } from "@/utils/types";

export interface AuthStore {
	status: number;
	message: string | null;
	isLoading: boolean;
	error: string | null;
	user: User | null;
	isAuth: boolean;
	isArtist: boolean;
	isAdmin: boolean;

	checkAdmin: () => Promise<any>;
	checkArtist: () => Promise<any>;
	sendOTP: (email: string) => Promise<any>;
	checkOTP: (email: string, OTP: string) => Promise<any>;
	register: (formData: FormData) => Promise<any>;
	login: (formData: FormData) => Promise<any>;
	loginWithGoogle: (formData: FormData) => Promise<any>;
	logout: () => Promise<any>;
	forgotPassword: (userId: string, formData: FormData) => Promise<any>;
	changePassword: (userId: string, formData: FormData) => Promise<any>;
	resetPassword: (userId: string) => Promise<any>;
	refreshToken: () => Promise<any>;
	setUserAuth: (user: User | null) => any;
	reset: () => any;
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
			status: 0,
			message: null,

			checkAdmin: async () => {
				set({ isLoading: true, error: null });

				try {
					const response = await checkAdmin();
					const data: boolean = response.data.isAdmin;

					set({ isAdmin: data });
				} catch (error: any) {
					console.log(error)
					const message = error.response.data.message;
					set({ isAdmin: false, error: message });
					
					return message;
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
					console.log(error)
					const message = error.response.data.message;
					set({ isArtist: false, error: message });

					return message;
				} finally {
					set({ isLoading: false });
				}
			},

			sendOTP: async (email) => {
				set({ isLoading: true, error: null });

				try {
					await sendOTP(email);
				} catch (error: any) {
					console.log(error)
					const message = error.response.data.message;
					set({ isArtist: false, error: message });

					return message;
				} finally {
					set({ isLoading: false });
				}
			},

			checkOTP: async (email, OTP) => {
				set({ isLoading: true, error: null });

				try {
					await checkOTP(email, OTP);
				} catch (error: any) {
					console.log(error)
					const message = error.response.data.message;
					set({ isArtist: false, error: message });

					return message;
				} finally {
					set({ isLoading: false });
				}
			},

			register: async (formData) => {
				set({ isLoading: true, error: null });

				try {
					return await register(formData);
				} catch (error: any) {
					console.log(error)
					const message = error.response.data.message;
					set({ error: message });

					return message;
				} finally {
					set({ isLoading: false });
				}
			},

			login: async (formData) => {
				set({ isLoading: true, error: null });

				try {
					const response = await login(formData);
					const { user, isVerified } = response.data;

					if (isVerified) {
						set({ user, isAuth: true })
						await get().checkAdmin();
					}
					
					return {user: user, isVerified};
				} catch (error: any) {
					console.log(error)
					const message = error.response.data.message;
					set({ user: null, error: message });

					return message;
				} finally {
					set({ isLoading: false });
				}
			},

			loginWithGoogle: async (formData) => {
				set({ isLoading: true, error: null });

				try {
					const response = await loginWithGoogle(formData);
					const { user } = response.data;

					set({ user, isAuth: true })
					await get().checkAdmin();
					
					return {user: user};
				} catch (error: any) {
					console.log(error)
					const message = error.response.data.message;
					set({ user: null, error: message });

					return message;
				} finally {
					set({ isLoading: false });
				}
			},

			logout: async () => {
				set({ isLoading: true, error: null });

				try {
					await logout();

					get().reset();
				} catch (error: any) {
					console.log(error)
					const message = error.response.data.message;
					set({ error: message });

					return message;
				} finally {
					set({ isLoading: false });
				}
			},

			changePassword: async (userId, formData) => {
				set({ isLoading: true, error: null });

				try {
					await changePassword(userId, formData);
				} catch (error: any) {
					console.log(error)
					const message = error.response.data.message;
					set({ error: message });

					return message;
				} finally {
					set({ isLoading: false });
				}
			},

			forgotPassword: async (userId, formData) => {
				set({ isLoading: true, error: null });

				try {
					await forgotPassword(userId, formData);
				} catch (error: any) {
					set({ error: error });
					console.log(error)
					const message = error.response.data.message;

					return message;
				} finally {
					set({ isLoading: false });
				}
			},

			resetPassword: async (userId) => {
				set({ isLoading: true, error: null });

				try {
					await resetPassword(userId);
				} catch (error: any) {
					console.log(error)
					const message = error.response.data.message;
					set({ error: message });

					return message;
				} finally {
					set({ isLoading: false });
				}
			},

			refreshToken: async () => {
				set({ isLoading: true, error: null });

				try {
					await refreshToken();
				} catch (error: any) {
					console.log(error)
					const message = error.response.data.message;
					set({ error: message });

					return message;
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
					status: 0,
					message: null,
					isAdmin: false,
					isArtist: false,
					isAuth: false,
					isLoading: false,
					error: null
				});

				useUserStore.getState().reset();
				useMusicStore.getState().reset();
				usePlayerStore.getState().reset();
				useStatStore.getState().reset();
				useUserStore.getState().reset();
			},
		}),

		{
			name: "auth-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);


