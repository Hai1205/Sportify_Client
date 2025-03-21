import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
import { Upload, Plus, Pencil, Trash } from "lucide-react";
import { Album, Song } from "@/utils/types";

interface EditAlbumDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAlbum: Album | null;
  albumSongs: Song[];
  availableGenres: string[];
  handleAddSong: () => void;
  handleEditSong: (song: Song) => void;
  handleRemoveSongFromAlbum: (songId: string) => void;
}

const EditAlbumDialog = ({
  isOpen,
  onOpenChange,
  selectedAlbum,
  albumSongs,
  availableGenres,
  handleAddSong,
  handleEditSong,
  handleRemoveSongFromAlbum
}: EditAlbumDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Album</DialogTitle>
          <DialogDescription>
            {selectedAlbum ? `Edit details for "${selectedAlbum.title}"` : "Edit album details"}
          </DialogDescription>
        </DialogHeader>
        {selectedAlbum && (
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <div className="relative w-full h-48 border rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedAlbum.thumbnailUrl || "/placeholder.svg"}
                    alt={selectedAlbum.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button variant="secondary" size="sm">Change Cover</Button>
                  </div>
                </div>
                <label htmlFor="album-cover" className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                  <div className="flex items-center justify-center">
                    <Upload className="w-4 h-4 mr-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Upload New Cover</p>
                  </div>
                  <Input id="album-cover" type="file" className="hidden" />
                </label>
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="edit-album-title">Album Title</Label>
                <Input id="edit-album-title" defaultValue={selectedAlbum.title} />

                <Label htmlFor="edit-album-release-date">Release Date</Label>
                <Input id="edit-album-release-date" type="date" defaultValue={selectedAlbum.releaseDate} />

                <Label htmlFor="edit-album-record-label">Record Label</Label>
                <Input id="edit-album-record-label" placeholder="Enter record label" defaultValue="Republic Records" />

                <Label htmlFor="edit-album-genre">Primary Genre</Label>
                <Select defaultValue="pop">
                  <SelectTrigger id="edit-album-genre">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableGenres.slice(0, 15).map((genre) => (
                      <SelectItem key={genre} value={genre.toLowerCase()}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Album Tracks</h3>
                <Button size="sm" className="gap-1" onClick={handleAddSong}>
                  <Plus className="h-4 w-4" /> Add Track
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Track #</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {albumSongs.length > 0 ? (
                    albumSongs.map((song) => (
                      <TableRow key={song.id}>
                        <TableCell>
                          <span className="font-medium">{song.title}</span>
                          {/* {song.explicit && <Badge variant="outline" className="w-fit text-xs">Explicit</Badge>} */}
                        </TableCell>
                        <TableCell>{song.duration}</TableCell>
                        {/* <TableCell>
                          <Input type="number" min="1" className="w-16 h-8" defaultValue={song.trackNumber || index + 1} />
                        </TableCell> */}
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditSong(song)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleRemoveSongFromAlbum(song.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">No tracks added</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAlbumDialog;
