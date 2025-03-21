import toast from "react-hot-toast";
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
	uploadSong
} from "@/utils/api/songApi";

interface MusicStore {
	isLoading: boolean;
	error: string | null;
	status: number;
	message: string | null;
	songs: Song[];
	albums: Album[];
	currentAlbum: Album | null;
	song: Song | null;
	featuredSongs: Song[];
	madeForYouSongs: Song[];
	trendingSongs: Song[];

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
					await deleteSong(id);

					set((state) => ({
						songs: state.songs.filter((song) => song.id !== id),
					}));

					toast.success("Song deleted successfully");
				} catch (error: any) {
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
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
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
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
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
				} finally {
					set({ isLoading: false });
				}
			},

			uploadAlbum: async (userId, formData) => {
				set({ isLoading: true, error: null });

				try {
					await uploadAlbum(userId, formData);
				} catch (error: any) {
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
				} finally {
					set({ isLoading: false });
				}
			},

			uploadSong: async (userId, formData) => {
				set({ isLoading: true, error: null });

				try {
					await uploadSong(userId, formData);
				} catch (error: any) {
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
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
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
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
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
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
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
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
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
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
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
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
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
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
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
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
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
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
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
				} finally {
					set({ isLoading: false });
				}
			},

			addSongToAlbum: async (id, albumId) => {
				set({ isLoading: true, error: null });

				try {
					await addSongToAlbum(id, albumId);
				} catch (error: any) {
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
				} finally {
					set({ isLoading: false });
				}
			},

			downloadSong: async (id) => {
				set({ isLoading: true, error: null });

				try {
					await downloadSong(id);
				} catch (error: any) {
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
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
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
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
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
				} finally {
					set({ isLoading: false });
				}
			},

			increaseSongView: async (songId) => {
				set({ isLoading: true, error: null });

				try {
					await increaseSongView(songId);
				} catch (error: any) {
					console.log(error)
					const message = error.response.data.message;
					set({error: message});

					return message;
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
					status: 0,
					message: null,
				})
			},
		}),

		{
			name: "music-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);