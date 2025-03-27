import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  // Plus,
  Play,
  Pause,
  Search,
  MoreHorizontal,
  Pencil,
  Info,
  ListPlus,
  Trash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Song, User } from "@/utils/types";

interface ManageSongsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  artist?: User | null;
  playingSong?: string | null;
  // handleAddSong: () => void;
  togglePlaySong: (id: string) => void;
  handleEditSong: (song: Song) => void;
  handleViewSongDetails: (song: Song) => void;
  handleAddToPlaylist: (song: Song) => void;
}

const ManageSongsDialog = ({
  isOpen,
  onOpenChange,
  artist,
  // handleAddSong,
  togglePlaySong,
  playingSong,
  handleEditSong,
  handleViewSongDetails,
  handleAddToPlaylist,
}: ManageSongsDialogProps) => {
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
                  Manage Songs
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    {artist
                      ? `Manage songs for ${artist.fullName}`
                      : "Manage artist songs"}
                  </p>
                </div>

                {artist && (
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={artist.avatarUrl}
                            alt={artist.fullName}
                          />
                          <AvatarFallback>
                            {artist.fullName.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-white">
                            {artist.fullName}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {artist.songs.length} songs
                          </p>
                        </div>
                      </div>
                      {/* <Button
                        size="sm"
                        className="gap-1 bg-[#1DB954] hover:bg-[#1ed760] text-white"
                        onClick={handleAddSong}
                      >
                        <Plus className="h-4 w-4" /> Add Song
                      </Button> */}
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        type="search"
                        placeholder="Search songs..."
                        className="pl-8 bg-[#282828] text-white border-gray-700"
                      />
                    </div>
                    <ScrollArea className="h-[400px]">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-700">
                            <TableHead className="w-[40px]"></TableHead>
                            <TableHead className="text-white">Title</TableHead>
                            <TableHead className="text-white">Album</TableHead>
                            <TableHead className="text-white">
                              Duration
                            </TableHead>
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
                          {Array.isArray(artist.songs) &&
                            artist.songs.map((song) => {
                              if (typeof song === "string") return null;
                              return (
                                <TableRow
                                  key={song.id}
                                  className="border-gray-700"
                                >
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
                                      <Badge
                                        variant="outline"
                                        className="w-fit text-xs border-gray-700 text-gray-400"
                                      >
                                        Explicit
                                      </Badge>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-white">
                                    {song.album?.title}
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
                                          <span className="sr-only">
                                            Open menu
                                          </span>
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
                                          onClick={() => handleEditSong(song)}
                                          className="text-white hover:bg-[#1DB954] hover:text-white"
                                        >
                                          <Pencil className="mr-2 h-4 w-4" />{" "}
                                          Edit song
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() =>
                                            handleViewSongDetails(song)
                                          }
                                          className="text-white hover:bg-[#1DB954] hover:text-white"
                                        >
                                          <Info className="mr-2 h-4 w-4" /> View
                                          details
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-gray-700" />
                                        <DropdownMenuItem
                                          onClick={() =>
                                            handleAddToPlaylist(song)
                                          }
                                          className="text-white hover:bg-[#1DB954] hover:text-white"
                                        >
                                          <ListPlus className="mr-2 h-4 w-4" />{" "}
                                          Add to playlist
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-white hover:bg-[#1DB954] hover:text-white">
                                          Download
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-gray-700" />
                                        <DropdownMenuItem className="text-red-600 hover:bg-red-500 hover:text-white">
                                          <Trash className="mr-2 h-4 w-4" />{" "}
                                          Delete song
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </ScrollArea>
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
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ManageSongsDialog;
