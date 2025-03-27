import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Play,
  Pause,
  MoreHorizontal,
  Info,
  Pencil,
  ListPlus,
  Disc,
} from "lucide-react";
import { Album, Song, User } from "@/utils/types";

interface ViewAlbumDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (album: Album) => void;
  album: Album | null;
  artist: User | null;
  songs: Song[];
  playingSong: string | null;
  togglePlaySong: (id: string) => void;
  handleViewSongDetails: (song: Song) => void;
  handleEditSong: (song: Song) => void;
  handleAddToPlaylist: (song: Song) => void;
}

const ViewAlbumDialog = ({
  isOpen,
  onOpenChange,
  onEdit,
  album,
  artist,
  songs,
  playingSong,
  togglePlaySong,
  handleViewSongDetails,
  handleEditSong,
  handleAddToPlaylist,
}: ViewAlbumDialogProps) => {
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
              <Dialog.Panel className="w-full max-w-[800px] transform overflow-hidden rounded-2xl bg-[#121212] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Album Details
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    {album
                      ? `View details for "${album.title}"`
                      : "Album details"}
                  </p>
                </div>

                {album && (
                  <div className="grid gap-6 py-4">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <Avatar className="h-32 w-32 rounded-md bg-[#282828]">
                          <AvatarImage
                            src={album.thumbnailUrl}
                            alt={album.title}
                          />
                          <AvatarFallback className="bg-[#282828]">
                            <Disc className="h-10 w-10 text-gray-400" />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-col justify-between">
                        <h2 className="text-2xl font-bold text-white">
                          {album.title}
                        </h2>
                        <p className="text-gray-400">{artist?.fullName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs border-gray-700 text-gray-400"
                          >
                            {album.releaseDate}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gray-700" />

                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700">
                          <TableHead className="w-[40px]"></TableHead>
                          <TableHead className="text-white">Title</TableHead>
                          <TableHead className="text-white">Duration</TableHead>
                          <TableHead className="text-white">Plays</TableHead>
                          <TableHead className="text-white">
                            Release Date
                          </TableHead>
                          <TableHead className="text-right text-white">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {songs.length > 0 ? (
                          songs.map((song) => (
                            <TableRow key={song.id} className="border-gray-700">
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full hover:bg-[#282828]"
                                  onClick={() => togglePlaySong(song.id)}
                                >
                                  {playingSong === song.id ? (
                                    <Pause className="h-4 w-4 text-white" />
                                  ) : (
                                    <Play className="h-4 w-4 text-white" />
                                  )}
                                </Button>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="font-medium text-white">
                                    {song.title}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-white">
                                {song.duration}
                              </TableCell>
                              <TableCell className="text-white">
                                {song.views}
                              </TableCell>
                              <TableCell className="text-white">
                                {song.releaseDate}
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 hover:bg-[#282828]"
                                    >
                                      <MoreHorizontal className="h-4 w-4 text-white" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="bg-[#282828] border-gray-700"
                                  >
                                    <DropdownMenuLabel className="text-white">
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleViewSongDetails(song)
                                      }
                                      className="text-white hover:bg-[#1DB954] hover:text-white"
                                    >
                                      <Info className="mr-2 h-4 w-4" /> View
                                      details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleEditSong(song)}
                                      className="text-white hover:bg-[#1DB954] hover:text-white"
                                    >
                                      <Pencil className="mr-2 h-4 w-4" /> Edit
                                      song
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-gray-700" />
                                    <DropdownMenuItem
                                      onClick={() => handleAddToPlaylist(song)}
                                      className="text-white hover:bg-[#1DB954] hover:text-white"
                                    >
                                      <ListPlus className="mr-2 h-4 w-4" /> Add
                                      to playlist
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow className="border-gray-700">
                            <TableCell
                              colSpan={6}
                              className="text-center py-4 text-gray-400"
                            >
                              No tracks found for this album
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>

                    <Separator className="bg-gray-700" />

                    <div className="grid grid-cols-3 gap-4">
                      <div className="rounded-lg border border-gray-700 bg-[#282828] p-4">
                        <h4 className="text-sm font-medium text-gray-400 mb-1">
                          Total Streams
                        </h4>
                      </div>
                      <div className="rounded-lg border border-gray-700 bg-[#282828] p-4">
                        <h4 className="text-sm font-medium text-gray-400 mb-1">
                          Release Date
                        </h4>
                        <p className="text-2xl font-bold text-white">
                          {album.releaseDate}
                        </p>
                      </div>
                      <div className="rounded-lg border border-gray-700 bg-[#282828] p-4">
                        <h4 className="text-sm font-medium text-gray-400 mb-1">
                          Total Tracks
                        </h4>
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
                    Close
                  </Button>
                  <Button
                    onClick={() => album && onEdit(album)}
                    className="bg-[#1DB954] text-white hover:bg-[#1ed760]"
                  >
                    Edit Album
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

export default ViewAlbumDialog;
