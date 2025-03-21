import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import { Album, User } from "@/utils/types";

interface AddSongDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onManageSongsOpen: (open: boolean) => void;
  artist?: User | null;
  albums: Album[];
  availableGenres: string[];
}

const AddSongDialog = ({
  isOpen,
  onOpenChange,
  onManageSongsOpen,
  artist,
  albums,
  availableGenres,
}: AddSongDialogProps) => {
  const [songTitle, setSongTitle] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState<string | undefined>();
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  console.log(thumbnail);

  const handleCoverArtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setThumbnail(event.target.files[0]);
    }
  };

  const handleAddSong = () => {
    if (!songTitle || !selectedAlbum || !selectedGenre) {
      alert("Please fill all required fields.");
      return;
    }
    onOpenChange(false);
    onManageSongsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
          <DialogDescription>
            {artist
              ? `Add a new song for ${artist.fullName}`
              : "Add a new song"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center col-span-1 row-span-3">
              <div className="relative w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50 hover:bg-muted cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Upload Cover Art
                  </p>
                </div>
                <Input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleCoverArtChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="song-title">Song Title</Label>
              <Input
                id="song-title"
                placeholder="Enter song title"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="song-album">Album</Label>
              <Select onValueChange={setSelectedAlbum}>
                <SelectTrigger id="song-album">
                  <SelectValue placeholder="Select album" />
                </SelectTrigger>
                <SelectContent>
                  {albums.map((album) => (
                    <SelectItem key={album.id} value={album.id}>
                      {album.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="song-genre">Genre</Label>
              <Select onValueChange={setSelectedGenre}>
                <SelectTrigger id="song-genre">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {availableGenres.slice(0, 15).map((genre) => (
                    <SelectItem key={genre} value={genre.toLowerCase()}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddSong}>Add Song</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
