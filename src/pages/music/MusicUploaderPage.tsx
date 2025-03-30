"use client";

import type React from "react";
import { useState } from "react";
import {
  Music,
  Upload,
  Image,
  Video,
  FileAudio,
  AlbumIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { useAuthStore } from "@/stores/useAuthStore";

export default function MusicUploaderPage() {
  const [songData, setSongData] = useState({
    title: "",
    lyrics: "",
  });
  const [songThumbnail, setSongThumbnail] = useState<File | null>(null);
  const [songVideo, setSongVideo] = useState<File | null>(null);
  const [songAudio, setSongAudio] = useState<File | null>(null);

  const [albumData, setAlbumData] = useState({
    title: "",
  });
  const [albumThumbnail, setAlbumThumbnail] = useState<File | null>(null);

  const updateAlbumData = (field: keyof typeof albumData, value: any) => {
    setAlbumData((prev) => ({ ...prev, [field]: value }));
  };

  const updateSongData = (field: keyof typeof songData, value: any) => {
    setSongData((prev) => ({ ...prev, [field]: value }));
  };

  const { isLoading, error, uploadSong, uploadAlbum } = useMusicStore();

  const { user: userAuth } = useAuthStore();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const files = e.target.files;

    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleUploadAlbum = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userAuth) {
      return;
    }

    const formData = new FormData();
    formData.append("title", albumData.title);
    if (albumThumbnail) {
      formData.append("thumbnail", albumThumbnail);
    }

    await uploadAlbum(userAuth?.id, formData);

    if (!error) {
      setAlbumData({
        title: "",  
      });
      setAlbumThumbnail(null);
    }
  };

  const handleUploadSong = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userAuth) {
      return;
    }

    const formData = new FormData();
    formData.append("title", songData.title);
    if (songThumbnail) {
      formData.append("thumbnail", songThumbnail);
    }
    if (songVideo) {
      formData.append("video", songVideo);
    }
    if (songAudio) {
      formData.append("audio", songAudio);
    }
    formData.append("lyrics", songData.lyrics);

    await uploadSong(userAuth?.id, formData);

    if (!error) {
      setSongData({
        title: "",
        lyrics: "",
      });
      setSongThumbnail(null);
      setSongVideo(null);
      setSongAudio(null);
    }
  };

  return (
    <div className="h-[560px] bg-[#191414] text-white p-4 md:p-8 rounded-2xl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#1DB954]">Music Upload</h1>

        <Tabs defaultValue="song" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#333333]">
            <TabsTrigger
              value="song"
              className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-white"
            >
              <Music className="mr-2 h-4 w-4" />
              Upload Song
            </TabsTrigger>
            <TabsTrigger
              value="album"
              className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-white"
            >
              <AlbumIcon className="mr-2 h-4 w-4" />
              Upload Album
            </TabsTrigger>
          </TabsList>

          <TabsContent value="song">
            <ScrollArea className="h-[400px] w-full border border-[#444444] rounded-md">
              <Card className="bg-[#252525] border-[#333333]">
                <CardHeader>
                  <CardTitle className="text-[#1DB954]">
                    Upload a New Song
                  </CardTitle>

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
                          updateSongData("title", e.target.value)
                        }
                        className="bg-[#333333] border-[#444444] focus-visible:ring-[#1DB954]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="song-thumbnail">Thumbnail</Label>

                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 bg-[#333333] rounded-md flex items-center justify-center">
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
                            <Image className="w-8 h-8 text-gray-400" />
                          )}
                        </div>

                        <div className="flex-1">
                          <Input
                            id="song-thumbnail"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(e, setSongThumbnail)
                            }
                            className="bg-[#333333] border-[#444444] focus-visible:ring-[#1DB954]"
                          />
                        </div>
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
                          className="bg-[#333333] border-[#444444] hover:bg-[#444444] text-white"
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
                          className="bg-[#333333] border-[#444444] hover:bg-[#444444] text-white"
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
                            updateSongData("lyrics", e.target.value)
                          }
                          className="bg-transparent border-0 focus-visible:ring-0 resize-none h-48"
                        />
                      </ScrollArea>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white"
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

          <TabsContent value="album">
            <ScrollArea className="h-[400px] w-full border border-[#444444] rounded-md">
              <Card className="bg-[#252525] border-[#333333]">
                <CardHeader>
                  <CardTitle className="text-[#1DB954]">
                    Upload a New Album
                  </CardTitle>

                  <CardDescription className="text-gray-400">
                    Fill in the details to create your album
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleUploadAlbum} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="album-title">Title</Label>

                      <Input
                        id="album-title"
                        placeholder="Enter album title"
                        value={albumData.title}
                        onChange={(e) =>
                          updateAlbumData("title", e.target.value)
                        }
                        className="bg-[#333333] border-[#444444] focus-visible:ring-[#1DB954]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="album-thumbnail">Thumbnail</Label>

                      <div className="flex items-center gap-4">
                        <div className="w-32 h-32 bg-[#333333] rounded-md flex items-center justify-center">
                          {albumThumbnail ? (
                            <img
                              src={
                                URL.createObjectURL(albumThumbnail) ||
                                "/placeholder.svg"
                              }
                              alt="Album cover preview"
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <AlbumIcon className="w-12 h-12 text-gray-400" />
                          )}
                        </div>

                        <div className="flex-1">
                          <Input
                            id="album-thumbnail"
                            type="file"
                            accept="image/*"
                            // onChange={(e) =>
                            //   handleFileChange(e, "albumThumbnail")
                            // }
                            onChange={(e) =>
                              handleFileChange(e, setAlbumThumbnail)
                            }
                            className="bg-[#333333] border-[#444444] focus-visible:ring-[#1DB954]"
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                          Creating...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Create Album
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
