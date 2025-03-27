import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Play,
  ListPlus,
  Pencil,
  Clock,
  Calendar,
  BarChart2,
  Music,
} from "lucide-react";
import { Song, User } from "@/utils/types";

interface ViewSongDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  song?: Song | null;
  artist?: User | null;
  onAddToPlaylist: (song: Song) => void;
  onEditSong: (song: Song) => void;
}

const ViewSongDetailsDialog = ({
  isOpen,
  onOpenChange,
  song,
  artist,
  onAddToPlaylist,
  onEditSong,
}: ViewSongDetailsDialogProps) => {
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
              <Dialog.Panel className="w-full max-w-[700px] transform overflow-hidden rounded-2xl bg-[#121212] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Song Details
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    {song
                      ? `Detailed information for "${song.title}"`
                      : "Song details"}
                  </p>
                </div>

                {song && (
                  <div className="grid gap-6 py-4">
                    <div className="flex gap-6">
                      <Avatar className="h-32 w-32 rounded-md bg-[#282828]">
                        <AvatarImage src={song.thumbnailUrl} alt={song.title} />
                        <AvatarFallback className="bg-[#282828]">
                          <Music className="h-10 w-10 text-gray-400" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-between">
                        <h2 className="text-2xl font-bold text-white">
                          {song.title}
                        </h2>
                        <p className="text-gray-400">{artist?.fullName}</p>
                        <p className="text-sm text-gray-400">
                          Album: {song.album?.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs border-gray-700 text-gray-400"
                          >
                            {song.genre}
                          </Badge>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            className="gap-1 bg-[#1DB954] text-white hover:bg-[#1ed760]"
                          >
                            <Play className="h-4 w-4" /> Play
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 border-gray-700 text-white hover:bg-[#282828]"
                            onClick={() => onAddToPlaylist(song)}
                          >
                            <ListPlus className="h-4 w-4" /> Add to Playlist
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 border-gray-700 text-white hover:bg-[#282828]"
                            onClick={() => onEditSong(song)}
                          >
                            <Pencil className="h-4 w-4" /> Edit
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gray-700" />

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-white">
                          Song Information
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-white">
                              Duration:
                            </span>
                            <span className="text-sm text-gray-400">
                              {song.duration}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-white">
                              Release Date:
                            </span>
                            <span className="text-sm text-gray-400">
                              {song.releaseDate}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart2 className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-white">
                              Plays:
                            </span>
                            <span className="text-sm text-gray-400">
                              {song.views}
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Music className="h-4 w-4 text-gray-400 mt-0.5" />
                            <span className="text-sm font-medium text-white">
                              Writers:
                            </span>
                            <span className="text-sm text-gray-400">
                              {song.user.fullName}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-white">
                          Lyrics
                        </h3>
                        <ScrollArea className="h-[200px] rounded-md border border-gray-700 bg-[#282828] p-4">
                          <div className="text-sm whitespace-pre-line text-gray-400">
                            {song.lyrics}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>

                    <Separator className="bg-gray-700" />

                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        onClick={handleClose}
                        className="border-gray-700 text-white hover:bg-red-500 hover:text-white"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ViewSongDetailsDialog;
