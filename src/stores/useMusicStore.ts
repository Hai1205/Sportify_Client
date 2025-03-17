import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Album, MusicStore, Song } from "@/utils/types";
import {
	deleteAlbum,
	getAlbum,
	getAllAlbum,
	getUserAlbums,
	uploadAlbum,
	updateAlbum,
	searchAlbums
} from "@/utils/api/albumApi";
import {
	deleteSong,
	getFeaturedSongs,
	getMadeForYouSongs,
	getAllSong,
	getTrendingSongs,
	getSong,
	updateSong,
	addSongToAlbum,
	downloadSong,
	searchSongs,
	increaseSongView,
	uploadSong
} from "@/utils/api/songApi";

export const useMusicStore = create<MusicStore>()(
	persist(
		(set) => ({
			albums: [],
			songs: [],
			isLoading: false,
			error: null,
			currentAlbum: null,
			song: null,
			madeForYouSongs: [],
			featuredSongs: [],
			trendingSongs: [],

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
					const data: Song[] = response.data.songs;

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

			uploadSong: async (userId, formData) => {
				set({ isLoading: true, error: null });

				try {
					await uploadSong(userId, formData);
				} catch (error: any) {
					set({ error: error.message });
				} finally {
					set({ isLoading: false });
				}
			},

			updateAlbum: async (id, formData) => {
				set({ isLoading: true, error: null });

				try {
					const response = await updateAlbum(id, formData);
					const data: Album = response.data.album;

					set({ currentAlbum: data });
				} catch (error: any) {
					set({ error: error.message });
				} finally {
					set({ isLoading: false });
				}
			},

			searchAlbums: async (query) => {
				set({ isLoading: true, error: null });

				try {
					const response = await searchAlbums(query);
					const data: Album[] = response.data.albums;

					set({ albums: data });
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
					const data: Album[] = response.data.albums;

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
					const data: Album = response.data.album;

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
					const data: Album = response.data.album;

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
					const data: Song[] = response.data.songs;

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
					const data: Song[] = response.data.songs;

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
					const data: Song[] = response.data.songs;

					set({ trendingSongs: data });
				} catch (error: any) {
					set({ error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			updateSong: async (songId, formData) => {
				set({ isLoading: true, error: null });

				try {
					const response = await updateSong(songId, formData);
					const data: Song = response.data.song;

					set({ song: data });
				} catch (error: any) {
					set({ error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			addSongToAlbum: async (id, albumId) => {
				set({ isLoading: true, error: null });

				try {
					await addSongToAlbum(id, albumId);
				} catch (error: any) {
					set({ error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			downloadSong: async (id) => {
				set({ isLoading: true, error: null });

				try {
					await downloadSong(id);
				} catch (error: any) {
					set({ error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			getSong: async (id) => {
				set({ isLoading: true, error: null });

				try {
					const response = await getSong(id);
					const data: Song = response.data.song;

					set({ song: data });
				} catch (error: any) {
					set({ error: error.response.data.message });
				} finally {
					set({ isLoading: false });
				}
			},

			searchSongs: async (query) => {
				set({ isLoading: true, error: null });

				try {
					const response = await searchSongs(query);
					const data: Song[] = response.data.songs;

					set({ songs: data });
				} catch (error: any) {
					set({ error: error.message });
				} finally {
					set({ isLoading: false });
				}
			},

			increaseSongView: async (songId) => {
				set({ isLoading: true, error: null });

				try {
					await increaseSongView(songId);
				} catch (error: any) {
					set({ error: error.message });
				} finally {
					set({ isLoading: false });
				}
			},

			reset: () => {
				set({
					albums: [],
					songs: [],
					currentAlbum: null,
					song: null,
					madeForYouSongs: [],
					featuredSongs: [],
					trendingSongs: [],
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