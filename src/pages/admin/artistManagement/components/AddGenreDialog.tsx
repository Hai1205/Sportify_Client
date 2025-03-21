import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { User } from "@/utils/types";

interface AddGenreDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  toggleGenreSelection: (genre: string) => void;
  availableGenres: string[];
  selectedArtist?: User|null;
}

const AddGenreDialog = ({ isOpen, onOpenChange, toggleGenreSelection, availableGenres, selectedArtist }: AddGenreDialogProps) => {
  const [newGenre, setNewGenre] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

//   const toggleGenreSelection = (genre: string) => {
//     setSelectedGenres((prev) =>
//       prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
//     );
//   };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Genre</DialogTitle>
          <DialogDescription>
            {selectedArtist
              ? `Add genres to ${selectedArtist.fullName}`
              : "Add genres to artist"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Enter a new genre"
              value={newGenre}
              onChange={(e) => setNewGenre(e.target.value)}
            />
            <Button
              variant="outline"
              onClick={() => {
                if (newGenre.trim()) {
                  setSelectedGenres([...selectedGenres, newGenre.trim()]);
                  setNewGenre("");
                }
              }}
            >
              Add
            </Button>
          </div>

          <div className="grid gap-2">
            <Label>Popular Genres</Label>
            <div className="flex flex-wrap gap-2">
              {availableGenres.slice(0, 15).map((genre) => (
                <Badge
                  key={genre}
                  variant={selectedGenres.includes(genre) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleGenreSelection(genre)}
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid gap-2">
            <Label>All Genres</Label>
            <ScrollArea className="h-[200px] rounded-md border p-2">
              <div className="grid grid-cols-2 gap-2">
                {availableGenres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                      id={`genre-${genre}`}
                      checked={selectedGenres.includes(genre)}
                      onCheckedChange={() => toggleGenreSelection(genre)}
                    />
                    <label
                      htmlFor={`genre-${genre}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {genre}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="grid gap-2">
            <Label>Selected Genres</Label>
            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 rounded-md border">
              {selectedGenres.map((genre) => (
                <Badge key={genre} className="flex items-center gap-1 px-3 py-1">
                  {genre}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() =>
                      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                    <span className="sr-only">Remove</span>
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Save Genres</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddGenreDialog;
