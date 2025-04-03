import { toast } from "react-toastify";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Album, Song } from "@/utils/types";
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
	uploadSong,
	likeSong,
	getUserLikedSong
} from "@/utils/api/songApi";
import { useAuthStore } from "./useAuthStore";

interface MusicStore {
	isLoading: boolean;
	error: string | null;
	status: number;
	message: string | null;
	songs: Song[];
	albums: Album[];

	getAllAlbum: () => Promise<any>;
	uploadAlbum: (userId: string, formData: FormData) => Promise<any>;
	getAlbum: (id: string) => Promise<any>;
	updateAlbum: (id: string, formData: FormData) => Promise<any>;
	deleteAlbum: (id: string) => Promise<any>;
	getUserAlbums: (userId: string) => Promise<any>;
	searchAlbums: (query: string) => Promise<any>;
	getFeaturedSongs: () => Promise<any>;
	getMadeForYouSongs: () => Promise<any>;
	getTrendingSongs: () => Promise<any>;
	getAllSong: () => Promise<any>;
	getSong: (id: string) => Promise<any>;
	uploadSong: (userId: string, formData: FormData) => Promise<any>;
	updateSong(id: string, formData: FormData): Promise<any>;
	addSongToAlbum(id: string, albumId: string): Promise<any>;
	downloadSong: (id: string) => Promise<any>;
	deleteSong: (id: string) => Promise<any>;
	searchSongs: (query: string) => Promise<any>;
	increaseSongView: (songID: string) => Promise<any>;
    likeSong: (userId: string, songId: string) => Promise<any>;
	getUserLikedSong: (userId: string) => Promise<any>;
	reset: () => any;
}

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
			status: 0,
			message: null,

			deleteSong: async (id) => {
				set({ isLoading: true, error: null });

				try {
					const response = await deleteSong(id);
					const { message } = response.data;

					set((state) => ({
						songs: state.songs.filter((song) => song.id !== id),
					}));

					toast.success(message);
					return true;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			deleteAlbum: async (id) => {
				set({ isLoading: true, error: null });

				try {
					const response = await deleteAlbum(id);
					const { message } = response.data;

					set((state) => ({
						albums: state.albums.filter((album) => album.id !== id),
						songs: state.songs.map((song) =>
							song?.album?.id === state.albums.find((a) => a.id === id)?.title ? { ...song, album: null } : song
						),
					}));

					toast.success(message);
					return true;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			getAllSong: async () => {
				set({ isLoading: true, error: null });

				try {
					const response = await getAllSong();
					const { songs } = response.data;

					return songs;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			uploadAlbum: async (userId, formData) => {
				set({ isLoading: true, error: null });

				try {
					const response = await uploadAlbum(userId, formData);
					const { message } = response.data;

					toast.success(message);
					return true;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			uploadSong: async (userId, formData) => {
				set({ isLoading: true, error: null });

				try {
					const response = await uploadSong(userId, formData);
					const { message } = response.data;

					toast.success(message);
					return true;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			updateAlbum: async (id, formData) => {
				set({ isLoading: true, error: null });

				try {
					const response = await updateAlbum(id, formData);
					const { message, album } = response.data;

					toast.success(message);
					return album;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			searchAlbums: async (query) => {
				set({ isLoading: true, error: null });

				try {
					const response = await searchAlbums(query);
					const { albums } = response.data;

					return albums;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			getAllAlbum: async () => {
				set({ isLoading: true, error: null });

				try {
					const response = await getAllAlbum();
					const { albums } = response.data;

					return albums;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			getAlbum: async (id) => {
				set({ isLoading: true, error: null });

				try {
					const response = await getAlbum(id);
					const { album } = response.data;

					return album;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			getUserAlbums: async (userId) => {
				set({ isLoading: true, error: null });

				try {
					const response = await getUserAlbums(userId);
					const { albums } = response.data;

					return albums;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			getFeaturedSongs: async () => {
				set({ isLoading: true, error: null });

				try {
					const response = await getFeaturedSongs();
					const { songs } = response.data;

					return songs;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			getMadeForYouSongs: async () => {
				set({ isLoading: true, error: null });

				try {
					const response = await getMadeForYouSongs();
					const { songs } = response.data;

					return songs;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			getTrendingSongs: async () => {
				set({ isLoading: true, error: null });

				try {
					const response = await getTrendingSongs();
					const { songs } = response.data;

					return songs;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			updateSong: async (songId, formData) => {
				set({ isLoading: true, error: null });

				try {
					const response = await updateSong(songId, formData);
					const { song, message } = response.data;

					toast.success(message);
					return song;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			addSongToAlbum: async (id, albumId) => {
				set({ isLoading: true, error: null });

				try {
					const response = await addSongToAlbum(id, albumId);
					const { message, song } = response.data;

					toast.success(message);
					return song;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			downloadSong: async (id) => {
				set({ isLoading: true, error: null });

				try {
					const response = await downloadSong(id);
					const { message } = response.data;

					toast.success(message);
					return true;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			getSong: async (id) => {
				set({ isLoading: true, error: null });

				try {
					const response = await getSong(id);
					const { song } = response.data;

					return song;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			searchSongs: async (query) => {
				set({ isLoading: true, error: null });

				try {
					const response = await searchSongs(query);
					const { songs } = response.data;

					return songs;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},

			increaseSongView: async (songId) => {
				set({ isLoading: true, error: null });

				try {
					await increaseSongView(songId);

					return true;
				} catch (error: any) {
					console.error(error)
					const { message } = error.response.data;
					set({ error: message });

					toast.error(message);
					return false;
				} finally {
					set({ isLoading: false });
				}
			},
			
            likeSong: async (userId, songId) => {
                set({ error: null });

                try {
                    const response = await likeSong(userId, songId);
                    const { user, message } = response.data;

                    await useAuthStore.getState().setUserAuth(user);
                    toast.success(message);
                    return user;
                } catch (error: any) {
                    console.error(error)
                    const { message } = error.response.data;
                    set({ error: message });

                    toast.error(message);
                    return false;
                }
            },

			getUserLikedSong: async (userId) => {
				set({ error: null });

                try {
                    const response = await getUserLikedSong(userId);
                    const { songs } = response.data;

                    return songs;
                } catch (error: any) {
                    console.error(error)
                    const { message } = error.response.data;
                    set({ error: message });

                    toast.error(message);
                    return false;
                }
			},

			reset: () => {
				set({
					albums: [],
					songs: [],
					isLoading: false,
					error: null,
					status: 0,
					message: null,
				})
			},
		}),

		{
			name: "music-storage",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);