export interface User {
	id: string;
	albums: Album[];
	followers: User[];
	following: User[];
	username: string;
	email: string;
	fullName: string;
	avatarUrl: string;
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
}

export interface GeneralStat {
	totalSongs: number;
	totalAlbums: number;
	totalUsers: number;
	totalArtists: number;
}

// export interface UserActivityStat {
//     date: number;
//     activeUsers: number;
// }

export interface Message {
	id: string;
	senderId: string;
	receiverId: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

export interface UserProfile {
  name?: string;
  email?: string;
  picture?: string;
}

export interface AlbumResultsProps {
	albums: Album[];
	query: string;
  }

  export interface SongResultsProps {
	songs: Song[];
	query: string;
  }

  export interface UserResultsProps {
	users: User[]
	query: string
  }

  export interface AuthStore {
	user: User | null;
	isAuth: boolean;
	isArtist: boolean;
	isAdmin: boolean;
	isLoading: boolean;
	error: string | null;
  
	checkAdmin: () => Promise<void>;
	checkArtist: () => Promise<void>;
	register: (formData: FormData) => Promise<void>;
	registerAdmin: (formData: FormData) => Promise<void>;
	login: (formData: FormData) => Promise<void>;
	logout: () => Promise<void>;
	changePassword: (userId: string, formData: FormData) => Promise<void>;
	refreshToken: () => Promise<void>;
	setUserAuth: (user: User | null) => void;
	reset: () => void;
  }

  export interface ChatStore {
	users: User[];
	socket: any;
	isConnected: boolean;
	onlineUsers: Set<string>;
	userActivities: Map<string, string>;
	messages: Message[];
	selectedUser: User | null;
	isLoading: boolean;
	error: string | null;
  
	getAllUser: () => Promise<void>;
	initSocket: (userId: string) => void;
	disconnectSocket: () => void;
	sendMessage: (receiverId: string, senderId: string, content: string) => void;
	getMessages: (currentUserId: string, opponentId: string) => Promise<void>;
	setSelectedUser: (user: User | null) => void;
  }

  export interface MusicStore {
	songs: Song[];
	albums: Album[];
	currentAlbum: Album | null;
	song: Song | null;
	featuredSongs: Song[];
	madeForYouSongs: Song[];
	trendingSongs: Song[];
	isLoading: boolean;
	error: string | null;

	getAllAlbum: () => Promise<void>;
	uploadAlbum: (userId: string, formData: FormData) => Promise<void>;
	getAlbum: (id: string) => Promise<void>;
	updateAlbum: (id: string, formData: FormData) => Promise<void>;
	deleteAlbum: (id: string) => Promise<void>;
	getUserAlbums: (userId: string) => Promise<void>;
	searchAlbums: (query: string) => Promise<void>;
	getFeaturedSongs: () => Promise<void>;
	getMadeForYouSongs: () => Promise<void>;
	getTrendingSongs: () => Promise<void>;
	getAllSong: () => Promise<void>;
	getSong: (id: string) => Promise<void>;
	uploadSong: (userId: string, formData: FormData) => Promise<void>;
	updateSong(id: string, formData: FormData): Promise<void>;
	addSongToAlbum(id: string, albumId: string): Promise<void>;
	downloadSong: (id: string) => Promise<void>;
	deleteSong: (id: string) => Promise<void>;
	searchSongs: (query: string) => Promise<void>;
	increaseSongView: (songID: string) => Promise<void>;
	reset: () => void;
}

export interface PlayerStore {
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

export interface StatStore {
	generalStat: GeneralStat;
	// userActivityStats: UserActivityStat[];
	isLoading: boolean;
	songs: Song[];
	users: User[];
	error: string | null;

	getGeneralStat: () => Promise<void>;
	// getUserActivityStat: (days: number) => Promise<void>;
	getPopularSongsStat: () => Promise<void>;
	getTopArtistsStat: () => Promise<void>;
	reset: () => void;
}

export interface UserStore {
    user: User | null;
    users: User[];
    artistApplications: ArtistApplication[];
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
    getArtistApplicatioins: (status: string) => Promise<void>;
    deleteArtistApplicatioin: (applicationId: string) => Promise<void>;
    reset: () => void;
}