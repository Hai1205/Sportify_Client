import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Album, Song } from "@/utils/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/stores/useUserStore";
import { Music, Save } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading";
import { useMusicStore } from "@/stores/useMusicStore";

interface UploadSongDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSongUploaded: (song: Song) => void;
}

const UploadSongDialog = ({
  isOpen,
  onOpenChange,
  onSongUploaded,
}: UploadSongDialogProps) => {
  const { user: userAuth } = useUserStore();
  const {uploadSong} = useMusicStore()
  const albums: Album[] = (userAuth?.albums || []) as Album[];
  const [previewAvatar, setPreviewAvatar] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [songData, setSongData] = useState({
    title: "",
    lyrics: "",
    albumId: "",
  });
  const [file, setFile] = useState<{
    thumbnail: File | null;
    audio: File | null;
    video: File | null;
  }>({
    thumbnail: null,
    audio: null,
    video: null,
  });

  const handleChange = (field: keyof typeof songData, value: string) => {
    setSongData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (type: "thumbnail" | "audio", file: File | null) => {
    setFile((prev) => ({ ...prev, [type]: file }));
  };

  const handleUpload = async() => {
    const formData = new FormData();
    formData.append("title", songData.title);
    formData.append("lyrics", songData.lyrics);
    if (file.thumbnail) {
      formData.append("thumbnail", file.thumbnail);
    }
    if (file.audio) {
      formData.append("audio", file.audio);
    }
    if (songData.albumId) {
      formData.append("albumId", songData.albumId);
    }

    if(!userAuth){
      return;
    }

    setIsLoading(true);
    const song = await uploadSong(userAuth.id, formData);

    if(song){
      onSongUploaded(song);
    }

    setIsLoading(false);

    handleClose();
  };

  const handleClose = () => {
    setSongData({ title: "", lyrics: "", albumId: "" });
    setPreviewAvatar("");
    setFile({ thumbnail: null, audio: null, video: null });
    onOpenChange(false);
  };

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile((prev) => ({ ...prev, thumbnail: file }));
      setPreviewAvatar(URL.createObjectURL(file));
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#121212] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium leading-6 text-white">
                  Upload New Song
                </Dialog.Title>

                <ScrollArea className="h-[60vh] pr-4 mt-4">
                  <div className="relative w-full h-40 border border-gray-700 rounded-lg overflow-hidden flex items-center justify-center bg-[#282828]">
                    <Avatar className="rounded-md object-cover w-full h-full">
                      <AvatarImage
                        src={previewAvatar || "/placeholder.svg"}
                        alt={songData.title}
                        className="rounded-none"
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
                          document.getElementById("thumbnail-input")?.click()
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

                  <div className="grid gap-4 mt-4">
                    <div className="grid gap-2">
                      <Label htmlFor="song-title">Song Title</Label>
                      <Input
                        id="song-title"
                        value={songData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="Enter song title"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="audio-file">Audio File</Label>
                      <Input
                        id="audio-file"
                        type="file"
                        accept=".mp3"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleFileChange("audio", file);
                        }}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="song-lyrics">Lyrics</Label>
                      <Textarea
                        id="song-lyrics"
                        value={songData.lyrics}
                        onChange={(e) => handleChange("lyrics", e.target.value)}
                        placeholder="Enter song lyrics"
                        rows={3}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="album-select">
                        Select Album (Optional)
                      </Label>
                      <Select
                        value={songData.albumId}
                        onValueChange={(value) =>
                          handleChange("albumId", value)
                        }
                      >
                        <SelectTrigger id="album-select">
                          <SelectValue placeholder="Select album" />
                        </SelectTrigger>
                        <SelectContent>
                          {albums.map((album) => (
                            <SelectItem key={album.id} value={album.id}>
                              {album.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end gap-2 pt-4 border-t border-gray-800">
                    <Button
                      variant="outline"
                      onClick={handleClose}
                      className="border-gray-700 text-white hover:bg-red-500 hover:text-white"
                    >
                      Cancel
                    </Button>

                    {/* <Button
                      onClick={handleUpload}
                      className="bg-[#22c55ee8] hover:bg-[#1ed760] text-white"
                    >
                      Upload Song
                    </Button> */}
                    <Button
                    onClick={handleUpload}
                    className="bg-[#1DB954] hover:bg-[#1ed760] text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Upload
                      </>
                    )}
                  </Button>
                  </div>
                </ScrollArea>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UploadSongDialog;
