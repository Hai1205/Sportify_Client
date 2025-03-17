import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
    GeneralStat,
    Song,
    StatStore,
    User,
    // UserActivityStat
} from "@/utils/types";
import {
    getGeneralStat,
    getPopularSongsStat,
    getTopArtistsStat,
    // getUserActivityStat
} from "@/utils/api/statsApi";

export const useMusicStore = create<StatStore>()(
    persist(
        (set) => ({
            isLoading: false,
            error: null,
            songs: [],
            users: [],
            // userActivityStats: [],
            generalStat: {
                totalSongs: 0,
                totalAlbums: 0,
                totalUsers: 0,
                totalArtists: 0,
            },

            getGeneralStat: async () => {
                set({ isLoading: true, error: null });

                try {
                    const response = await getGeneralStat();
                    const data: GeneralStat = response.data.generalStat;

                    set({ generalStat: data });
                } catch (error: any) {
                    set({ error: error.message });
                } finally {
                    set({ isLoading: false });
                }
            },

            // getUserActivityStat: async (days) => {
            //     set({ isLoading: true, error: null });

            //     try {
            //         const response = await getUserActivityStat(days);
            //         const data: UserActivityStat[] = response.data.userActivityStats;

            //         set({ userActivityStats: data });
            //     } catch (error: any) {
            //         set({ error: error.message });
            //     } finally {
            //         set({ isLoading: false });
            //     }
            // },

            getPopularSongsStat: async () => {
                set({ isLoading: true, error: null });

                try {
                    const response = await getPopularSongsStat();
                    const data: Song[] = response.data.songs;

                    set({ songs: data });
                } catch (error: any) {
                    set({ error: error.message });
                } finally {
                    set({ isLoading: false });
                }
            },

            getTopArtistsStat: async () => {
                set({ isLoading: true, error: null });

                try {
                    const response = await getTopArtistsStat();
                    const data: User[] = response.data.users;

                    set({ users: data });
                } catch (error: any) {
                    set({ error: error.message });
                } finally {
                    set({ isLoading: false });
                }
            },

            reset: () => {
                set({
                    songs: [],
                    users: [],
                    // userActivityStats: [],
                    generalStat: {
                        totalSongs: 0,
                        totalAlbums: 0,
                        totalUsers: 0,
                        totalArtists: 0,
                    },
                    isLoading: false,
                    error: null,
                })
            },
        }),

        {
            name: "stat-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);