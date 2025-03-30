import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Upload, Save, Clock, Calendar, Eye } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as Scroll from "@radix-ui/react-scroll-area";

interface Song {
  id: number;
  title: string;
  album: string;
  albumId: number;
  duration: string;
  releaseDate: string;
  views: number;
  lyrics: string;
  thumbnail: string;
}

interface Album {
  id: number;
  title: string;
}

const SongDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [song, setSong] = useState<Song | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  useEffect(() => {
    // Fetch song data

    // Fetch albums data
    const mockAlbums = [
      { id: 1, title: "Midnight Memories" },
      { id: 2, title: "Summer Vibes" },
      { id: 3, title: "Acoustic Sessions" },
      { id: 4, title: "First Light" },
    ];

    const song = {
      id: 1,
      title: "Dancing in the Rain",
      album: "Midnight Memories",
      albumId: 1,
      duration: "3:45",
      releaseDate: "2023-05-15",
      views: 1245678,
      lyrics:
        "Dancing in the rain\nFeeling no pain\nWashing away yesterday's sorrows\nDancing in the rain\nStarting again\nLooking forward to all our tomorrows",
      thumbnail: "/placeholder.svg?height=200&width=200",
    };

    if (song) {
      setSong(song);
      setThumbnailPreview(song.thumbnail);
    }
    setAlbums(mockAlbums);
  }, [id]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL for preview
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);

      // Update the song object with the new thumbnail
      if (song) {
        setSong({
          ...song,
          thumbnail: previewUrl,
        });
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!song) return;

    const { name, value } = e.target;
    setSong({
      ...song,
      [name]: value,
    });
  };

  const handleSave = () => {
    // In a real app, you would save the changes to a server
    setIsEditing(false);
    alert("Changes saved successfully!");
  };

  if (!song) {
    return (
      <div className="min-h-screen bg-spotify-black flex items-center justify-center">
        <div className="text-white">Loading song details...</div>
      </div>
    );
  }

  return (
    <ScrollArea
      className={
        isEditing
          ? "h-[calc(100vh-150px)] w-full"
          : "h-[calc(100vh-50px)] w-full"
      }
    >
      <div className="min-h-screen bg-spotify-black text-white p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              {isEditing ? "Edit Song" : "Song Details"}
            </h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-spotify-green hover:bg-spotify-green-dark rounded-full transition-colors"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="grid md:grid-cols-[300px_1fr] gap-8">
            {/* Thumbnail section */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-900 rounded-md overflow-hidden">
                <img
                  src={thumbnailPreview || song.thumbnail}
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-spotify-green hover:bg-spotify-green-dark text-white p-3 rounded-full transition-colors"
                    >
                      <Upload size={24} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleThumbnailChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              {/* Non-editable info */}
              <div className="space-y-3 bg-gray-900/50 p-4 rounded-md">
                <div className="flex items-center text-gray-400">
                  <Clock size={16} className="mr-2" />
                  <span>Duration: {song.duration}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Calendar size={16} className="mr-2" />
                  <span>
                    Released: {new Date(song.releaseDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Eye size={16} className="mr-2" />
                  <span>Views: {song.views.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Song details form */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-gray-400">
                  Title
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={song.title}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                  />
                ) : (
                  <div className="text-xl font-semibold">{song.title}</div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="albumId" className="block text-gray-400">
                  Album
                </label>
                {isEditing ? (
                  <select
                    id="albumId"
                    name="albumId"
                    value={song.albumId}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                  >
                    {albums.map((album) => (
                      <option key={album.id} value={album.id}>
                        {album.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div>{song.album}</div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="lyrics" className="block text-gray-400">
                  Lyrics
                </label>
                {/* <ScrollArea className="w-full"> */}
                {/* </ScrollArea> */}
                {isEditing ? (
                  <Scroll.Root className="w-full h-60 bg-gray-800 border border-gray-700 rounded-md">
                    <Scroll.Viewport className="h-full w-full">
                      <textarea
                        id="lyrics"
                        name="lyrics"
                        value={song.lyrics}
                        onChange={handleInputChange}
                        className="w-full h-full bg-gray-800 p-2 text-white resize-none outline-none scrollbar-hide"
                      />
                    </Scroll.Viewport>
                    <Scroll.Scrollbar
                      orientation="vertical"
                      className="bg-gray-700 w-2"
                    >
                      <Scroll.Thumb className="bg-gray-500 rounded" />
                    </Scroll.Scrollbar>
                  </Scroll.Root>
                ) : (
                  <div className="whitespace-pre-line bg-gray-900/50 p-4 rounded-md">
                    {song.lyrics}
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-spotify-green hover:bg-spotify-green-dark rounded-full flex items-center transition-colors"
                  >
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default SongDetail;
