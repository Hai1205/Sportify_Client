import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { followUser, searchUsers, suggestedUser } from './../utils/api/usersApi';
import { User } from "../utils/types";
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
    user: User | null;
    users: User[];
    isLoading: boolean;
    error: string | null;

    getAllUser: () => Promise<void>;
    getUser: (userId: string) => Promise<void>;
    updateUser: (userId: string, formData: FormData) => Promise<void>;
    deleteUser: (userId: string) => Promise<void>;
    followUser: (currentUserId: string, opponentId: string) => Promise<void>;
    suggestedUser: (userId: string) => Promise<void>;
    requireUpdateUserToArtist: (userId: string) => Promise<void>;
    responseUpdateUserToArtist: (userId: string) => Promise<void>;
    searchUsers: (query: string) => Promise<void>;
    reset: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            users: [],
            isLoading: false,
            error: null,

            getAllUser: async () => {
                set({ isLoading: true, error: null });

                try {
                    const response = await getAllUser();
                    const data: User[] = response.data.users;

                    set({ users: data });
                } catch (error: any) {
                    set({ users: [], error: error.response.data.message });
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
                    set({ error: error.response.data.message });
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
                    set({ error: error.response.data.message });
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
                    set({ error: error.response.data.message });
                } finally {
                    set({ isLoading: false });
                }
            },

            updateUser: async (userId, formData) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await updateUser(userId, formData);
                    const data: User = response.data.user;

                    useAuthStore.getState().setUserAuth(data)
                } catch (error: any) {
                    set({ error: error.response.data.message });
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
                    set({ user: null, error: error.response.data.message });
                } finally {
                    set({ isLoading: false });
                }
            },

            requireUpdateUserToArtist: async (userId) => {
                set({ isLoading: true, error: null });

                try {
                    await requireUpdateUserToArtist(userId);
                } catch (error: any) {
                    set({ error: error.response.data.message });
                } finally {
                    set({ isLoading: false });
                }
            },

            responseUpdateUserToArtist: async (userId) => {
                set({ isLoading: true, error: null });

                try {
                    await responseUpdateUserToArtist(userId);
                } catch (error: any) {
                    set({ error: error.response.data.message });
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
                    set({ error: error.response.data.message });
                } finally {
                    set({ isLoading: false });
                }
            },

            reset: () => {
                set({ user: null, users: [], isLoading: false, error: null });
            },
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);