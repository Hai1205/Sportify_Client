import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Music, Search, Plus } from "lucide-react";
import { Song, User } from "@/utils/types";
import { useMusicStore } from "@/stores/useMusicStore";

interface AddToPlaylistDialogProps {
  isOpen: boolean;
  song?: Song | null;
  onOpenChange: (open: boolean) => void;
  togglePlaylistSelection: (playlistId: string) => void;
  artist?: User | null;
}

const AddToPlaylistDialog = ({
  isOpen,
  onOpenChange,
  togglePlaylistSelection,
  song,
  artist,
}: AddToPlaylistDialogProps) => {
  const {albums, getUserAlbums} = useMusicStore();

  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);

  // const togglePlaylistSelection = (playlistId: string) => {
  //   setSelectedPlaylists((prev) =>
  //     prev.includes(playlistId)
  //       ? prev.filter((id) => id !== playlistId)
  //       : [...prev, playlistId]
  //   );
  // };

    useEffect(() => {
      if (artist === undefined || artist === null){
        return;
      }

      getUserAlbums(artist.id);
    }, [artist, getUserAlbums]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add to Playlist</DialogTitle>
          <DialogDescription>
            {song
              ? `Add "${song.title}" to playlists`
              : "Add song to playlists"}
          </DialogDescription>
        </DialogHeader>
        {song && (
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 rounded-md">
                <AvatarImage
                  src={song.thumbnailUrl}
                  alt={song.title}
                />
                <AvatarFallback>
                  <Music className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{song.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {artist?.fullName}
                </p>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search playlists..."
                className="pl-8"
              />
            </div>

            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Your Playlists</h3>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <Plus className="h-3 w-3" /> Create New
              </Button>
            </div>

            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {albums.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`playlist-${playlist.id}`}
                        checked={selectedPlaylists.includes(playlist.id)}
                        onCheckedChange={() =>
                          togglePlaylistSelection(playlist.id)
                        }
                      />
                      <Avatar className="h-10 w-10 rounded-md">
                        <AvatarImage
                          src={playlist.thumbnailUrl}
                          alt={playlist.title}
                        />
                        <AvatarFallback>
                          <Music className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <label
                          htmlFor={`playlist-${playlist.id}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {playlist.title}
                        </label>
                        {/* <p className="text-xs text-muted-foreground">
                          {playlist.tracks} tracks
                        </p> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {selectedPlaylists.length} playlist
                {selectedPlaylists.length !== 1 ? "s" : ""} selected
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedPlaylists([])}
                >
                  Clear
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setSelectedPlaylists(albums.map((p) => p.id))
                  }
                >
                  Select All
                </Button>
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Add to Playlists</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToPlaylistDialog;
