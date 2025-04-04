import type React from "react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMusicStore } from "@/stores/useMusicStore";
import { useAuthStore } from "@/stores/useAuthStore";
import UploadSongTab from "./components/UploadSongTab";
import UploadAlbumTab from "./components/UploadAlbumTab";

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

  const { isLoading, error, uploadSong, uploadAlbum } = useMusicStore();
  const { user: userAuth } = useAuthStore();

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
      setAlbumData({ title: "" });
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
      setSongData({ title: "", lyrics: "" });
      setSongThumbnail(null);
      setSongVideo(null);
      setSongAudio(null);
    }
  };

  return (
    <div className="h-[560px] bg-zinc-900 text-white p-4 md:p-8 rounded-2xl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Music Upload</h1>
        <Tabs defaultValue="song" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#333333]">
            <TabsTrigger
              value="song"
              className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-white"
            >
              Upload Song
            </TabsTrigger>
            <TabsTrigger
              value="album"
              className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-white"
            >
              Upload Album
            </TabsTrigger>
          </TabsList>

          <UploadSongTab
            songData={songData}
            setSongData={setSongData}
            songThumbnail={songThumbnail}
            setSongThumbnail={setSongThumbnail}
            songVideo={songVideo}
            setSongVideo={setSongVideo}
            songAudio={songAudio}
            setSongAudio={setSongAudio}
            handleUploadSong={handleUploadSong}
            isLoading={isLoading}
          />

          <UploadAlbumTab
            albumData={albumData}
            setAlbumData={setAlbumData}
            albumThumbnail={albumThumbnail}
            setAlbumThumbnail={setAlbumThumbnail}
            handleUploadAlbum={handleUploadAlbum}
            isLoading={isLoading}
          />
        </Tabs>
      </div>
    </div>
  );
}