import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Song } from "@/utils/types";
import { useChatStore } from "./useChatStore";

interface PlayerStore {
	currentSong: Song | null;
	isPlaying: boolean;
	queue: Song[];
	currentIndex: number;
	isLoading: boolean;
	error: string | null;

	initializeQueue: (songs: Song[]) => void;
	playAlbum: (songs: Song[], startIndex?: number) => void;
	setCurrentSong: (song: Song | null) => void;
	togglePlay: () => void;
	playNext: () => void;
	playPrevious: () => void;
	reset: () => void;
}

export const usePlayerStore = create<PlayerStore>()(
	persist(
		(set, get) => ({
			currentSong: null,
			isPlaying: false,
			queue: [],
			currentIndex: -1,
			isLoading: false,
			error: null,

			initializeQueue: (songs: Song[]) => {
				set({
					queue: songs,
					currentSong: get().currentSong || songs[0],
					currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
				});
			},

			playAlbum: (songs: Song[], startIndex = 0) => {
				if (songs.length === 0) return;

				const song = songs[startIndex];

				const socket = useChatStore.getState().socket;
				if (socket.auth) {
					socket.emit("update_activity", {
						userId: socket.auth.userId,
						activity: `Playing ${song.title} by ${song.user.id}`,
					});
				}

				set({
					queue: songs,
					currentSong: song,
					currentIndex: startIndex,
					isPlaying: true,
				});
			},

			setCurrentSong: (song: Song | null) => {
				if (!song) return;

				const socket = useChatStore.getState().socket;
				if (socket.auth) {
					socket.emit("update_activity", {
						userId: socket.auth.userId,
						activity: `Playing ${song.title} by ${song.user.id}`,
					});
				}

				const songIndex = get().queue.findIndex((s) => s.id === song.id);

				set({
					currentSong: song,
					isPlaying: true,
					currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
				});
			},

			togglePlay: () => {
				const willStartPlaying = !get().isPlaying;
				const currentSong = get().currentSong;

				const socket = useChatStore.getState().socket;
				if (socket.auth) {
					socket.emit("update_activity", {
						userId: socket.auth.userId,
						activity:
							willStartPlaying && currentSong ? `Playing ${currentSong.title} by ${currentSong.user.id}` : "Idle",
					});
				}

				set({
					isPlaying: willStartPlaying,
				});
			},

			playNext: () => {
				const { currentIndex, queue } = get();
				const nextIndex = currentIndex + 1;

				// if there is a next song to play, let's play it
				if (nextIndex < queue.length) {
					const nextSong = queue[nextIndex];

					const socket = useChatStore.getState().socket;
					if (socket.auth) {
						socket.emit("update_activity", {
							userId: socket.auth.userId,
							activity: `Playing ${nextSong.title} by ${nextSong.user.id}`,
						});
					}

					set({
						currentSong: nextSong,
						currentIndex: nextIndex,
						isPlaying: true,
					});
				} else {
					// no next song
					set({ isPlaying: false });

					const socket = useChatStore.getState().socket;
					if (socket.auth) {
						socket.emit("update_activity", {
							userId: socket.auth.userId,
							activity: `Idle`,
						});
					}
				}
			},

			playPrevious: () => {
				const { currentIndex, queue } = get();
				const prevIndex = currentIndex - 1;

				// theres a prev song
				if (prevIndex >= 0) {
					const prevSong = queue[prevIndex];

					const socket = useChatStore.getState().socket;
					if (socket.auth) {
						socket.emit("update_activity", {
							userId: socket.auth.userId,
							activity: `Playing ${prevSong.title} by ${prevSong.user.id}`,
						});
					}

					set({
						currentSong: prevSong,
						currentIndex: prevIndex,
						isPlaying: true,
					});
				} else {
					// no prev song
					set({ isPlaying: false });

					const socket = useChatStore.getState().socket;
					if (socket.auth) {
						socket.emit("update_activity", {
							userId: socket.auth.userId,
							activity: `Idle`,
						});
					}
				}
			},

			reset: () => {
				set({
					currentSong: null,
					isPlaying: false,
					queue: [],
					currentIndex: -1,
					isLoading: false,
					error: null,
				});
			},
		}),

		{
			name: "player-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);