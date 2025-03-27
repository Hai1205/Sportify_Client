import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Filter,
  MoreHorizontal,
  Search,
  Trash,
  Pencil,
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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import EditUserDialog from "./components/EditUserDialog";
import AddUserDialog from "./components/AddUserDialog";
import { Album, Song, User } from "@/utils/types";
import { useUserStore } from "@/stores/useUserStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditArtistDialog from "./components/EditArtistDialog";
import AddGenreDialog from "./components/AddGenreDialog";
import ManageSongsDialog from "../songManagement/components/ManageSongsDialog";
import { useMusicStore } from "@/stores/useMusicStore";
import EditSongDialog from "../songManagement/components/EditSongDialog";
import ViewSongDetailsDialog from "../songManagement/components/ViewSongDetailsDialog";
import AddToPlaylistDialog from "../songManagement/components/AddToPlaylistDialog";
import ViewAlbumDialog from "../albumManagement/components/ViewAlbumDialog";
import ManageAlbumsDialog from "../albumManagement/components/ManageAlbumsDialog";
import EditAlbumDialog from "../albumManagement/components/EditAlbumDialog";
import { UserEmptyState } from "@/layout/components/EmptyState";

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
  "Gospel",
  "Soundtrack",
];

export default function UserManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const queryString = location.search;

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [users, setUsers] = useState<User[] | []>([]);
  const [openMenuFilters, setOpenMenuFilters] = useState(false);
  const closeMenuMenuFilters = () => setOpenMenuFilters(false);

  const [isEditArtistOpen, setIsEditArtistOpen] = useState(false);
  const [isManageSongsOpen, setIsManageSongsOpen] = useState(false);
  const [isManageAlbumsOpen, setIsManageAlbumsOpen] = useState(false);
  const [isAddGenreOpen, setIsAddGenreOpen] = useState(false);
  const [isEditSongOpen, setIsEditSongOpen] = useState(false);
  const [isSongDetailsOpen, setIsSongDetailsOpen] = useState(false);
  const [isAddToPlaylistOpen, setIsAddToPlaylistOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<User | null>(null);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [playingSong, setPlayingSong] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);

  const [isViewAlbumOpen, setIsViewAlbumOpen] = useState(false);
  const [isEditAlbumOpen, setIsEditAlbumOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [albumSongs, setAlbumSongs] = useState<Song[]>([]);

  const { searchUsers, deleteUser, getAllUser } = useUserStore();
  const { isAdmin, resetPassword } = useAuthStore();
  const { albums } = useMusicStore();

  useEffect(() => {
    const fetchUsers = async () => {
      const params = new URLSearchParams(searchParams);
      params.set("admin", `${isAdmin}`);
      const updatedQueryString = `?${params.toString()}`;

      if (queryString) {
        await searchUsers(updatedQueryString).then(setUsers);
      } else {
        await getAllUser().then(setUsers);
      }
    };

    fetchUsers();
  }, [getAllUser, query, queryString, searchUsers, searchParams, isAdmin]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams();

      params.set("admin", `${isAdmin}`);

      if (searchQuery.trim()) {
        params.set("query", searchQuery.trim());
      }

      setSearchParams(params);
    },
    [isAdmin, searchQuery, setSearchParams]
  );

  // Add these state variables at the beginning of the UsersPage component, after the existing state declarations
  const [activeFilters, setActiveFilters] = useState<{
    status: string[];
    role: string[];
  }>({
    status: [],
    role: [],
  });

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const toggleAllUsers = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "locked":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  const handleResetPassword = (user: User) => {
    if (!user) {
      return;
    }

    resetPassword(user.id);
    setIsEditUserOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    if (!user) {
      return;
    }

    deleteUser(user.id);
    setIsEditUserOpen(true);
  };

  // Function to toggle a filter value
  const toggleFilter = (
    category: keyof typeof activeFilters,
    value: string
  ) => {
    setActiveFilters((prev) => {
      const updated = { ...prev };

      if (updated[category].includes(value)) {
        updated[category] = updated[category].filter((item) => item !== value);
      } else {
        updated[category] = [...updated[category], value];
      }

      return updated;
    });
  };

  // Function to clear all filters
  const clearFilters = async () => {
    setActiveFilters({ status: [], role: [] });
    setSearchQuery("");

    const params = new URLSearchParams();
    params.set("admin", `${isAdmin}`);
    setSearchParams(params);

    closeMenuMenuFilters();
  };

  // Function to apply all filters
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.set("admin", `${isAdmin}`);

    Object.keys(activeFilters).forEach((key) => {
      const values = activeFilters[key as keyof typeof activeFilters];
      if (values.length > 0) {
        params.set(key, values.join(","));
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
    closeMenuMenuFilters();
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

  const handleRemoveSongFromAlbum = (songId: string) => {
    setAlbumSongs(albumSongs.filter((song) => song.id !== songId));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>

        <div className="flex items-center gap-2">
          {/* Add User Dialog */}
          <AddUserDialog
            isOpen={isAddUserOpen}
            onOpenChange={setIsAddUserOpen}
          />
        </div>
      </div>

      {/* Edit User Dialog */}
      <EditUserDialog
        isOpen={isEditUserOpen}
        onOpenChange={setIsEditUserOpen}
        user={selectedUser}
      />

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
        // handleAddSong={handleAddSong}
        togglePlaySong={togglePlaySong}
        handleEditSong={handleEditSong}
        handleViewSongDetails={handleViewSongDetails}
        handleAddToPlaylist={handleAddToPlaylist}
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
        handleEditSong={handleEditSong}
        handleRemoveSongFromAlbum={handleRemoveSongFromAlbum}
      />

      <Tabs defaultValue="all-users" className="space-y-4">
        <TabsContent value="all-users" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>User Management</CardTitle>

                <div className="flex items-center gap-2">
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-2"
                  >
                    <div className="relative w-60">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

                      <Input
                        type="search"
                        placeholder="Search users..."
                        className="w-full pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>

                  <DropdownMenu
                    open={openMenuFilters}
                    onOpenChange={closeMenuMenuFilters}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() => setOpenMenuFilters((prev) => !prev)}
                      >
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-[250px]">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>

                      <DropdownMenuSeparator />

                      <div className="p-2">
                        <h4 className="mb-2 text-sm font-medium">Status</h4>

                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Checkbox
                              id="status-active"
                              checked={activeFilters.status.includes("active")}
                              onCheckedChange={() =>
                                toggleFilter("status", "active")
                              }
                              className="mr-2"
                            />

                            <label htmlFor="status-active">Active</label>
                          </div>

                          <div className="flex items-center">
                            <Checkbox
                              id="status-pending"
                              checked={activeFilters.status.includes("pending")}
                              onCheckedChange={() =>
                                toggleFilter("status", "pending")
                              }
                              className="mr-2"
                            />

                            <label htmlFor="status-pending">Pending</label>
                          </div>

                          <div className="flex items-center">
                            <Checkbox
                              id="status-lock"
                              checked={activeFilters.status.includes("locked")}
                              onCheckedChange={() =>
                                toggleFilter("status", "locked")
                              }
                              className="mr-2"
                            />

                            <label htmlFor="status-lock">Locked</label>
                          </div>
                        </div>
                      </div>

                      <DropdownMenuSeparator />

                      <div className="p-2">
                        <h4 className="mb-2 text-sm font-medium">Role</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Checkbox
                              id="role-user"
                              checked={activeFilters.role.includes("user")}
                              onCheckedChange={() =>
                                toggleFilter("role", "user")
                              }
                              className="mr-2"
                            />
                            <label htmlFor="role-user">User</label>
                          </div>

                          <div className="flex items-center">
                            <Checkbox
                              id="role-artist"
                              checked={activeFilters.role.includes("artist")}
                              onCheckedChange={() =>
                                toggleFilter("role", "artist")
                              }
                              className="mr-2"
                            />
                            <label htmlFor="role-artist">Artist</label>
                          </div>

                          <div className="flex items-center">
                            <Checkbox
                              id="role-admin"
                              checked={activeFilters.role.includes("admin")}
                              onCheckedChange={() =>
                                toggleFilter("role", "admin")
                              }
                              className="mr-2"
                            />
                            <label htmlFor="role-admin">Admin</label>
                          </div>
                        </div>
                      </div>

                      <DropdownMenuSeparator />

                      <div className="p-2 flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearFilters}
                        >
                          Clear Filters
                        </Button>

                        <Button size="sm" onClick={applyFilters}>
                          Apply Filters
                        </Button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <ScrollArea className="h-[calc(100vh-340px)] w-full rounded-xl">
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={selectedUsers.length === users.length}
                          onCheckedChange={toggleAllUsers}
                        />
                      </TableHead>

                      <TableHead>User</TableHead>

                      <TableHead>Role</TableHead>

                      <TableHead>Country</TableHead>

                      <TableHead>Status</TableHead>

                      <TableHead>Join Date</TableHead>

                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedUsers.includes(user.id)}
                              onCheckedChange={() =>
                                toggleUserSelection(user.id)
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <Link to={`/profile/${user?.id}`}>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage
                                    src={user.avatarUrl}
                                    alt={user.fullName}
                                  />
                                  <AvatarFallback>
                                    {user.fullName.substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col">
                                  <span className="font-medium hover:underline">
                                    {user.fullName}
                                  </span>

                                  <span className="text-sm text-muted-foreground hover:underline">
                                    {user.email}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </TableCell>

                          <TableCell className="capitalize">
                            {user.role}
                          </TableCell>

                          <TableCell className="capitalize">
                            {user.country}
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span
                                className={`h-2 w-2 rounded-full ${getStatusColor(
                                  user.status
                                )}`}
                              />
                              <span className="capitalize">{user.status}</span>
                            </div>
                          </TableCell>

                          <TableCell>{user.created_at}</TableCell>

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

                                {user.role === "artist" ? (
                                  <>
                                    <DropdownMenuItem
                                      onClick={() => handleEditArtist(user)}
                                    >
                                      <Pencil className="mr-2 h-4 w-4" /> Edit
                                      artist
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                      onClick={() => handleManageSongs(user)}
                                    >
                                      <Music className="mr-2 h-4 w-4" /> Manage
                                      songs
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                      onClick={() => handleManageAlbums(user)}
                                    >
                                      <Disc className="mr-2 h-4 w-4" /> Manage
                                      albums
                                    </DropdownMenuItem>
                                  </>
                                ) : (
                                  <DropdownMenuItem
                                    onClick={() => handleEditUser(user)}
                                  >
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                    user
                                  </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                  onClick={() => handleResetPassword(user)}
                                >
                                  Reset password
                                </DropdownMenuItem>

                                <DropdownMenuItem className="text-red-600">
                                  <Trash
                                    onClick={() => handleDeleteUser(user)}
                                    className="mr-2 h-4 w-4"
                                  />{" "}
                                  Delete user
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7}>
                          <UserEmptyState />
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
