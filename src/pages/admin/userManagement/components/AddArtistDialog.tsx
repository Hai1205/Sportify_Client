import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, UserPlus } from "lucide-react";

interface AddArtistDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddArtistDialog({ isOpen, onOpenChange }: AddArtistDialogProps) {
  const [artistName, setArtistName] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = () => {
    console.log({
      artistName,
      bio,
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
          <div className="grid gap-2">
            <Label htmlFor="artist-fullName">Artist Name</Label>
          
            <Input
              id="artist-fullName"
              placeholder="Enter artist fullName"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bio">Biography</Label>
      
            <Textarea
              id="bio"
              placeholder="Enter artist biography"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
         
          <Button onClick={handleSubmit}>Create Artist</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
