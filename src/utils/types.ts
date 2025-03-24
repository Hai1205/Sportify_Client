export interface User {
	id: string;
	albums: Album[] | string[];
	songs: Song[] | string[];
	followers: User[] | string[];
	following: User[] | string[];
	username: string;
	email: string;
	fullName: string;
	genres: string[];
	avatarUrl: string;
	biography: string;
	status: string;
	website: string;
	instagram: string;
	twitter: string;
	facebook: string;
	youtube: string;
	role: string;
	country: string;
	created_at: string;
}

export interface Album {
	id: string;
	user: User;
	title: string;
	thumbnailUrl: string;
	releaseDate: string;
	songs: Song[];
}

export interface Song {
	id: string;
	title: string;
	user: User;
	album: Album | null;
	thumbnailUrl: string;
	audioUrl: string;
	duration: number;
	releaseDate: string;
	views: number;
	lyrics: string;
	genre: string;
	updatedAt: string;
}

export interface ArtistApplication {
	id: string;
	user: User;
	songs: Song[];
	primaryGenre: string;
	secondaryGenre: string;
	biography: string;
	achievements: number;
	website: string;
	instagram: string;
	twitter: string;
	facebook: string;
	youtube: string;
	reason: string;
	created_at: string;
	status: string;
}

export interface GeneralStat {
	totalSongs: number;
	totalAlbums: number;
	totalUsers: number;
	totalArtists: number;
}

export interface Message {
	id: string;
	senderId: string;
	receiverId: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

export interface FileState {
	thumbnail: File | null;
	audio: File | null;
}