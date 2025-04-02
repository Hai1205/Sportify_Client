import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileAudio, Upload, Video } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

interface UploadSongProps {
  songData: { title: string; lyrics: string };
  setSongData: React.Dispatch<
    React.SetStateAction<{ title: string; lyrics: string }>
  >;
  songThumbnail: File | null;
  setSongThumbnail: React.Dispatch<React.SetStateAction<File | null>>;
  songVideo: File | null;
  setSongVideo: React.Dispatch<React.SetStateAction<File | null>>;
  songAudio: File | null;
  setSongAudio: React.Dispatch<React.SetStateAction<File | null>>;
  handleUploadSong: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

const UploadSong: React.FC<UploadSongProps> = ({
  songData,
  setSongData,
  songThumbnail,
  setSongThumbnail,
  songVideo,
  setSongVideo,
  songAudio,
  setSongAudio,
  handleUploadSong,
  isLoading,
}) => {
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  return (
    <TabsContent value="song">
      <ScrollArea className="h-[400px] w-full border border-[#444444] rounded-md">
        <Card className="bg-[#252525] border-[#333333] shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-[#1DB954]">Upload a New Song</CardTitle>
            <CardDescription className="text-gray-400">
              Fill in the details to upload your song
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleUploadSong} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="song-title">Title</Label>
                <Input
                  id="song-title"
                  placeholder="Enter song title"
                  value={songData.title}
                  onChange={(e) =>
                    setSongData({ ...songData, title: e.target.value })
                  }
                  className="bg-[#333333] border-[#444444] focus-visible:ring-[#1DB954] transition-colors duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="song-thumbnail">Thumbnail</Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-[#333333] rounded-md flex items-center justify-center border border-[#444444]">
                    {songThumbnail ? (
                      <img
                        src={
                          URL.createObjectURL(songThumbnail) ||
                          "/placeholder.svg"
                        }
                        alt="Album cover preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <FileAudio className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <Input
                    id="song-thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setSongThumbnail)}
                    className="bg-[#333333] border-[#444444] focus-visible:ring-[#1DB954] transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="song-video">Video (Optional)</Label>
                <div className="flex items-center gap-2">
                  {songVideo && (
                    <span className="text-sm text-gray-400 truncate max-w-[200px]">
                      {songVideo.name}
                    </span>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-[#333333] border-[#444444] hover:bg-[#444444] text-white transition-colors duration-200"
                    onClick={() =>
                      document.getElementById("song-video")?.click()
                    }
                  >
                    <Video className="mr-2 h-4 w-4" />
                    {songVideo ? "Change Video" : "Upload Video"}
                  </Button>
                  <Input
                    id="song-video"
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, setSongVideo)}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="song-audio">Audio File</Label>
                <div className="flex items-center gap-2">
                  {songAudio && (
                    <span className="text-sm text-gray-400 truncate max-w-[200px]">
                      {songAudio.name}
                    </span>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-[#333333] border-[#444444] hover:bg-[#444444] text-white transition-colors duration-200"
                    onClick={() =>
                      document.getElementById("song-audio")?.click()
                    }
                  >
                    <FileAudio className="mr-2 h-4 w-4" />
                    {songAudio ? "Change Audio" : "Upload Audio"}
                  </Button>
                  <Input
                    id="song-audio"
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleFileChange(e, setSongAudio)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="song-lyrics">Lyrics</Label>
                <ScrollArea className="h-40 rounded-md border border-[#444444] bg-[#333333] p-4">
                  <Textarea
                    id="song-lyrics"
                    placeholder="Enter song lyrics"
                    value={songData.lyrics}
                    onChange={(e) =>
                      setSongData({ ...songData, lyrics: e.target.value })
                    }
                    className="bg-transparent border-0 focus-visible:ring-0 resize-none h-48"
                  />
                </ScrollArea>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Song
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </ScrollArea>
    </TabsContent>
  );
};

export default UploadSong;
