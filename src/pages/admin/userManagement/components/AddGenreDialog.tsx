import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
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
  selectedArtist?: User | null;
}

const AddGenreDialog = ({
  isOpen,
  onOpenChange,
  toggleGenreSelection,
  availableGenres,
  selectedArtist,
}: AddGenreDialogProps) => {
  const [newGenre, setNewGenre] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#121212] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Add Genre
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    {selectedArtist
                      ? `Add genres to ${selectedArtist.fullName}`
                      : "Add genres to artist"}
                  </p>
                </div>

                <div className="grid gap-4 py-4">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Enter a new genre"
                      value={newGenre}
                      onChange={(e) => setNewGenre(e.target.value)}
                      className="bg-[#282828] text-white border-gray-700"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (newGenre.trim()) {
                          setSelectedGenres([
                            ...selectedGenres,
                            newGenre.trim(),
                          ]);
                          setNewGenre("");
                        }
                      }}
                      className="border-gray-700 text-white hover:bg-[#282828]"
                    >
                      Add
                    </Button>
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-white">Popular Genres</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableGenres.slice(0, 15).map((genre) => (
                        <Badge
                          key={genre}
                          variant={
                            selectedGenres.includes(genre)
                              ? "default"
                              : "outline"
                          }
                          className={`cursor-pointer ${
                            selectedGenres.includes(genre)
                              ? "bg-[#1DB954] hover:bg-[#1ed760]"
                              : "border-gray-700 text-white hover:bg-[#282828]"
                          }`}
                          onClick={() => toggleGenreSelection(genre)}
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="grid gap-2">
                    <Label className="text-white">All Genres</Label>
                    <ScrollArea className="h-[200px] rounded-md border border-gray-700 p-2 bg-[#282828]">
                      <div className="grid grid-cols-2 gap-2">
                        {availableGenres.map((genre) => (
                          <div
                            key={genre}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`genre-${genre}`}
                              checked={selectedGenres.includes(genre)}
                              onCheckedChange={() =>
                                toggleGenreSelection(genre)
                              }
                              className="border-gray-700 text-[#1DB954]"
                            />
                            <label
                              htmlFor={`genre-${genre}`}
                              className="text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {genre}
                            </label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-white">Selected Genres</Label>
                    <div className="flex flex-wrap gap-2 min-h-[40px] p-2 rounded-md border border-gray-700 bg-[#282828]">
                      {selectedGenres.map((genre) => (
                        <Badge
                          key={genre}
                          className="flex items-center gap-1 px-3 py-1 bg-[#1DB954]"
                        >
                          {genre}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 ml-1 hover:bg-[#1ed760]"
                            onClick={() =>
                              setSelectedGenres(
                                selectedGenres.filter((g) => g !== genre)
                              )
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

                <div className="mt-4 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="border-gray-700 text-white hover:bg-red-500 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleClose}
                    className="bg-[#1DB954] hover:bg-[#1ed760] text-white"
                  >
                    Save Genres
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddGenreDialog;
