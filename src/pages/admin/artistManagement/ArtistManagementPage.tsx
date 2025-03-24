import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  // Filter,
  MoreHorizontal,
  Pencil,
  Search,
  Trash,
  Music,
  Disc,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useMusicStore } from "@/stores/useMusicStore";
import { useUserStore } from "@/stores/useUserStore";
import { Album, Song, User } from "@/utils/types";
import ManageAlbumsDialog from "../albumManagement/components/ManageAlbumsDialog";
import EditAlbumDialog from "../albumManagement/components/EditAlbumDialog";
import ViewAlbumDialog from "../albumManagement/components/ViewAlbumDialog";
import AddToPlaylistDialog from "../songManagement/components/AddToPlaylistDialog";
import ViewSongDetailsDialog from "../songManagement/components/ViewSongDetailsDialog";
import EditSongDialog from "../songManagement/components/EditSongDialog";
import AddSongDialog from "../songManagement/components/AddSongDialog";
import ManageSongsDialog from "../songManagement/components/ManageSongsDialog";
import EditArtistDialog from "./components/EditArtistDialog";
import AddGenreDialog from "./components/AddGenreDialog";
import AddArtistDialog from "./components/AddArtistDialog";

// Available genres for the Add Genre modal
const availableGenres: string[] = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "R&B",
  "Country",
  "Electronic",
  "Dance",
  "Jazz",
  "Classical",
  "Folk",
  "Indie",
  "Alternative",
  "Metal",
  "Punk",
  "Blues",
  "Reggae",
  "Soul",
  "Funk",
  "Disco",
  "House",
  "Techno",
  "Trance",
  "Ambient",
  "Latin",
  "K-Pop",
  "J-Pop",
  "Afrobeat",
  "Gospel",
  "Soundtrack",
];

export default function ArtistManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  const { albums } = useMusicStore();
  const { getUserByRole, searchUsers, deleteUser } = useUserStore();

  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [isAddArtistOpen, setIsAddArtistOpen] = useState(false);
  const [isEditArtistOpen, setIsEditArtistOpen] = useState(false);
  const [isManageSongsOpen, setIsManageSongsOpen] = useState(false);
  const [isManageAlbumsOpen, setIsManageAlbumsOpen] = useState(false);
  const [isAddGenreOpen, setIsAddGenreOpen] = useState(false);
  const [isAddSongOpen, setIsAddSongOpen] = useState(false);
  const [isEditSongOpen, setIsEditSongOpen] = useState(false);
  const [isSongDetailsOpen, setIsSongDetailsOpen] = useState(false);
  const [isAddToPlaylistOpen, setIsAddToPlaylistOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<User | null>(null);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [playingSong, setPlayingSong] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);

  // Add these state variables at the beginning of the ArtistsPage component, after the existing state declarations
  // const [searchQuery, setSearchQuery] = useState("");
  // const [activeFilters, setActiveFilters] = useState<{
  //   verified: boolean | null;
  //   genres: string[];
  //   followers: string[];
  //   joinDate: string[];
  // }>({
  //   verified: null,
  //   genres: [],
  //   followers: [],
  //   joinDate: [],
  // });

  const [artists, setArtists] = useState<User[] | []>([]);
  const [isViewAlbumOpen, setIsViewAlbumOpen] = useState(false);
  const [isEditAlbumOpen, setIsEditAlbumOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(
    null
  );
  const [albumSongs, setAlbumSongs] = useState<Song[]>([]);

  useEffect(() => {
      const fetchUsers = async () => {
        const artists = await getUserByRole("artist");
        setArtists(artists);
      };
  
      fetchUsers();
    }, [getUserByRole]);

  useEffect(() => {
    setSearchQuery(query);
    searchUsers(query);
  }, [query, searchUsers]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSearchParams({ query: searchQuery.trim() });
    },
    [searchQuery, setSearchParams]
  );

  const toggleArtistSelection = (artistId: string) => {
    if (selectedArtists.includes(artistId)) {
      setSelectedArtists(selectedArtists.filter((id) => id !== artistId));
    } else {
      setSelectedArtists([...selectedArtists, artistId]);
    }
  };

  const toggleAllArtists = () => {
    if (selectedArtists.length === artists.length) {
      setSelectedArtists([]);
    } else {
      setSelectedArtists(artists.map((artist) => artist.id));
    }
  };

  const handleEditArtist = (artist: User) => {
    setSelectedArtist(artist);
    setIsEditArtistOpen(true);
  };

  const handleManageSongs = (artist: User) => {
    setSelectedArtist(artist);
    setIsManageSongsOpen(true);
  };

  const handleManageAlbums = (artist: User) => {
    setSelectedArtist(artist);
    setIsManageAlbumsOpen(true);
  };

  const handleAddGenre = (artist: User) => {
    setSelectedArtist(artist);
    setIsAddGenreOpen(true);
  };

  const handleAddSong = () => {
    setIsAddSongOpen(true);
    setIsManageSongsOpen(false);
  };

  const handleEditSong = (song: Song) => {
    setSelectedSong(song);
    setIsEditSongOpen(true);
  };

  const handleViewSongDetails = (song: Song) => {
    setSelectedSong(song);
    setIsSongDetailsOpen(true);
  };

  const handleAddToPlaylist = (song: Song) => {
    setSelectedSong(song);
    setIsAddToPlaylistOpen(true);
  };

  const togglePlaySong = (songId: string) => {
    if (playingSong === songId) {
      setPlayingSong(null);
    } else {
      setPlayingSong(songId);
    }
  };

  const toggleGenreSelection = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const togglePlaylistSelection = (playlistId: string) => {
    if (selectedPlaylists.includes(playlistId)) {
      setSelectedPlaylists(selectedPlaylists.filter((id) => id !== playlistId));
    } else {
      setSelectedPlaylists([...selectedPlaylists, playlistId]);
    }
  };

  // Add these handler functions after the existing handler functions
  const handleViewAlbum = (album: Album) => {
    setSelectedAlbum(album);
    // Filter songs that belong to this album
    // const songViews = songs.filter((song) => song.album === album.title)

    setAlbumSongs(album.songs);
    setIsViewAlbumOpen(true);
  };

  const handleEditAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setAlbumSongs(album.songs);
    setIsEditAlbumOpen(true);
  };
  
  const handleDeleteUser = (artist: User) => {
    deleteUser(artist.id);
    setIsEditAlbumOpen(true);
  };

  const handleRemoveSongFromAlbum = (songId: string) => {
    setAlbumSongs(albumSongs.filter((song) => song.id !== songId));
  };

  // Function to toggle a filter value
  // const toggleFilter = (category: keyof typeof activeFilters, value: any) => {
  //   setActiveFilters((prev) => {
  //     const updated = { ...prev };
  //     if (category === "verified") {
  //       updated.verified = value;
  //       return updated;
  //     }

  //     if ((updated[category] as string[]).includes(value)) {
  //       (updated[category] as string[]) = (
  //         updated[category] as string[]
  //       ).filter((item) => item !== value);
  //     } else {
  //       (updated[category] as string[]) = [
  //         ...(updated[category] as string[]),
  //         value,
  //       ];
  //     }
  //     return updated;
  //   });
  // };

  // Function to clear all filters
  // const clearFilters = () => {
  //   setActiveFilters({
  //     verified: null,
  //     genres: [],
  //     followers: [],
  //     joinDate: [],
  //   });
  //   setSearchQuery("");
  // };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Artists</h2>

        <div className="flex items-center gap-2">
          {/* Add Artist Dialog */}
          <AddArtistDialog
            isOpen={isAddArtistOpen}
            onOpenChange={setIsAddArtistOpen}
          />
        </div>
      </div>

      {/* Edit Artist Dialog */}
      <EditArtistDialog
        isOpen={isEditArtistOpen}
        onOpenChange={setIsEditArtistOpen}
        handleAddGenre={handleAddGenre}
        selectedArtist={selectedArtist}
      />

      {/* Add Genre Dialog */}
      <AddGenreDialog
        isOpen={isAddGenreOpen}
        onOpenChange={setIsAddGenreOpen}
        toggleGenreSelection={toggleGenreSelection}
        availableGenres={availableGenres}
        selectedArtist={selectedArtist}
      />

      {/* Manage Songs Dialog */}
      <ManageSongsDialog
        isOpen={isManageSongsOpen}
        onOpenChange={setIsManageSongsOpen}
        artist={selectedArtist}
        playingSong={playingSong}
        handleAddSong={handleAddSong}
        togglePlaySong={togglePlaySong}
        handleEditSong={handleEditSong}
        handleViewSongDetails={handleViewSongDetails}
        handleAddToPlaylist={handleAddToPlaylist}
      />

      {/* Add Song Dialog */}
      <AddSongDialog
        isOpen={isAddSongOpen}
        onOpenChange={setIsAddSongOpen}
        onManageSongsOpen={setIsManageSongsOpen}
        artist={selectedArtist}
        albums={albums}
        availableGenres={availableGenres}
      />

      {/* Edit Song Dialog */}
      <EditSongDialog
        isOpen={isEditSongOpen}
        onOpenChange={setIsEditSongOpen}
        song={selectedSong}
        albums={albums}
        genres={availableGenres}
      />

      {/* View Song Details Dialog */}
      <ViewSongDetailsDialog
        isOpen={isSongDetailsOpen}
        onOpenChange={setIsSongDetailsOpen}
        song={selectedSong}
        artist={selectedArtist}
        onAddToPlaylist={handleAddToPlaylist}
        onEditSong={handleEditSong}
      />

      {/* Add to Playlist Dialog */}
      <AddToPlaylistDialog
        isOpen={isAddToPlaylistOpen}
        onOpenChange={setIsAddToPlaylistOpen}
        togglePlaylistSelection={togglePlaylistSelection}
        song={selectedSong}
        artist={selectedArtist}
      />

      {/* Manage Albums Dialog */}
      <ManageAlbumsDialog
        isOpen={isManageAlbumsOpen}
        onOpenChange={setIsManageAlbumsOpen}
        artist={selectedArtist}
        albums={albums}
        handleViewAlbum={handleViewAlbum}
        handleEditAlbum={handleEditAlbum}
      />

      {/* View Album Dialog */}
      <ViewAlbumDialog
        isOpen={isViewAlbumOpen}
        onOpenChange={setIsViewAlbumOpen}
        onEdit={handleEditAlbum}
        album={selectedAlbum}
        artist={selectedArtist}
        songs={albumSongs}
        playingSong={playingSong}
        togglePlaySong={togglePlaySong}
        handleViewSongDetails={handleViewSongDetails}
        handleEditSong={handleEditSong}
        handleAddToPlaylist={handleAddToPlaylist}
      />

      {/* Edit Album Dialog */}
      <EditAlbumDialog
        isOpen={isEditAlbumOpen}
        onOpenChange={setIsEditAlbumOpen}
        selectedAlbum={selectedAlbum}
        albumSongs={albumSongs}
        availableGenres={availableGenres}
        handleAddSong={handleAddSong}
        handleEditSong={handleEditSong}
        handleRemoveSongFromAlbum={handleRemoveSongFromAlbum}
      />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Artist Management</CardTitle>
            <div className="flex items-center gap-2">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="relative w-60">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search artists..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>

              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-[250px]">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <div className="p-2">
                    <h4 className="mb-2 text-sm font-medium">Verification</h4>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox
                          id="verified-true"
                          checked={activeFilters.verified === true}
                          onCheckedChange={() =>
                            toggleFilter(
                              "verified",
                              activeFilters.verified === true ? null : true
                            )
                          }
                          className="mr-2"
                        />
                        <label htmlFor="verified-true">Verified</label>
                      </div>

                      <div className="flex items-center">
                        <Checkbox
                          id="verified-false"
                          checked={activeFilters.verified === false}
                          onCheckedChange={() =>
                            toggleFilter(
                              "verified",
                              activeFilters.verified === false ? null : false
                            )
                          }
                          className="mr-2"
                        />
                        <label htmlFor="verified-false">Not Verified</label>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <div className="p-2">
                    <h4 className="mb-2 text-sm font-medium">Followers</h4>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox
                          id="followers-over-50m"
                          checked={activeFilters.followers.includes("over-50m")}
                          onCheckedChange={() =>
                            toggleFilter("followers", "over-50m")
                          }
                          className="mr-2"
                        />

                        <label htmlFor="followers-over-50m">Over 50M</label>
                      </div>

                      <div className="flex items-center">
                        <Checkbox
                          id="followers-over-10m"
                          checked={activeFilters.followers.includes("over-10m")}
                          onCheckedChange={() =>
                            toggleFilter("followers", "over-10m")
                          }
                          className="mr-2"
                        />

                        <label htmlFor="followers-over-10m">Over 10M</label>
                      </div>

                      <div className="flex items-center">
                        <Checkbox
                          id="followers-over-1m"
                          checked={activeFilters.followers.includes("over-1m")}
                          onCheckedChange={() =>
                            toggleFilter("followers", "over-1m")
                          }
                          className="mr-2"
                        />

                        <label htmlFor="followers-over-1m">Over 1M</label>
                      </div>

                      <div className="flex items-center">
                        <Checkbox
                          id="followers-under-1m"
                          checked={activeFilters.followers.includes("under-1m")}
                          onCheckedChange={() =>
                            toggleFilter("followers", "under-1m")
                          }
                          className="mr-2"
                        />

                        <label htmlFor="followers-under-1m">Under 1M</label>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <div className="p-2 flex justify-between">
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      Clear Filters
                    </Button>

                    <Button size="sm">Apply Filters</Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={
                      selectedArtists.length === artists.length &&
                      artists.length > 0
                    }
                    onCheckedChange={toggleAllArtists}
                  />
                </TableHead>

                <TableHead>Artist</TableHead>

                <TableHead>Followers</TableHead>

                <TableHead>Total Songs</TableHead>

                <TableHead>Join Date</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {artists.map((artist) => (
                <TableRow key={artist.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedArtists.includes(artist.id)}
                      onCheckedChange={() => toggleArtistSelection(artist.id)}
                    />
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={artist.avatarUrl}
                          alt={artist.fullName}
                        />

                        <AvatarFallback>
                          {artist.fullName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{artist.fullName}</span>
                          {/* {artist.verified && ( */}
                          <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </Badge>
                          {/* )} */}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{artist.followers.length}</TableCell>

                  <TableCell>{artist.songs.length}</TableCell>

                  <TableCell>{artist.created_at}</TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem>
                          <Link to={`/profile/${artist?.id}`}>
                            <span>View profile</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleEditArtist(artist)}
                        >
                          <Pencil className="mr-2 h-4 w-4" /> Edit artist
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => handleManageSongs(artist)}
                        >
                          <Music className="mr-2 h-4 w-4" /> Manage songs
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleManageAlbums(artist)}
                        >
                          <Disc className="mr-2 h-4 w-4" /> Manage albums
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-red-600">
                          <Trash
                            onClick={() => handleDeleteUser(artist)}
                            className="mr-2 h-4 w-4"
                          />{" "}
                          Delete artist
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
