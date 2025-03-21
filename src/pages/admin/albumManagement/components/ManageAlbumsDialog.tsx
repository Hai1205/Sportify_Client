import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, Pencil, Trash, Disc } from "lucide-react";
import { Album, User } from "@/utils/types";

interface ManageAlbumsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  artist?: User | null;
  albums: Album[];
  handleViewAlbum: (album: Album) => void;
  handleEditAlbum: (album: Album) => void;
}

export default function ManageAlbumsDialog({
  isOpen,
  onOpenChange,
  artist,
  albums,
  handleViewAlbum,
  handleEditAlbum
}: ManageAlbumsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Manage Albums</DialogTitle>
          <DialogDescription>
            {artist ? `Manage albums for ${artist.fullName}` : "Manage artist albums"}
          </DialogDescription>
        </DialogHeader>
        {artist && (
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={artist.avatarUrl} alt={artist.fullName} />
                  <AvatarFallback>{artist.fullName.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{artist.fullName}</h3>
                  <p className="text-sm text-muted-foreground">{Math.ceil(artist.songs.length / 12)} albums</p>
                </div>
              </div>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" /> Add Album
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search albums..." className="pl-8" />
            </div>
            <ScrollArea className="h-[400px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {albums.map((album) => (
                  <div key={album.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50">
                    <Avatar className="h-16 w-16 rounded-md">
                      <AvatarImage src={album.thumbnailUrl} alt={album.title} />
                      <AvatarFallback>
                        <Disc className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        {/* <div>
                          <h4 className="font-medium">{album.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {album.tracks} tracks • {album.releaseDate}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{album.totalPlays} total plays</p>
                        </div> */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" /> Edit album
                            </DropdownMenuItem>
                            <DropdownMenuItem>View tracks</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Change cover</DropdownMenuItem>
                            <DropdownMenuItem>Update metadata</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" /> Delete album
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => handleViewAlbum(album)}
                        >
                          View Tracks
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => handleEditAlbum(album)}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
}
