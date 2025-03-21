import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
import { Album, Song } from "@/utils/types";

type EditSongDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  song: Song | null;
  albums: Album[];
  genres: string[];
};

const EditSongDialog = ({ isOpen, onOpenChange, song, albums, genres }: EditSongDialogProps) => {
  if (!song) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Song</DialogTitle>
          <DialogDescription>
            Edit details for "{song.title}"
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh]">
          <div className="grid gap-4 py-4 px-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center col-span-1 row-span-3">
                <div className="relative w-full h-40 border rounded-lg overflow-hidden flex items-center justify-center">
                  <img src={song.thumbnailUrl || "/placeholder.svg"} alt={song.title} className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button variant="secondary" size="sm">Change Cover</Button>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-song-title">Song Title</Label>
                <Input id="edit-song-title" defaultValue={song.title} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-song-album">Album</Label>
                <Select defaultValue={song.album?.title}>
                  <SelectTrigger id="edit-song-album">
                    <SelectValue placeholder="Select album" />
                  </SelectTrigger>
                  <SelectContent>
                    {albums.map((album) => (
                      <SelectItem key={album.id} value={album.id}>{album.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-song-genre">Genre</Label>
                <Select defaultValue={song.genre}>
                  <SelectTrigger id="edit-song-genre">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.slice(0, 15).map((genre) => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-song-duration">Duration</Label>
                <Input id="edit-song-duration" defaultValue={song.duration} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-song-release-date">Release Date</Label>
                <Input id="edit-song-release-date" type="date" defaultValue={song.releaseDate} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-song-lyrics">Lyrics</Label>
              <Textarea id="edit-song-lyrics" defaultValue={song.lyrics} rows={5} />
            </div>
            {/* <div className="flex items-center space-x-2">
              <Checkbox id="edit-song-explicit" defaultChecked={song.explicit} />
              <label htmlFor="edit-song-explicit" className="text-sm font-medium leading-none">Explicit Content</label>
            </div> */}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSongDialog;
