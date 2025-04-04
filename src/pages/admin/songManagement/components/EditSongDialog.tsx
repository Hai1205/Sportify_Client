import { Fragment, useEffect, useState } from "react";
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
import { Album, Song } from "@/utils/types";
import LoadingSpinner from "@/components/ui/loading";
import { Music, Save } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMusicStore } from "@/stores/useMusicStore";

type EditSongDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  song: Song | null;
  onSongUpdated?: (updatedSong: Song) => void;
};

const EditSongDialog = ({
  isOpen,
  onOpenChange,
  song,
  onSongUpdated,
}: EditSongDialogProps) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [songData, setSongData] = useState({
    title: song?.title || "",
    lyrics: song?.lyrics || "",
    albumId: song?.album?.id || "",
  });

  const { updateSong, getUserAlbums } = useMusicStore();
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      if (song && song.user) {
        const albums = await getUserAlbums(song.user.id);
        setAlbums(albums || []);
      }
    };

    fetchAlbums();
  }, [getUserAlbums, song]);

  useEffect(() => {
    if (song) {
      setSongData({
        title: song.title,
        lyrics: song.lyrics,
        albumId: song.album?.id || "",
      });

      setThumbnail(null);
    }
  }, [song]);

  const handleChange = (field: keyof typeof songData, value: string) => {
    setSongData((prev) => ({ ...prev, [field]: value }));
  };

  if (!song) {
    return null;
  }

  const handleUpdateSong = async () => {
    const formData = new FormData();
    formData.append("albumId", songData.albumId || "");
    formData.append("title", songData.title || "");
    formData.append("lyrics", songData.lyrics || "");
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    setIsLoading(true);
    const res = await updateSong(song?.id, formData);
    setIsLoading(false);

    if (!res) {
      return;
    }

    if (onSongUpdated) {
      onSongUpdated({ ...song, ...songData });
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
                          <Avatar className="rounded-md object-cover w-full h-full">
                            <AvatarImage
                              src={
                                thumbnail
                                  ? URL.createObjectURL(thumbnail)
                                  : song.thumbnailUrl || "/placeholder.svg"
                              }
                              alt={song.title}
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

                      <div className="grid gap-2">
                        <Label htmlFor="edit-song-title" className="text-white">
                          Song Title
                        </Label>
                        <Input
                          id="edit-song-title"
                          value={songData.title}
                          onChange={(e) =>
                            handleChange("title", e.target.value)
                          }
                          className="bg-[#282828] text-white border-gray-700 focus:border-[#1DB954] focus:ring-[#1DB954]"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="edit-song-album" className="text-white">
                          Album
                        </Label>
                        <Select
                          value={songData.albumId}
                          onValueChange={(value) =>
                            handleChange("albumId", value)
                          }
                        >
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

                    <div className="grid gap-2">
                      <Label htmlFor="edit-song-lyrics" className="text-white">
                        Lyrics
                      </Label>

                      <Textarea
                        id="edit-song-lyrics"
                        value={songData.lyrics}
                        onChange={(e) => handleChange("lyrics", e.target.value)}
                        rows={5}
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
                    onClick={handleUpdateSong}
                    className="bg-[#1DB954] hover:bg-[#1ed760] text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save
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

export default EditSongDialog;
