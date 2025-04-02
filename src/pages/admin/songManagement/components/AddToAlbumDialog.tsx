import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Music, Search, Plus } from "lucide-react";
import { Song, User } from "@/utils/types";
import { useMusicStore } from "@/stores/useMusicStore";

interface AddToAlbumDialogProps {
  isOpen: boolean;
  song?: Song | null;
  onOpenChange: (open: boolean) => void;
  toggleAlbumSelection: (albumId: string) => void;
  artist?: User | null;
}

const AddToAlbumDialog = ({
  isOpen,
  onOpenChange,
  toggleAlbumSelection,
  song,
  artist,
}: AddToAlbumDialogProps) => {
  const { albums } = useMusicStore();
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);

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
              <Dialog.Panel className="w-full max-w-[500px] transform overflow-hidden rounded-2xl bg-[#121212] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Add to Playlist
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    {song
                      ? `Add "${song.title}" to playlists`
                      : "Add song to playlists"}
                  </p>
                </div>

                {song && (
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 rounded-md bg-[#282828]">
                        <AvatarImage src={song.thumbnailUrl} alt={song.title} />
                        <AvatarFallback className="bg-[#282828]">
                          <Music className="h-5 w-5 text-gray-400" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-white">{song.title}</h3>
                        <p className="text-sm text-gray-400">
                          {artist?.fullName}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        type="search"
                        placeholder="Search playlists..."
                        className="pl-8 bg-[#282828] text-white border-gray-700 focus:border-[#1DB954] focus:ring-[#1DB954]"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-white">
                        Your Playlists
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1 text-white hover:bg-[#282828]"
                      >
                        <Plus className="h-3 w-3" /> Create New
                      </Button>
                    </div>

                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2">
                        {albums.map((playlist) => (
                          <div
                            key={playlist.id}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-[#282828] transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox
                                id={`playlist-${playlist.id}`}
                                checked={selectedPlaylists.includes(
                                  playlist.id
                                )}
                                onCheckedChange={() =>
                                  toggleAlbumSelection(playlist.id)
                                }
                                className="border-gray-700 data-[state=checked]:bg-[#1DB954] data-[state=checked]:border-[#1DB954]"
                              />
                              <Avatar className="h-10 w-10 rounded-md bg-[#282828]">
                                <AvatarImage
                                  src={playlist.thumbnailUrl}
                                  alt={playlist.title}
                                />
                                <AvatarFallback className="bg-[#282828]">
                                  <Music className="h-4 w-4 text-gray-400" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <label
                                  htmlFor={`playlist-${playlist.id}`}
                                  className="text-sm font-medium cursor-pointer text-white"
                                >
                                  {playlist.title}
                                </label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">
                        {selectedPlaylists.length} playlist
                        {selectedPlaylists.length !== 1 ? "s" : ""} selected
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setSelectedPlaylists([])}
                          className="border-gray-700 text-white hover:bg-[#282828]"
                        >
                          Clear
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() =>
                            setSelectedPlaylists(albums.map((p) => p.id))
                          }
                          className="border-gray-700 text-white hover:bg-[#282828]"
                        >
                          Select All
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

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
                    Add to Playlists
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

export default AddToAlbumDialog;
