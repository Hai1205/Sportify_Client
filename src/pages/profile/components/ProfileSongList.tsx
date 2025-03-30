import { Clock, Play } from "lucide-react";
import formatTime from "@/utils/service/formatTime";
import { SongsEmptyState } from "../../../layout/components/EmptyState";
import { useUserStore } from "@/stores/useUserStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { Song } from "@/utils/types";
import { ScrollArea } from "@/components/ui/scroll-area";

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
              <th className="px-4 py-2 w-12 text-center">#</th>

              <th className="px-4 py-2 text-center">Title</th>

              <th className="px-4 py-2 text-center">Album</th>

              <th className="px-4 py-2 text-center">Views</th>

              <th className="px-4 py-2 text-center">
                <Clock size={16} className="mx-auto" />
              </th>
            </tr>
          </thead>

          <tbody>
            {songs.map((song, index) => (
              <tr
                key={song.id}
                className="hover:bg-gray-900/50 group transition-colors"
              >
                <td className="px-4 py-3 text-gray-400 group-hover:text-white text-center">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <Play
                    size={16}
                    className="hidden group-hover:block mx-auto"
                  />
                </td>

                <td className="px-4 py-3 font-medium text-center">
                  {song.title}
                </td>

                <td className="px-4 py-3 text-gray-400 text-center">
                  {song?.album?.title}
                </td>

                <td className="px-4 py-3 text-gray-400 text-center">
                  {song?.views}
                </td>

                <td className="px-4 py-3 text-gray-400 text-center">
                  {formatTime(song.duration)}
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
