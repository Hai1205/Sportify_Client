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
}

const AddSongDialog = ({
  isOpen,
  onOpenChange,
  onManageSongsOpen,
  artist,
  albums,
}: AddSongDialogProps) => {
  const [songTitle, setSongTitle] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState<string | undefined>();
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleCoverArtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setThumbnail(event.target.files[0]);
    }
  };

  const handleAddSong = () => {
    if (!songTitle || !selectedAlbum) {
      alert("Please fill all required fields.");
      return;
    }
    onOpenChange(false);
    onManageSongsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
          <DialogDescription>
            {artist
              ? `Add a new song for ${artist.fullName}`
              : "Add a new song"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center w-full">
            <div className="relative w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted hover:bg-accent cursor-pointer transition-colors">
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
            <Label htmlFor="song-title" className="text-white">
              Song Title
            </Label>
            <Input
              id="song-title"
              placeholder="Enter song title"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              className="bg-[#282828] text-white border-gray-700 focus:border-[#1DB954] focus:ring-[#1DB954]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="song-album" className="text-white">
              Album
            </Label>
            <Select onValueChange={setSelectedAlbum}>
              <SelectTrigger
                id="song-album"
                className="bg-[#282828] text-white border-gray-700"
              >
                <SelectValue placeholder="Select album" />
              </SelectTrigger>
              <SelectContent className="bg-[#282828] border-gray-700">
                {albums.map((album) => (
                  <SelectItem
                    key={album.id}
                    value={album.id}
                    className="text-white hover:bg-[#1DB954] hover:text-white"
                  >
                    {album.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="hover:bg-destructive hover:text-destructive-foreground"
          >
            Cancel
          </Button>
          <Button onClick={handleAddSong}>Add Song</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
