import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, ListPlus, Pencil, Clock, Calendar, BarChart2, Music } from "lucide-react";
import { Song, User } from "@/utils/types";

interface ViewSongDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  song?: Song | null;
  artist?: User | null;
  onAddToPlaylist: (song: Song) => void;
  onEditSong: (song: Song) => void;
}

const ViewSongDetailsDialog= ({
  isOpen,
  onOpenChange,
  song,
  artist,
  onAddToPlaylist,
  onEditSong,
}: ViewSongDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Song Details</DialogTitle>
          <DialogDescription>
            {song ? `Detailed information for "${song.title}"` : "Song details"}
          </DialogDescription>
        </DialogHeader>

        {song && (
          <div className="grid gap-6 py-4">
            <div className="flex gap-6">
              <Avatar className="h-32 w-32 rounded-md">
                <AvatarImage src={song.thumbnailUrl} alt={song.title} />
                <AvatarFallback>
                  <Music className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-between">
                <h2 className="text-2xl font-bold">{song.title}</h2>
                <p className="text-muted-foreground">{artist?.fullName}</p>
                <p className="text-sm">Album: {song.album?.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  {/* {song.explicit && <Badge variant="outline" className="text-xs">Explicit</Badge>} */}
                  <Badge variant="outline" className="text-xs">{song.genre}</Badge>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="gap-1">
                    <Play className="h-4 w-4" /> Play
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => onAddToPlaylist(song)}>
                    <ListPlus className="h-4 w-4" /> Add to Playlist
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => onEditSong(song)}>
                    <Pencil className="h-4 w-4" /> Edit
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Song Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Duration:</span> <span className="text-sm">{song.duration}</span></div>
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Release Date:</span> <span className="text-sm">{song.releaseDate}</span></div>
                  <div className="flex items-center gap-2"><BarChart2 className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Plays:</span> <span className="text-sm">{song.views}</span></div>
                  <div className="flex items-start gap-2"><Music className="h-4 w-4 text-muted-foreground mt-0.5" /><span className="text-sm font-medium">Writers:</span> <span className="text-sm">{song.user.fullName}</span></div>
                  {/* <div className="flex items-start gap-2"><Disc className="h-4 w-4 text-muted-foreground mt-0.5" /><span className="text-sm font-medium">Producers:</span> <span className="text-sm">{song.producers.join(", ")}</span></div> */}
                  {/* <div className="flex items-center gap-2"><span className="text-sm font-medium">Record Label:</span> <span className="text-sm">{song.recordLabel}</span></div>
                  <div className="flex items-center gap-2"><span className="text-sm font-medium">Track Number:</span> <span className="text-sm">{song.trackNumber}</span></div>
                  <div className="flex items-center gap-2"><span className="text-sm font-medium">BPM:</span> <span className="text-sm">{song.bpm}</span></div> */}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Lyrics</h3>
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <div className="text-sm whitespace-pre-line">{song.lyrics}</div>
                </ScrollArea>
              </div>
            </div>

            <Separator />

            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewSongDetailsDialog;