import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Clock,
  Filter,
  MoreHorizontal,
  Music,
  Pause,
  Play,
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

export function SongManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [isAddSongOpen, setIsAddSongOpen] = useState(false);
  const [playingSong, setPlayingSong] = useState<string | null>(null);

  const [newSong, setNewSong] = useState({
    title: "",
    albumId: "",
    lyrics: "",
    genre: "",
    releaseDate: new Date(),
  });

  const [file, setFile] = useState<FileState>({
    thumbnail: null,
    audio: null,
  });

  const {
    songs,
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
    getAllSong();
  }, [getAllSong]);

  useEffect(() => {
    setSearchQuery(query);
    searchSongs(query);
  }, [query, searchSongs]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSearchParams({ query: searchQuery.trim() });
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

  const togglePlaySong = (songId: string) => {
    if (playingSong === songId) {
      setPlayingSong(null);
    } else {
      setPlayingSong(songId);
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
    formData.append("genre", newSong.genre);
    formData.append("releaseDate", newSong.releaseDate.toISOString().split("T")[0]);
    
    if (file.thumbnail) {
      formData.append("thumbnail", file.thumbnail);
    }
    
    uploadSong(userAuth.id, formData);

    setNewSong({
      albumId: "",
      title: "",
      lyrics: "",
      genre: "",
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
    formData.append("genre", newSong.genre);
    formData.append("releaseDate", newSong.releaseDate.toISOString().split("T")[0]);
    
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
      genre: "",
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
                          MP3, WAV or FLAC (max. 50MB)
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
                <CardTitle>Song Library</CardTitle>

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
                      />
                    </div>
                  </form>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <Checkbox id="artist-filter" className="mr-2" />

                        <label htmlFor="artist-filter">Artist</label>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <Checkbox id="album-filter" className="mr-2" />

                        <label htmlFor="album-filter">Album</label>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <Checkbox id="release-filter" className="mr-2" />

                        <label htmlFor="release-filter">Release Date</label>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <Checkbox id="explicit-filter" className="mr-2" />

                        <label htmlFor="explicit-filter">Explicit</label>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox
                        checked={selectedSongs.length === songs.length}
                        onCheckedChange={toggleAllSongs}
                      />
                    </TableHead>

                    <TableHead className="w-[40px]"></TableHead>

                    <TableHead>Title</TableHead>

                    <TableHead>Artist</TableHead>

                    <TableHead>Album</TableHead>

                    <TableHead>Duration</TableHead>

                    <TableHead>Views</TableHead>

                    <TableHead>Release Date</TableHead>

                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {songs.map((song) => (
                    <TableRow key={song.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedSongs.includes(song.id)}
                          onCheckedChange={() => toggleSongSelection(song.id)}
                        />
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => togglePlaySong(song.id)}
                        >
                          {playingSong === song.id ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 rounded-md">
                            <AvatarImage
                              src={song.thumbnailUrl}
                              alt={song.title}
                            />

                            <AvatarFallback>
                              <Music className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex flex-col">
                            <span className="font-medium">{song.title}</span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>{song.user.fullName}</TableCell>

                      <TableCell>{song.album?.title}</TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />

                          <span>{formatTime(song.duration)}</span>
                        </div>
                      </TableCell>

                      <TableCell>{song.views}</TableCell>

                      <TableCell>{song.releaseDate}</TableCell>

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

                            <DropdownMenuItem
                              onClick={() => handleViewDetails(song)}
                            >
                              View details
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => handleEditSong()}>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
