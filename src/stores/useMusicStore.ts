import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Album, Song, Stats } from "@/utils/types";
import { deleteAlbum, getAlbum, getAllAlbum, getUserAlbums, uploadAlbum } from "@/utils/api/albumApi";
import { deleteSong, getFeaturedSongs, getMadeForYouSongs, getAllSong, getTrendingSongs } from "@/utils/api/songApi";
import { getStats } from "@/utils/api/statsApi";

interface MusicStore {
	songs: Song[];
	albums: Album[];
	currentAlbum: Album | null;
	featuredSongs: Song[];
	madeForYouSongs: Song[];
	trendingSongs: Song[];
	stats: Stats;
	isLoading: boolean;
	error: string | null;

	getAllAlbum: () => Promise<void>;
	uploadAlbum: (userId: string, formData: FormData) => Promise<void>;
	getAlbum: (id: string) => Promise<void>;
	getUserAlbums: (userId: string) => Promise<void>;
	getFeaturedSongs: () => Promise<void>;
	getMadeForYouSongs: () => Promise<void>;
	getTrendingSongs: () => Promise<void>;
	getStats: () => Promise<void>;
	getAllSong: () => Promise<void>;
	deleteSong: (id: string) => Promise<void>;
	deleteAlbum: (id: string) => Promise<void>;
	reset: () => void;
}

export const useMusicStore = create<MusicStore>()(
	persist(
		(set) => ({
			albums: [],
			songs: [],
			isLoading: false,
			error: null,
			currentAlbum: null,
			madeForYouSongs: [],
			featuredSongs: [],
			trendingSongs: [],
			stats: {
				totalSongs: 0,
				totalAlbums: 0,
				totalUsers: 0,
				totalArtists: 0,
			},

			deleteSong: async (id) => {
				set({ isLoading: true, error: null });

				try {
					await deleteSong(id);

					set((state) => ({
						songs: state.songs.filter((song) => song.id !== id),
					}));

					toast.success("Song deleted successfully");
				} catch (error: any) {
					console.log("Error in deleteSong", error);
					toast.error("Error deleting song");
				} finally {
					set({ isLoading: false });
				}
			},

			deleteAlbum: async (id) => {
				set({ isLoading: true, error: null });

				try {
					await deleteAlbum(id);

					set((state) => ({
						albums: state.albums.filter((album) => album.id !== id),
						songs: state.songs.map((song) =>
							song?.album?.id === state.albums.find((a) => a.id === id)?.title ? { ...song, album: null } : song
						),
					}));

					toast.success("Album deleted successfully");
				} catch (error: any) {
					toast.error("Failed to delete album: " + error.message);
				} finally {
					set({ isLoading: false });
				}
			},

			getAllSong: async () => {
				set({ isLoading: true, error: null });

				try {
					const response = await getAllSong();
					const data = response.data.songs;

					set({ songs: data });
				} catch (error: any) {
					set({ error: error.message });
				} finally {
					set({ isLoading: false });
				}
			},

			uploadAlbum: async (userId, formData) => {
				set({ isLoading: true, error: null });

				try {
					await uploadAlbum(userId, formData);
				} catch (error: any) {
					set({ error: error.message });
				} finally {
					set({ isLoading: false });
				}
			},

			getStats: async () => {
				set({ isLoading: true, error: null });

				try {
					const response = await getStats();
					const data = response.data;

					set({ stats: data });
				} catch (error: any) {
					set({ error: error.message });
				} finally {
					set({ isLoading: false });
				}
			},

			getAllAlbum: async () => {
				set({ isLoading: true, error: null });

				try {
					const response = await getAllAlbum();
					const data = response.data.albums;

					set({ albums: data });
				} catch (error: any) {
					set({ error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			getAlbum: async (id) => {
				set({ isLoading: true, error: null });

				try {
					const response = await getAlbum(id);
					const data = response.data.album;

					set({ currentAlbum: data });
				} catch (error: any) {
					set({ error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			getUserAlbums: async (userId) => {
				set({ isLoading: true, error: null });

				try {
					const response = await getUserAlbums(userId);
					const data = response.data.album;

					set({ currentAlbum: data });
				} catch (error: any) {
					set({ error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			getFeaturedSongs: async () => {
				set({ isLoading: true, error: null });

				try {
					const response = await getFeaturedSongs();
					const data = response.data.songs;

					set({ featuredSongs: data });
				} catch (error: any) {
					set({ error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			getMadeForYouSongs: async () => {
				set({ isLoading: true, error: null });

				try {
					const response = await getMadeForYouSongs();
					const data = response.data.songs;

					set({ madeForYouSongs: data });
				} catch (error: any) {
					set({ error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			getTrendingSongs: async () => {
				set({ isLoading: true, error: null });

				try {
					const response = await getTrendingSongs();
					const data = response.data.songs;

					set({ trendingSongs: data });
				} catch (error: any) {
					set({ error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			reset: () => {
				set({
					albums: [],
					songs: [],
					currentAlbum: null,
					madeForYouSongs: [],
					featuredSongs: [],
					trendingSongs: [],
					stats: {
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
			name: "music-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);