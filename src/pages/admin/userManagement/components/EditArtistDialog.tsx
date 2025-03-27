import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
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

  useEffect(() => {
    setArtist(selectedArtist);
  }, [selectedArtist]);

  if (!artist) return null;

  const handleChange = (field: keyof User, value: string) => {
    setArtist((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

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
                  Edit Artist
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    Update artist information and details.
                  </p>
                </div>

                <div className="grid gap-4 py-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={artist.avatarUrl}
                        alt={artist.fullName}
                      />
                      <AvatarFallback>
                        {artist.fullName.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-white hover:bg-[#282828]"
                    >
                      Change Avatar
                    </Button>
                  </div>

                  <div className="grid gap-2">
                    <Label
                      htmlFor="edit-artist-fullName"
                      className="text-white"
                    >
                      Artist Name
                    </Label>
                    <Input
                      id="edit-artist-fullName"
                      value={artist.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      className="bg-[#282828] text-white border-gray-700"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-white">Genres</Label>
                    <div className="flex flex-wrap gap-2">
                      {artist.genres.map((genre, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="flex items-center gap-1 px-3 py-1 border-gray-700 text-white"
                        >
                          {genre}
                        </Badge>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 border-gray-700 text-white hover:bg-[#282828]"
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
                      onChange={(e) =>
                        handleChange("biography", e.target.value)
                      }
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-website">Website</Label>
                      <Input
                        id="edit-website"
                        value={artist.website}
                        onChange={(e) =>
                          handleChange("website", e.target.value)
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-join-date">Join Date</Label>
                      <Input
                        id="edit-join-date"
                        type="date"
                        value={artist.created_at}
                        onChange={(e) =>
                          handleChange("created_at", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleChange("instagram", e.target.value)
                        }
                      />
                      <Input
                        id="edit-twitter"
                        placeholder="Twitter"
                        value={artist.twitter || ""}
                        onChange={(e) =>
                          handleChange("twitter", e.target.value)
                        }
                      />
                      <Input
                        id="edit-facebook"
                        placeholder="Facebook"
                        value={artist.facebook || ""}
                        onChange={(e) =>
                          handleChange("facebook", e.target.value)
                        }
                      />
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
                    Save Changes
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
