import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Album } from "@/utils/types";
import LoadingSpinner from "@/components/ui/loading";
import { Music, Save } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMusicStore } from "@/stores/useMusicStore";

type EditAlbumDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  album: Album | null;
  onAlbumUpdated?: (updatedAlbum: Album) => void;
};

const EditAlbumDialog = ({
  isOpen,
  onOpenChange,
  album,
  onAlbumUpdated,
}: EditAlbumDialogProps) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [albumData, setAlbumData] = useState({
    title: album?.title || "",
  });

  const { updateSong } = useMusicStore();
  useEffect(() => {
    if (album) {
      setAlbumData({
        title: album.title,
      });

      setThumbnail(null);
    }
  }, [album]);

  const handleChange = (field: keyof typeof albumData, value: string) => {
    setAlbumData((prev) => ({ ...prev, [field]: value }));
  };

  if (!album) {
    return null;
  }

  const handleUpdateAlbum = async () => {
    const formData = new FormData();
    formData.append("title", albumData.title || "");
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    setIsLoading(true);
    const res = await updateSong(album?.id, formData);
    setIsLoading(false);

    if (!res) {
      return;
    }

    if (onAlbumUpdated) {
      onAlbumUpdated({ ...album, ...albumData });
    }

    handleClose();
  };

  const handleClose = () => {
    onOpenChange(false);
    setThumbnail(null);
  };

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnail(file);
    }
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
                  Edit Album
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    Edit details for "{album.title}"
                  </p>
                </div>

                <ScrollArea className="max-h-[70vh] mt-4">
                  <div className="grid gap-4 py-4 px-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-center col-span-1 row-span-3">
                        <div className="relative w-full h-40 border border-gray-700 rounded-lg overflow-hidden flex items-center justify-center bg-[#282828]">
                          <Avatar className="rounded-md object-cover w-full h-full">
                            <AvatarImage
                              src={
                                thumbnail
                                  ? URL.createObjectURL(thumbnail)
                                  : album.thumbnailUrl || "/placeholder.svg"
                              }
                              alt={album.title}
                            />
                            <AvatarFallback>
                              <Music />
                            </AvatarFallback>
                          </Avatar>

                          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="bg-[#1DB954] text-white hover:bg-[#1ed760]"
                              onClick={() =>
                                document
                                  .getElementById("thumbnail-input")
                                  ?.click()
                              }
                            >
                              Change
                            </Button>

                            <input
                              id="thumbnail-input"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleThumbnailChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* <div className="grid gap-2"> */}
                      <Label htmlFor="edit-album-title" className="text-white">
                        Album Title
                      </Label>

                      <Input
                        id="edit-album-title"
                        value={albumData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className="bg-[#282828] text-white border-gray-700 focus:border-[#1DB954] focus:ring-[#1DB954]"
                      />
                    </div>
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
                    onClick={handleUpdateAlbum}
                    className="bg-[#1DB954] hover:bg-[#1ed760] text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Update
                      </>
                    )}
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
