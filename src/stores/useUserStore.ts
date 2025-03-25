import { toast } from "react-toastify";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
    followUser,
    searchUsers,
    getSuggestedUsers,
    getArtistApplicatioins,
    deleteArtistApplicatioin,
    getUserByRole,
    createUser,
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
    getSuggestedUsers: (userId: string) => Promise<any>;
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
                    const { users } = response.data;

                    set({ users: users });
                } catch (error: any) {
                    console.log(error)
                    const { message } = error.response.data;
                    set({ users: [], error: message });

                    toast.error(message);
                    return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            getUserByRole: async (role) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await getUserByRole(role);
                    const { users } = response.data

                    return users;
                } catch (error: any) {
                    console.log(error)
                    const { message } = error.response.data;
                    set({ users: [], error: message });

                    toast.error(message);
                    return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            getUser: async (userId) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await getUser(userId);
                    const { user } = response.data;

                    set({ user: user });
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

            followUser: async (currentUserId, opponentId) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await followUser(currentUserId, opponentId);
                    const { user, message } = response.data;

                    useAuthStore.getState().setUserAuth(user);
                    toast.success(message);
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

            getSuggestedUsers: async (userId) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await getSuggestedUsers(userId);
                    const { users } = response.data;

                    // set({ users: users });
                    return users;
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

            createUser: async (formData) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await createUser(formData);
                    const { message } = response.data;

                    toast.success(message);
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

            updateUser: async (userId, formData) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await updateUser(userId, formData);
                    const { user, message } = response.data;

                    const userAuthId = useAuthStore.getState().user?.id;
                    if (userId === userAuthId) {
                        useAuthStore.getState().setUserAuth(user);
                    }

                    toast.success(message);
                    return user;
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

            deleteUser: async (userId) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await deleteUser(userId);
                    const { message } = response.data;

                    toast.success(message);
                } catch (error: any) {
                    console.log(error)
                    const { message } = error.response.data;
                    set({ user: null, error: message });

                    toast.error(message);
                    return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            requireUpdateUserToArtist: async (userId) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await requireUpdateUserToArtist(userId);
                    const { message } = response.data;

                    toast.success(message);
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

            responseUpdateUserToArtist: async (userId) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await responseUpdateUserToArtist(userId);
                    const { message } = response.data;

                    toast.success(message);
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

            searchUsers: async (query) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await searchUsers(query);
                    const { users } = response.data;

                    return users;
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

            getArtistApplicatioins: async (status) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await getArtistApplicatioins(status);
                    const { artistApplications } = response.data;

                    return artistApplications;
                } catch (error: any) {
                    console.log(error)
                    const { message } = error.response.data;
                    set({ users: [], error: message });

                    toast.error(message);
                    return message;
                } finally {
                    set({ isLoading: false });
                }
            },

            deleteArtistApplicatioin: async (applicationId) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await deleteArtistApplicatioin(applicationId);
                    const { message } = response.data;

                    toast.success(message);
                } catch (error: any) {
                    console.log(error)
                    const { message } = error.response.data;
                    set({ users: [], error: message });

                    toast.error(message);
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
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);