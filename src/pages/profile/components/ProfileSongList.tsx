import { Clock } from "lucide-react";
import formatTime from "@/utils/service/formatTime";
import { SongsEmptyState } from "../../../layout/components/EmptyState";
import { useUserStore } from "@/stores/useUserStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { Song } from "@/utils/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import PlayMusic from "@/layout/components/PlayMusic";

const ProfileSongsList = () => {
  const { user: userAuth } = useAuthStore();
  const { user: currentUser } = useUserStore();

  const songs: Song[] = (currentUser?.songs || []) as Song[];
  const isMyProfile = currentUser?.id === userAuth?.id;

  if (songs.length === 0) {
    return isMyProfile ? (
      <SongsEmptyState message="You haven't created any songs yet. Songs will appear here once you're created." />
    ) : (
      <SongsEmptyState message="This user hasn't created any songs yet. Songs will appear here once they're created." />
    );
  }

  return (
    <div className="overflow-x-auto">
      <ScrollArea className="flex-1 h-full">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-xs">

              <th className="px-4 py-2 text-center">Title</th>

              <th className="px-4 py-2 text-center">Album</th>

              <th className="px-4 py-2 text-center">Views</th>

              <th className="px-4 py-2 text-center">
                <Clock size={16} className="mx-auto" />
              </th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {songs.map((song) => (
              <tr
                key={song.id}
                className="hover:bg-gray-900/50 group transition-colors"
              >
                <td className="px-4 py-3 font-medium text-center hover:underline">
                  <Link to={`/song-details/${song.id}`}>
                    {song.title}
                  </Link>
                </td>

                <td className="px-4 py-3 text-gray-400 text-center hover:underline">
                  <Link to={`/album-details/${song?.album?.id}`}>
                    {song?.album?.title}
                  </Link>
                </td>

                <td className="px-4 py-3 text-gray-400 text-center">
                  {song?.views}
                </td>

                <td className="px-4 py-3 text-gray-400 text-center">
                  {formatTime(song.duration)}
                </td>

                <td className="px-4 py-3 text-gray-400 text-center">
                  <PlayMusic song={song} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
};

export default ProfileSongsList;
