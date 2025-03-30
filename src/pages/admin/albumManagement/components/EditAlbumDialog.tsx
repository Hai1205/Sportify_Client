import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, Pencil, Trash } from "lucide-react";
import { Album, Song } from "@/utils/types";

interface EditAlbumDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAlbum: Album | null;
  albumSongs: Song[];
  handleEditSong: (song: Song) => void;
  handleRemoveSongFromAlbum: (songId: string) => void;
}

const EditAlbumDialog = ({
  isOpen,
  onOpenChange,
  selectedAlbum,
  albumSongs,
  handleEditSong,
  handleRemoveSongFromAlbum,
}: EditAlbumDialogProps) => {
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
                  Edit Album
                </Dialog.Title>
             
                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    {selectedAlbum
                      ? `Edit details for "${selectedAlbum.title}"`
                      : "Edit album details"}
                  </p>
                </div>

                {selectedAlbum && (
                  <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-4">
                        <div className="relative w-full h-48 border border-gray-700 rounded-lg flex items-center justify-center overflow-hidden bg-[#282828]">
                          <img
                            src={
                              selectedAlbum.thumbnailUrl || "/placeholder.svg"
                            }
                            alt={selectedAlbum.title}
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
                     
                        <label
                          htmlFor="album-cover"
                          className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer bg-[#282828] hover:bg-[#333333] transition-colors"
                        >
                          <div className="flex items-center justify-center">
                            <Upload className="w-4 h-4 mr-2 text-gray-400" />
                         
                            <p className="text-sm text-gray-400">
                              Upload New Cover
                            </p>
                          </div>
                         
                          <Input
                            id="album-cover"
                            type="file"
                            className="hidden"
                          />
                        </label>
                      </div>
                    
                      <div className="flex flex-col gap-4">
                        <Label
                          htmlFor="edit-album-title"
                          className="text-white"
                        >
                          Album Title
                        </Label>
                       
                        <Input
                          id="edit-album-title"
                          defaultValue={selectedAlbum.title}
                          className="bg-[#282828] text-white border-gray-700 focus:border-[#1DB954] focus:ring-[#1DB954]"
                        />

                        <Label
                          htmlFor="edit-album-release-date"
                          className="text-white"
                        >
                          Release Date
                        </Label>
                      
                        <Input
                          id="edit-album-release-date"
                          type="date"
                          defaultValue={selectedAlbum.releaseDate}
                          className="bg-[#282828] text-white border-gray-700 focus:border-[#1DB954] focus:ring-[#1DB954]"
                        />

                        <Label
                          htmlFor="edit-album-record-label"
                          className="text-white"
                        >
                          Record Label
                        </Label>
                     
                        <Input
                          id="edit-album-record-label"
                          placeholder="Enter record label"
                          defaultValue="Republic Records"
                          className="bg-[#282828] text-white border-gray-700 focus:border-[#1DB954] focus:ring-[#1DB954]"
                        />
                      </div>
                    </div>

                    <Separator className="bg-gray-700" />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">
                          Album Songs
                        </h3>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-700">
                            <TableHead className="text-white">Title</TableHead>
                            
                            <TableHead className="text-white">
                              Duration
                            </TableHead>
                           
                            <TableHead className="text-white">
                              Song #
                            </TableHead>
                           
                            <TableHead className="text-right text-white">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                       
                        <TableBody>
                          {albumSongs.length > 0 ? (
                            albumSongs.map((song) => (
                              <TableRow
                                key={song.id}
                                className="border-gray-700"
                              >
                                <TableCell>
                                  <span className="font-medium text-white">
                                    {song.title}
                                  </span>
                                </TableCell>
                               
                                <TableCell className="text-white">
                                  {song.duration}
                                </TableCell>
                             
                                <TableCell className="text-right">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-[#282828]"
                                    onClick={() => handleEditSong(song)}
                                  >
                                    <Pencil className="h-4 w-4 text-white" />
                                  </Button>
                               
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500 hover:bg-red-500 hover:text-white"
                                    onClick={() =>
                                      handleRemoveSongFromAlbum(song.id)
                                    }
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow className="border-gray-700">
                              <TableCell
                                colSpan={4}
                                className="text-center py-4 text-gray-400"
                              >
                                No tracks added
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
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

export default EditAlbumDialog;
