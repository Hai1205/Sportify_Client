import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search,
  MoreHorizontal,
  Pencil,
  Trash,
  Disc,
} from "lucide-react";
import { Album, User } from "@/utils/types";

interface ManageAlbumsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  artist?: User | null;
  albums: Album[];
  handleViewAlbum: (album: Album) => void;
  handleEditAlbum: (album: Album) => void;
}

export default function ManageAlbumsDialog({
  isOpen,
  onOpenChange,
  artist,
  albums,
  handleViewAlbum,
  handleEditAlbum,
}: ManageAlbumsDialogProps) {
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
                  Manage Albums
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    {artist
                      ? `Manage albums for ${artist.fullName}`
                      : "Manage artist albums"}
                  </p>
                </div>

                {artist && (
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 bg-[#282828]">
                          <AvatarImage
                            src={artist.avatarUrl}
                            alt={artist.fullName}
                          />
                          <AvatarFallback className="bg-[#282828] text-gray-400">
                            {artist.fullName.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-white">
                            {artist.fullName}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {Math.ceil(artist.songs.length / 12)} albums
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        type="search"
                        placeholder="Search albums..."
                        className="pl-8 bg-[#282828] text-white border-gray-700 focus:border-[#1DB954] focus:ring-[#1DB954]"
                      />
                    </div>
                    <ScrollArea className="h-[400px]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {albums.map((album) => (
                          <div
                            key={album.id}
                            className="flex items-start gap-3 p-3 rounded-lg border border-gray-700 bg-[#282828] hover:bg-[#333333] transition-colors"
                          >
                            <Avatar className="h-16 w-16 rounded-md bg-[#1a1a1a]">
                              <AvatarImage
                                src={album.thumbnailUrl}
                                alt={album.title}
                              />
                              <AvatarFallback className="bg-[#1a1a1a]">
                                <Disc className="h-6 w-6 text-gray-400" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 hover:bg-[#1a1a1a]"
                                    >
                                      <MoreHorizontal className="h-4 w-4 text-white" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="bg-[#282828] border-gray-700"
                                  >
                                    <DropdownMenuLabel className="text-white">
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem className="text-white hover:bg-[#1DB954] hover:text-white">
                                      <Pencil className="mr-2 h-4 w-4" /> Edit
                                      album
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-white hover:bg-[#1DB954] hover:text-white">
                                      View tracks
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-gray-700" />
                                    <DropdownMenuItem className="text-white hover:bg-[#1DB954] hover:text-white">
                                      Change cover
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-white hover:bg-[#1DB954] hover:text-white">
                                      Update metadata
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-gray-700" />
                                    <DropdownMenuItem className="text-red-600 hover:bg-red-500 hover:text-white">
                                      <Trash className="mr-2 h-4 w-4" /> Delete
                                      album
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 px-2 text-xs border-gray-700 text-white hover:bg-[#1DB954] hover:text-white hover:border-transparent"
                                  onClick={() => handleViewAlbum(album)}
                                >
                                  View Tracks
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 px-2 text-xs border-gray-700 text-white hover:bg-[#1DB954] hover:text-white hover:border-transparent"
                                  onClick={() => handleEditAlbum(album)}
                                >
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                <div className="mt-4 flex justify-end">
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
}
