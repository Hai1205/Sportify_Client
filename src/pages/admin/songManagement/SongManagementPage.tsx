import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Clock,
  MoreHorizontal,
  Music,
  Plus,
  Search,
  Trash,
  Upload,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useMusicStore } from "@/stores/useMusicStore";
import { FileState, Song } from "@/utils/types";
import { useAuthStore } from "@/stores/useAuthStore";
import formatTime from "@/utils/service/formatTime";
import { SongsEmptyState } from "@/layout/components/EmptyState";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TableSkeleton } from "@/layout/components/TableSkeleton";

export default function SongManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const queryString = location.search;

  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [isAddSongOpen, setIsAddSongOpen] = useState(false);

  const [newSong, setNewSong] = useState({
    title: "",
    albumId: "",
    lyrics: "",
    releaseDate: new Date(),
  });

  const [file, setFile] = useState<FileState>({
    thumbnail: null,
    audio: null,
  });

  const [songs, setSongs] = useState<Song[] | []>([]);

  const {
    isLoading,
    getAllSong,
    searchSongs,
    uploadSong,
    deleteSong,
    updateSong,
    addSongToAlbum,
    downloadSong,
  } = useMusicStore();

  const { user: userAuth } = useAuthStore();

  useEffect(() => {
    const fetchSongs = async () => {
      if (queryString) {
        await searchSongs(queryString).then(setSongs);
      } else {
        await getAllSong().then(setSongs);
      }
    };

    fetchSongs();
  }, [getAllSong, query, queryString, searchSongs]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (searchQuery.trim()) {
        setSearchParams({ query: searchQuery.trim() });
      } else {
        setSearchParams();
      }
    },
    [searchQuery, setSearchParams]
  );

  const toggleSongSelection = (songId: string) => {
    if (selectedSongs.includes(songId)) {
      setSelectedSongs(selectedSongs.filter((id) => id !== songId));
    } else {
      setSelectedSongs([...selectedSongs, songId]);
    }
  };

  const toggleAllSongs = () => {
    if (selectedSongs.length === songs.length) {
      setSelectedSongs([]);
    } else {
      setSelectedSongs(songs.map((song) => song.id));
    }
  };

  const handleViewDetails = (song: Song) => {
    if (!song) {
      return;
    }
  };

  const handleAddToAlbum = (song: Song) => {
    if (!song) {
      return;
    }

    addSongToAlbum(song.id, newSong.albumId);
  };

  const handleDownloadSong = (song: Song) => {
    if (!song) {
      return;
    }

    downloadSong(song.id);
  };

  const handleDeleteSong = (song: Song) => {
    if (!song) {
      return;
    }

    deleteSong(song.id);
  };

  const handleUploadSong = () => {
    if (!userAuth) {
      return;
    }

    const formData = new FormData();
    formData.append("title", newSong.title);
    formData.append("lyrics", newSong.lyrics);
    formData.append(
      "releaseDate",
      newSong.releaseDate.toISOString().split("T")[0]
    );

    if (file.thumbnail) {
      formData.append("thumbnail", file.thumbnail);
    }

    uploadSong(userAuth.id, formData);

    setNewSong({
      albumId: "",
      title: "",
      lyrics: "",
      releaseDate: new Date(),
    });
    setFile({ thumbnail: null, audio: null });
  };

  const handleEditSong = () => {
    if (!userAuth) {
      return;
    }

    const formData = new FormData();
    formData.append("title", newSong.title);
    formData.append("lyrics", newSong.lyrics);
    formData.append(
      "releaseDate",
      newSong.releaseDate.toISOString().split("T")[0]
    );

    if (file.thumbnail) {
      formData.append("thumbnail", file.thumbnail);
    }

    if (file.audio) {
      formData.append("audio", file.audio);
    }

    if (newSong.albumId) {
      formData.append("albumId", newSong.albumId);
    }

    updateSong(userAuth.id, formData);

    setNewSong({
      albumId: "",
      title: "",
      lyrics: "",
      releaseDate: new Date(),
    });
    setFile({ thumbnail: null, audio: null });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Songs</h2>

        <div className="flex items-center gap-2">
          <Dialog open={isAddSongOpen} onOpenChange={setIsAddSongOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleUploadSong()}
                size="sm"
                className="h-8 gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Song
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Song</DialogTitle>

                <DialogDescription>
                  Upload a new song to the platform.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Song Title</Label>

                  <Input id="title" placeholder="Enter song title" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="artist">Artist</Label>

                    <Input id="artist" placeholder="Enter artist name" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="album">Album</Label>

                    <Input id="album" placeholder="Enter album name" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration</Label>

                    <Input id="duration" placeholder="e.g. 3:45" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="release-date">Release Date</Label>

                    <Input id="release-date" type="date" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="file">Audio File</Label>

                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="file"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-muted-foreground" />

                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>

                        <p className="text-xs text-muted-foreground">
                          MP3 (max. 50MB)
                        </p>
                      </div>

                      <Input id="file" type="file" className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="explicit" />

                  <label
                    htmlFor="explicit"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Explicit Content
                  </label>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddSongOpen(false)}
                >
                  Cancel
                </Button>

                <Button>Upload Song</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all-songs" className="space-y-4">
        <TabsContent value="all-songs" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Song Management</CardTitle>

                <div className="flex items-center gap-2">
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-2"
                  >
                    <div className="relative w-60">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

                      <Input
                        type="search"
                        placeholder="Search songs..."
                        className="w-full pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </CardHeader>

            <ScrollArea className="h-[calc(100vh-340px)] w-full rounded-xl">
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px] text-center">
                        <Checkbox
                          checked={selectedSongs.length === songs.length}
                          onCheckedChange={toggleAllSongs}
                        />
                      </TableHead>

                      <TableHead className="w-[40px] text-center">
                        Thumbnail
                      </TableHead>

                      <TableHead className="text-center">Title</TableHead>

                      <TableHead className="text-center">Artist</TableHead>

                      <TableHead className="text-center">Album</TableHead>

                      <TableHead className="text-center">Duration</TableHead>

                      <TableHead className="text-center">Views</TableHead>

                      <TableHead className="text-center">
                        Release Date
                      </TableHead>

                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={9}>
                          <TableSkeleton />
                        </TableCell>
                      </TableRow>
                    ) : songs.length > 0 ? (
                      songs.map((song) => (
                        <TableRow key={song.id}>
                          <TableCell className="text-center">
                            <Checkbox
                              checked={selectedSongs.includes(song.id)}
                              onCheckedChange={() =>
                                toggleSongSelection(song.id)
                              }
                            />
                          </TableCell>

                          <TableCell className="text-center">
                            <div className="flex justify-center">
                              <Avatar className="h-9 w-9 rounded-md">
                                <AvatarImage
                                  src={song.thumbnailUrl}
                                  alt={song.title}
                                />
                                <AvatarFallback>
                                  <Music className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            </div>
                          </TableCell>

                          <TableCell className="text-center">
                            {song.title}
                          </TableCell>

                          <TableCell className="text-center">
                            {song.user.fullName}
                          </TableCell>

                          <TableCell className="text-center">
                            {song.album?.title}
                          </TableCell>

                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span>{formatTime(song.duration)}</span>
                            </div>
                          </TableCell>

                          <TableCell className="text-center">
                            {song.views}
                          </TableCell>

                          <TableCell className="text-center">
                            {song.releaseDate}
                          </TableCell>

                          <TableCell className="text-center">
                            <div className="flex justify-center">
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

                                  <DropdownMenuItem
                                    onClick={() => handleViewDetails(song)}
                                  >
                                    View details
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    onClick={() => handleEditSong()}
                                  >
                                    Edit song
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    onClick={() => handleAddToAlbum(song)}
                                  >
                                    Add to album
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    onClick={() => handleDownloadSong(song)}
                                  >
                                    Download
                                  </DropdownMenuItem>

                                  <DropdownMenuSeparator />

                                  <DropdownMenuItem className="text-red-600">
                                    <Trash
                                      onClick={() => handleDeleteSong(song)}
                                      className="mr-2 h-4 w-4"
                                    />{" "}
                                    Delete song
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9}>
                          <SongsEmptyState message="No songs have been added yet. Upload a song to get started." />
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
