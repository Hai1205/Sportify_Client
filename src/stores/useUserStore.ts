import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
    followUser,
    searchUsers,
    suggestedUser,
    getArtistApplicatioins,
    deleteArtistApplicatioin,
    getUserByRole,
    createUser
} from './../utils/api/usersApi';
import { ArtistApplication, User } from "../utils/types";
import {
    getAllUser,
    getUser,
    deleteUser,
    updateUser,
    requireUpdateUserToArtist,
    responseUpdateUserToArtist
} from '@/utils/api/usersApi';
import { useAuthStore } from "./useAuthStore";

interface UserStore {
	isLoading: boolean;
	error: string | null;
	status: number;
	message: string | null;
	user: User | null;
	users: User[];
	artistApplications: ArtistApplication[];

	getAllUser: () => Promise<any>;
	getUserByRole: (role: string) => Promise<any>;
	getUser: (userId: string) => Promise<any>;
	createUser: (formData: FormData) => Promise<any>;
	updateUser: (userId: string, formData: FormData) => Promise<any>;
	deleteUser: (userId: string) => Promise<any>;
	followUser: (currentUserId: string, opponentId: string) => Promise<any>;
	suggestedUser: (userId: string) => Promise<any>;
	requireUpdateUserToArtist: (userId: string) => Promise<any>;
	responseUpdateUserToArtist: (userId: string) => Promise<any>;
	searchUsers: (query: string) => Promise<any>;
	getArtistApplicatioins: (status: string) => Promise<any>;
	deleteArtistApplicatioin: (applicationId: string) => Promise<any>;
	reset: () => any;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            users: [],
            artistApplications: [],
            isLoading: false,
            error: null,
            status: 0,
            message: null,

            getAllUser: async () => {
                set({ isLoading: true, error: null });

                try {
                    const response = await getAllUser();
                    const data: User[] = response.data.users;

                    set({ users: data });
                } catch (error: any) {
                    console.log(error)
					const message = error.response.data.message;
                    set({ users: [], error: message });

					return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            getUserByRole: async (role) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await getUserByRole(role);
                    const data: User[] = response.data.users;
                    console.log(data)
                    return data;

                    set({ users: data });
                } catch (error: any) {
                    console.log(error)
					const message = error.response.data.message;
                    set({ users: [], error: message });

					return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            getUser: async (userId) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await getUser(userId);
                    const data: User = response.data.user;

                    set({ user: data });
                } catch (error: any) {
                    console.log(error)
					const message = error.response.data.message;
                    set({ error: message });

					return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            followUser: async (currentUserId, opponentId) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await followUser(currentUserId, opponentId);
                    const data: User = response.data.user;

                    set({ user: data });
                } catch (error: any) {
                    console.log(error)
					const message = error.response.data.message;
                    set({ error: message });

					return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            suggestedUser: async (userId) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await suggestedUser(userId);
                    const data: User = response.data.user;

                    set({ user: data });
                } catch (error: any) {
                    console.log(error)
					const message = error.response.data.message;
                    set({ error: message });

					return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            createUser: async (formData) => {
                set({ isLoading: true, error: null });

                try {
                    await createUser(formData);
                } catch (error: any) {
                    console.log(error)
					const message = error.response.data.message;
                    set({ error: message });
                    
					return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            updateUser: async (userId, formData) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await updateUser(userId, formData);
                    const data: User = response.data.user;

                    if (userId === useAuthStore.getState().user?.id) {
                        useAuthStore.getState().setUserAuth(data);
                    }
                } catch (error: any) {
                    console.log(error)
					const message = error.response.data.message;
                    set({ error: message });

					return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            deleteUser: async (userId) => {
                set({ isLoading: true, error: null });

                try {
                    await deleteUser(userId);

                    useAuthStore.getState().setUserAuth(null)
                } catch (error: any) {
                    console.log(error)
					const message = error.response.data.message;
                    set({ user: null, error: message });

					return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            requireUpdateUserToArtist: async (userId) => {
                set({ isLoading: true, error: null });

                try {
                    await requireUpdateUserToArtist(userId);
                } catch (error: any) {
                    console.log(error)
					const message = error.response.data.message;
                    set({ error: message });

					return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            responseUpdateUserToArtist: async (userId) => {
                set({ isLoading: true, error: null });

                try {
                    await responseUpdateUserToArtist(userId);
                } catch (error: any) {
                    console.log(error)
					const message = error.response.data.message;
                    set({ error: message });

					return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            searchUsers: async (query) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await searchUsers(query);
                    const data: User[] = response.data.users;

                    set({ users: data });
                } catch (error: any) {
                    console.log(error)
					const message = error.response.data.message;
                    set({ error: message });

					return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            getArtistApplicatioins: async (status) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await getArtistApplicatioins(status);
                    const data: ArtistApplication[] = response.data.artistApplications;

                    set({ artistApplications: data });
                } catch (error: any) {
                    console.log(error)
					const message = error.response.data.message;
                    set({ users: [], error: message });

					return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            deleteArtistApplicatioin: async (applicationId) => {
                set({ isLoading: true, error: null });

                try {
                    await deleteArtistApplicatioin(applicationId);
                } catch (error: any) {
                    console.log(error)
					const message = error.response.data.message;
                    set({ users: [], error: message });
                    
					return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            reset: () => {
                set({
                    user: null,
                    users: [],
                    artistApplications: [],
                    isLoading: false,
                    error: null,
                    status: 0,
                    message: null,
                });
            },
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);