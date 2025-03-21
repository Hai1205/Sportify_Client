import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  // Badge,
  // Download,
  // Filter,
  MoreHorizontal,
  Music,
  Pause,
  Play,
  // Plus,
  Search,
  // SlidersHorizontal,
  Trash,
  // Upload,
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
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useMusicStore } from "@/stores/useMusicStore";
import AddAlbumDialog from "./components/AddAlbumDialog";
export function AlbumManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [isAddSongOpen, setIsAddSongOpen] = useState(false);
  const [playingSong, setPlayingSong] = useState<string | null>(null);

  const { albums, getAllAlbum, searchAlbums } = useMusicStore();

  useEffect(() => {
    getAllAlbum();
  }, [getAllAlbum]);

  useEffect(() => {
    setSearchQuery(query);
    searchAlbums(query);
  }, [query, searchAlbums]);

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
    if (selectedSongs.length === albums.length) {
      setSelectedSongs([]);
    } else {
      setSelectedSongs(albums.map((song) => song.id));
    }
  };

  const togglePlaySong = (songId: string) => {
    if (playingSong === songId) {
      setPlayingSong(null);
    } else {
      setPlayingSong(songId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Albums</h2>

        <div className="flex items-center gap-2">
          {/* <Button variant="outline" size="sm" className="h-8 gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button> */}

          {/* <Dialog open={isAddSongOpen} onOpenChange={setIsAddSongOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <Plus className="h-4 w-4" />
                Add Album
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Album</DialogTitle>

                <DialogDescription>
                  Upload a new song to the platform.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Album Title</Label>

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

                <Button>Upload Album</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
          <AddAlbumDialog
            isOpen={isAddSongOpen}
            onOpenChange={setIsAddSongOpen}
          />
        </div>
      </div>

      {/* <Tabs defaultValue="all-albums" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-albums">All Songs</TabsTrigger>

          <TabsTrigger value="trending">Trending</TabsTrigger>

          <TabsTrigger value="new-releases">New Releases</TabsTrigger>

          <TabsTrigger value="explicit">Explicit</TabsTrigger>
        </TabsList>

        <TabsContent value="all-albums" className="space-y-4"> */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Album Library</CardTitle>

                <div className="flex items-center gap-2">
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-2"
                  >
                    <div className="relative w-60">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

                      <Input
                        type="search"
                        placeholder="Search albums..."
                        className="w-full pl-8"
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

                  <Button variant="outline" size="sm" className="h-8">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button> */}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox
                        checked={selectedSongs.length === albums.length}
                        onCheckedChange={toggleAllSongs}
                      />
                    </TableHead>

                    <TableHead className="w-[40px]"></TableHead>

                    <TableHead>Title</TableHead>

                    <TableHead>Artist</TableHead>

                    {/* <TableHead>Album</TableHead>

                    <TableHead>Duration</TableHead>

                    <TableHead>Plays</TableHead> */}

                    <TableHead>Release Date</TableHead>

                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {albums.map((song) => (
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

                          {/* <div className="flex flex-col">
                            <span className="font-medium">{song.title}</span>
                            song.explicit && (
                            <Badge variant="outline" className="w-fit text-xs">
                              Explicit
                            </Badge>
                             )}
                          </div> */}
                        </div>
                      </TableCell>

                      <TableCell>{song.user.fullName}</TableCell>
                      {/* <TableCell>{song.album?.title}</TableCell> */}
                      {/* <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{song.duration}</span>
                        </div>
                      </TableCell>
                      <TableCell>{song.views}</TableCell> */}
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

                            <DropdownMenuItem>View details</DropdownMenuItem>

                            <DropdownMenuItem>Edit metadata</DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem>Add to playlist</DropdownMenuItem>

                            <DropdownMenuItem>Download</DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" /> Delete song
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
        {/* </TabsContent>
      </Tabs> */}
    </div>
  );
}
