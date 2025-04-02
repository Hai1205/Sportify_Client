import React from "react";
import { AlbumIcon, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";

interface UploadAlbumProps {
  albumData: { title: string };
  setAlbumData: React.Dispatch<React.SetStateAction<{ title: string }>>;
  albumThumbnail: File | null;
  setAlbumThumbnail: React.Dispatch<React.SetStateAction<File | null>>;
  handleUploadAlbum: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

const UploadAlbum: React.FC<UploadAlbumProps> = ({
  albumData,
  setAlbumData,
  albumThumbnail,
  setAlbumThumbnail,
  handleUploadAlbum,
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
    <TabsContent value="album">
      <ScrollArea className="h-[400px] w-full border border-[#444444] rounded-md">
        <Card className="bg-[#252525] border-[#333333] shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-[#1DB954]">Upload a New Album</CardTitle>
            <CardDescription className="text-gray-400">Fill in the details to create your album</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleUploadAlbum} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="album-title">Title</Label>
                <Input
                  id="album-title"
                  placeholder="Enter album title"
                  value={albumData.title}
                  onChange={(e) => setAlbumData({ title: e.target.value })}
                  className="bg-[#333333] border-[#444444] focus-visible:ring-[#1DB954] transition-colors duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="album-thumbnail">Thumbnail</Label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-32 bg-[#333333] rounded-md flex items-center justify-center border border-[#444444]">
                    {albumThumbnail ? (
                      <img
                        src={URL.createObjectURL(albumThumbnail) || "/placeholder.svg"}
                        alt="Album cover preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <AlbumIcon className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <Input
                    id="album-thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setAlbumThumbnail)}
                    className="bg-[#333333] border-[#444444] focus-visible:ring-[#1DB954] transition-colors duration-200"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white transition-colors duration-200"
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
  );
};

export default UploadAlbum;