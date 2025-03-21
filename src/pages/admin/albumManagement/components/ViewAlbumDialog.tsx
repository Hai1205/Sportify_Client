import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Play, Pause, MoreHorizontal, Info, Pencil, ListPlus, Disc } from "lucide-react";
import { Album, Song, User } from "@/utils/types";

interface ViewAlbumDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (album: Album) => void;
  album: Album | null;
  artist: User | null;
  songs: Song[];
  playingSong: string | null;
  togglePlaySong: (id: string) => void;
  handleViewSongDetails: (song: Song) => void;
  handleEditSong: (song: Song) => void;
  handleAddToPlaylist: (song: Song) => void;
}

const ViewAlbumDialog = ({
  isOpen,
  onOpenChange,
  onEdit,
  album,
  artist,
  songs,
  playingSong,
  togglePlaySong,
  handleViewSongDetails,
  handleEditSong,
  handleAddToPlaylist,
}: ViewAlbumDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Album Details</DialogTitle>
          <DialogDescription>{album ? `View details for "${album.title}"` : "Album details"}</DialogDescription>
        </DialogHeader>
        {album && (
          <div className="grid gap-6 py-4">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <Avatar className="h-32 w-32 rounded-md">
                  <AvatarImage src={album.thumbnailUrl} alt={album.title} />
                  <AvatarFallback>
                    <Disc className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col justify-between">
                <h2 className="text-2xl font-bold">{album.title}</h2>
                <p className="text-muted-foreground">{artist?.fullName}</p>
                <div className="flex items-center gap-2 mt-1">
                  {/* <Badge variant="outline" className="text-xs">{album.tracks} tracks</Badge> */}
                  <Badge variant="outline" className="text-xs">{album.releaseDate}</Badge>
                </div>
                {/* <p className="text-sm mt-2">{album.totalPlays} total plays</p> */}
              </div>
            </div>

            <Separator />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Plays</TableHead>
                  <TableHead>Release Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {songs.length > 0 ? (
                  songs.map((song) => (
                    <TableRow key={song.id}>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => togglePlaySong(song.id)}>
                          {playingSong === song.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{song.title}</span>
                          {/* {song.explicit && <Badge variant="outline" className="w-fit text-xs">Explicit</Badge>} */}
                        </div>
                      </TableCell>
                      <TableCell>{song.duration}</TableCell>
                      <TableCell>{song.views}</TableCell>
                      <TableCell>{song.releaseDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewSongDetails(song)}>
                              <Info className="mr-2 h-4 w-4" /> View details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditSong(song)}>
                              <Pencil className="mr-2 h-4 w-4" /> Edit song
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleAddToPlaylist(song)}>
                              <ListPlus className="mr-2 h-4 w-4" /> Add to playlist
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No tracks found for this album
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <Separator />

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Streams</h4>
                {/* <p className="text-2xl font-bold">{album.totalPlays}</p> */}
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Release Date</h4>
                <p className="text-2xl font-bold">{album.releaseDate}</p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Tracks</h4>
                {/* <p className="text-2xl font-bold">{album.tracks}</p> */}
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={() => album && onEdit(album)}>Edit Album</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAlbumDialog;
