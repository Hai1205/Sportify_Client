import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Pencil, Clock, Calendar, BarChart2, Music } from "lucide-react";
import { Song } from "@/utils/types";
import formatTime from "@/utils/service/formatTime";
import { useMusicStore } from "@/stores/useMusicStore";
import EditSongDialog from "@/pages/admin/songManagement/components/EditSongDialog";
import { useUserStore } from "@/stores/useUserStore";

export default function SongDetailsPage() {
  const { songId } = useParams<{ songId: string }>();
  const [song, setSong] = useState<Song | null>(null);
  const { getSong } = useMusicStore();
  const { user: userAuth } = useUserStore();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const isMySong = song?.user?.id === userAuth?.id;
  console.log(">>> song?.user?.id ", song?.user?.id);
  console.log(">>> userAuth?.id ", userAuth?.id);
  console.log(">>> isMySong ", isMySong);

  useEffect(() => {
    const fetchSong = async () => {
      if (!songId) {
        return;
      }

      const fetchedSong = await getSong(songId);
      setSong(fetchedSong);
    };

    fetchSong();
  }, [songId, getSong]);

  return (
    <div className="h-full flex items-stretch justify-center">
      <div className="w-full max-w-full transform overflow-hidden rounded-2xl bg-[#121212] p-6 text-left align-middle shadow-xl transition-all">
        <h3 className="text-lg font-medium leading-6 text-white">
          Song Details
        </h3>

        <div className="mt-2">
          <p className="text-sm text-gray-400">
            {song ? `Detailed information for "${song.title}"` : "Song details"}
          </p>
        </div>

        {song && (
          <div className="grid gap-6 py-4">
            <div className="flex gap-6">
              <Avatar className="h-32 w-32 rounded-md bg-[#282828]">
                <AvatarImage src={song.thumbnailUrl} alt={song.title} />

                <AvatarFallback className="bg-[#282828]">
                  <Music className="h-10 w-10 text-gray-400" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-between">
                <h2 className="text-2xl font-bold text-white">{song.title}</h2>

                <p className="text-gray-400">
                  Artist: {song.user.fullName}
                </p>

                <p className="text-sm text-gray-400">
                  Album: {song.album?.title}
                </p>

                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    className="gap-1 bg-[#1DB954] text-white hover:bg-[#1ed760]"
                  >
                    <Play className="h-4 w-4" /> Play
                  </Button>

                  {isMySong && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditDialogOpen(true)}
                      className="gap-1 border-gray-700 text-white hover:bg-[#282828]"
                    >
                      <Pencil className="h-4 w-4" /> Edit
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  Song Information
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />

                    <span className="text-sm font-medium text-white">
                      Duration:
                    </span>

                    <span className="text-sm text-gray-400">
                      {formatTime(song.duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />

                    <span className="text-sm font-medium text-white">
                      Release Date:
                    </span>

                    <span className="text-sm text-gray-400">
                      {song.releaseDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-gray-400" />

                    <span className="text-sm font-medium text-white">
                      Views:
                    </span>

                    <span className="text-sm text-gray-400">{song.views}</span>
                  </div>
                </div>
              </div>

              {song.lyrics && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    Lyrics
                  </h3>

                  <ScrollArea className="h-[200px] rounded-md border border-gray-700 bg-[#282828] p-4">
                    <div className="text-sm whitespace-pre-line text-gray-400">
                      {song.lyrics}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <EditSongDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        song={song}
      />
    </div>
  );
}
