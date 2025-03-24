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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MusicUploadPage() {
  const [songTitle, setSongTitle] = useState("");
  const [songThumbnail, setSongThumbnail] = useState<File | null>(null);
  const [songVideo, setSongVideo] = useState<File | null>(null);
  const [songAudio, setSongAudio] = useState<File | null>(null);
  const [songLyrics, setSongLyrics] = useState("");
  const [songGenre, setSongGenre] = useState("");

  const [albumTitle, setAlbumTitle] = useState("");
  const [albumThumbnail, setAlbumThumbnail] = useState<File | null>(null);
  const [albumGenre, setAlbumGenre] = useState("");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
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
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="song-title">Title</Label>
                     
                      <Input
                        id="song-title"
                        placeholder="Enter song title"
                        value={songTitle}
                        onChange={(e) => setSongTitle(e.target.value)}
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
                              alt="Thumbnail preview"
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
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="song-lyrics">Lyrics</Label>
                     
                      <ScrollArea className="h-40 rounded-md border border-[#444444] bg-[#333333] p-4">
                        <Textarea
                          id="song-lyrics"
                          placeholder="Enter song lyrics"
                          value={songLyrics}
                          onChange={(e) => setSongLyrics(e.target.value)}
                          className="bg-transparent border-0 focus-visible:ring-0 resize-none h-48"
                        />
                      </ScrollArea>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="song-genre">Genre</Label>
                    
                      <Select value={songGenre} onValueChange={setSongGenre}>
                        <SelectTrigger className="bg-[#333333] border-[#444444] focus:ring-[#1DB954]">
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                 
                        <SelectContent className="bg-[#333333] border-[#444444]">
                          <SelectItem value="pop">Pop</SelectItem>
                        
                          <SelectItem value="rock">Rock</SelectItem>
                        
                          <SelectItem value="hiphop">Hip Hop</SelectItem>
                        
                          <SelectItem value="rnb">R&B</SelectItem>
                        
                          <SelectItem value="electronic">Electronic</SelectItem>
                        
                          <SelectItem value="jazz">Jazz</SelectItem>
                        
                          <SelectItem value="classical">Classical</SelectItem>
                        
                          <SelectItem value="country">Country</SelectItem>
                        
                          <SelectItem value="folk">Folk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Song
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
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="album-title">Title</Label>
                      
                      <Input
                        id="album-title"
                        placeholder="Enter album title"
                        value={albumTitle}
                        onChange={(e) => setAlbumTitle(e.target.value)}
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
                            onChange={(e) =>
                              handleFileChange(e, setAlbumThumbnail)
                            }
                            className="bg-[#333333] border-[#444444] focus-visible:ring-[#1DB954]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="album-genre">Genre</Label>
                     
                      <Select value={albumGenre} onValueChange={setAlbumGenre}>
                        <SelectTrigger className="bg-[#333333] border-[#444444] focus:ring-[#1DB954]">
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                      
                        <SelectContent className="bg-[#333333] border-[#444444]">
                          <SelectItem value="pop">Pop</SelectItem>
                    
                          <SelectItem value="rock">Rock</SelectItem>
                    
                          <SelectItem value="hiphop">Hip Hop</SelectItem>
                    
                          <SelectItem value="rnb">R&B</SelectItem>
                    
                          <SelectItem value="electronic">Electronic</SelectItem>
                    
                          <SelectItem value="jazz">Jazz</SelectItem>
                    
                          <SelectItem value="classical">Classical</SelectItem>
                    
                          <SelectItem value="country">Country</SelectItem>
                    
                          <SelectItem value="folk">Folk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Create Album
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
