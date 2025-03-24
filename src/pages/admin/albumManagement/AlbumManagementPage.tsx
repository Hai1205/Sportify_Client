import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  MoreHorizontal,
  Music,
  Pause,
  Play,
  Search,
  Trash,
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
import { Checkbox } from "@/components/ui/checkbox";
import { useMusicStore } from "@/stores/useMusicStore";
import AddAlbumDialog from "./components/AddAlbumDialog";

export default function AlbumManagementPage() {
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
          <AddAlbumDialog
            isOpen={isAddSongOpen}
            onOpenChange={setIsAddSongOpen}
          />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Album Library</CardTitle>

            <div className="flex items-center gap-2">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="relative w-60">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

                  <Input
                    type="search"
                    placeholder="Search albums..."
                    className="w-full pl-8"
                  />
                </div>
              </form>
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
                        <AvatarImage src={song.thumbnailUrl} alt={song.title} />

                        <AvatarFallback>
                          <Music className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </TableCell>

                  <TableCell>{song.user.fullName}</TableCell>

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
                          <Trash className="mr-2 h-4 w-4" />
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
    </div>
  );
}
