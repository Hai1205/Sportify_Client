import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Play,
  Pause,
  Search,
  MoreHorizontal,
  Pencil,
  Info,
  ListPlus,
  Trash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Song, User } from "@/utils/types";

interface ManageSongsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  artist?: User | null;
  playingSong?: string | null;
  handleAddSong: () => void;
  togglePlaySong: (id: string) => void;
  handleEditSong: (song: Song) => void;
  handleViewSongDetails: (song: Song) => void;
  handleAddToPlaylist: (song: Song) => void;
}

const ManageSongsDialog = ({
  isOpen,
  onOpenChange,
  artist,
  handleAddSong,
  togglePlaySong,
  playingSong,
  handleEditSong,
  handleViewSongDetails,
  handleAddToPlaylist,
}: ManageSongsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Manage Songs</DialogTitle>
          <DialogDescription>
            {artist
              ? `Manage songs for ${artist.fullName}`
              : "Manage artist songs"}
          </DialogDescription>
        </DialogHeader>
        {artist && (
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={artist.avatarUrl}
                    alt={artist.fullName}
                  />
                  <AvatarFallback>
                    {artist.fullName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{artist.fullName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {artist.songs.length} songs
                  </p>
                </div>
              </div>
              <Button size="sm" className="gap-1" onClick={handleAddSong}>
                <Plus className="h-4 w-4" /> Add Song
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search songs..."
                className="pl-8"
              />
            </div>
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Album</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Plays</TableHead>
                    <TableHead>Release Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {artist.songs.map((song) => (
                    <TableRow key={song.id}>
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
                        <div className="flex flex-col">
                          <span className="font-medium">{song.title}</span>
                          {/* {song.explicit && ( */}
                            <Badge variant="outline" className="w-fit text-xs">
                              Explicit
                            </Badge>
                          {/* )} */}
                        </div>
                      </TableCell>
                      <TableCell>{song.album?.title}</TableCell>
                      <TableCell>{song.duration}</TableCell>
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
                              onClick={() => handleEditSong(song)}
                            >
                              <Pencil className="mr-2 h-4 w-4" /> Edit song
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleViewSongDetails(song)}
                            >
                              <Info className="mr-2 h-4 w-4" /> View details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleAddToPlaylist(song)}
                            >
                              <ListPlus className="mr-2 h-4 w-4" /> Add to
                              playlist
                            </DropdownMenuItem>
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
            </ScrollArea>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageSongsDialog;
