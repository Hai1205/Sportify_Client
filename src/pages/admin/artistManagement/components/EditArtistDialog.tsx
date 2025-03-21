import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { User } from "@/utils/types";

interface EditArtistDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  handleAddGenre: (artist: User) => void;
  selectedArtist: User | null;
}

export default function EditArtistDialog({
  isOpen,
  onOpenChange,
  handleAddGenre,
  selectedArtist,
}: EditArtistDialogProps) {
  const [artist, setArtist] = useState<User | null>(selectedArtist);

  if (!artist) return null;

  const handleChange = (field: keyof User, value: string) => {
    setArtist((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Artist</DialogTitle>
          <DialogDescription>
            Update artist information and details.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={artist.avatarUrl} alt={artist.fullName} />
              <AvatarFallback>{artist.fullName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Change Avatar
            </Button>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-artist-fullName">Artist Name</Label>
            <Input
              id="edit-artist-fullName"
              value={artist.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Genres</Label>
            <div className="flex flex-wrap gap-2">
              {artist.genres.map((genre, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  {genre}
                </Badge>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3"
                onClick={() => {
                  if (selectedArtist) {
                    handleAddGenre(selectedArtist);
                  }
                }}
              >
                <Plus className="h-3 w-3 mr-1" /> Add Genre
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-bio">Biography</Label>
            <Textarea
              id="edit-bio"
              value={artist.biography}
              onChange={(e) => handleChange("biography", e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-website">Website</Label>
              <Input
                id="edit-website"
                value={artist.website}
                onChange={(e) => handleChange("website", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-join-date">Join Date</Label>
              <Input
                id="edit-join-date"
                type="date"
                value={artist.created_at}
                onChange={(e) => handleChange("created_at", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Social Media</Label>
            <div className="grid grid-cols-3 gap-4">
              <Input
                id="edit-instagram"
                placeholder="Instagram"
                value={artist.instagram || ""}
                onChange={(e) => handleChange("instagram", e.target.value)}
              />
              <Input
                id="edit-twitter"
                placeholder="Twitter"
                value={artist.twitter || ""}
                onChange={(e) => handleChange("twitter", e.target.value)}
              />
              <Input
                id="edit-facebook"
                placeholder="Facebook"
                value={artist.facebook || ""}
                onChange={(e) => handleChange("facebook", e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
