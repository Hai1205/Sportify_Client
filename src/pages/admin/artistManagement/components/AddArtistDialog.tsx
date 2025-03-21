import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, UserPlus } from "lucide-react";

interface AddArtistDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddArtistDialog({ isOpen, onOpenChange }: AddArtistDialogProps) {
  const [artistName, setArtistName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
//   const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = () => {
    console.log({
      artistName,
      bio,
      selectedGenre,
    //   isVerified,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <UserPlus className="h-4 w-4" />
          Add Artist
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Artist</DialogTitle>
          <DialogDescription>Create a new artist profile on the platform.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Nhập tên nghệ sĩ */}
          <div className="grid gap-2">
            <Label htmlFor="artist-fullName">Artist Name</Label>
            <Input
              id="artist-fullName"
              placeholder="Enter artist fullName"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            />
          </div>

          {/* Chọn thể loại âm nhạc */}
          <div className="grid gap-2">
            <Label htmlFor="genres">Genres</Label>
            <Select onValueChange={setSelectedGenre}>
              <SelectTrigger id="genres">
                <SelectValue placeholder="Select genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pop">Pop</SelectItem>
                <SelectItem value="rock">Rock</SelectItem>
                <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                <SelectItem value="r&b">R&B</SelectItem>
                <SelectItem value="country">Country</SelectItem>
                <SelectItem value="electronic">Electronic</SelectItem>
                <SelectItem value="jazz">Jazz</SelectItem>
                <SelectItem value="classical">Classical</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">You can select multiple genres</p>
          </div>

          {/* Nhập tiểu sử nghệ sĩ */}
          <div className="grid gap-2">
            <Label htmlFor="bio">Biography</Label>
            <Textarea
              id="bio"
              placeholder="Enter artist biography"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          {/* Upload ảnh đại diện */}
          <div className="grid gap-2">
            <Label htmlFor="artist-image">Profile Image</Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="artist-image"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (max. 2MB)</p>
                </div>
                <Input id="artist-image" type="file" className="hidden" />
              </label>
            </div>
          </div>

          {/* Xác thực nghệ sĩ */}
          {/* <div className="flex items-center space-x-2">
            <Checkbox id="verified" checked={isVerified} onCheckedChange={(checked) => onOpenChange(checked === true)} />
            <label htmlFor="verified" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Verified Artist
            </label>
          </div> */}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Artist</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
