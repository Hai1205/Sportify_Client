import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Upload } from "lucide-react";

interface AddAlbumDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddAlbumDialog = ({ isOpen, onOpenChange }: AddAlbumDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <Plus className="h-4 w-4" />
          Add Album
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Album</DialogTitle>
          <DialogDescription>Upload a new album to the platform.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Album Title</Label>
            <Input id="title" placeholder="Enter song title" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="artist">Artist</Label>
              <Input id="artist" placeholder="Enter artist name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="album">Album</Label>
              <Input id="album" placeholder="Enter album name" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" placeholder="e.g. 3:45" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="release-date">Release Date</Label>
              <Input id="release-date" type="date" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="file">Audio File</Label>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">MP3, WAV or FLAC (max. 50MB)</p>
                </div>
                <Input id="file" type="file" className="hidden" />
              </label>
            </div>
          </div>

          {/* <div className="flex items-center space-x-2">
            <Checkbox id="explicit" />
            <label htmlFor="explicit" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Explicit Content
            </label>
          </div> */}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button>Upload Album</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAlbumDialog;
