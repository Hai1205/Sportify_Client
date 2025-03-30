import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
import { Album, Song } from "@/utils/types";

type EditSongDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  song: Song | null;
  albums: Album[];
};

const EditSongDialog = ({
  isOpen,
  onOpenChange,
  song,
  albums,
}: EditSongDialogProps) => {
  if (!song) return null;

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
              <Dialog.Panel className="w-full max-w-[600px] transform overflow-hidden rounded-2xl bg-[#121212] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Edit Song
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    Edit details for "{song.title}"
                  </p>
                </div>

                <ScrollArea className="max-h-[70vh] mt-4">
                  <div className="grid gap-4 py-4 px-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-center col-span-1 row-span-3">
                        <div className="relative w-full h-40 border border-gray-700 rounded-lg overflow-hidden flex items-center justify-center bg-[#282828]">
                          <img
                            src={song.thumbnailUrl || "/placeholder.svg"}
                            alt={song.title}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="bg-[#1DB954] text-white hover:bg-[#1ed760]"
                            >
                              Change Cover
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-song-title" className="text-white">
                          Song Title
                        </Label>
                        <Input
                          id="edit-song-title"
                          defaultValue={song.title}
                          className="bg-[#282828] text-white border-gray-700 focus:border-[#1DB954] focus:ring-[#1DB954]"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-song-album" className="text-white">
                          Album
                        </Label>
                        <Select defaultValue={song.album?.title}>
                          <SelectTrigger
                            id="edit-song-album"
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label
                          htmlFor="edit-song-duration"
                          className="text-white"
                        >
                          Duration
                        </Label>
                        <Input
                          id="edit-song-duration"
                          defaultValue={song.duration}
                          className="bg-[#282828] text-white border-gray-700 focus:border-[#1DB954] focus:ring-[#1DB954]"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label
                          htmlFor="edit-song-release-date"
                          className="text-white"
                        >
                          Release Date
                        </Label>
                        <Input
                          id="edit-song-release-date"
                          type="date"
                          defaultValue={song.releaseDate}
                          className="bg-[#282828] text-white border-gray-700 focus:border-[#1DB954] focus:ring-[#1DB954]"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-song-lyrics" className="text-white">
                        Lyrics
                      </Label>
                      <Textarea
                        id="edit-song-lyrics"
                        defaultValue={song.lyrics}
                        rows={5}
                        className="bg-[#282828] text-white border-gray-700 focus:border-[#1DB954] focus:ring-[#1DB954]"
                      />
                    </div>
                    {/* <div className="flex items-center space-x-2">
                      <Checkbox id="edit-song-explicit" defaultChecked={song.explicit} />
                      <label htmlFor="edit-song-explicit" className="text-sm font-medium leading-none">Explicit Content</label>
                    </div> */}
                  </div>
                </ScrollArea>

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
                    className="bg-[#1DB954] text-white hover:bg-[#1ed760]"
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
};

export default EditSongDialog;
