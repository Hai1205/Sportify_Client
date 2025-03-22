import type React from "react";
import { Clock, Play } from "lucide-react";
import formatTime from "@/utils/service/formatTime";
import { SongsEmptyState } from "./EmptyState";

interface Song {
  id: string;
  title: string;
  album: string;
  duration: number;
}

interface SongsListProps {
  songs: Song[];
}

const ProfileSongsList: React.FC<SongsListProps> = ({ songs }) => {
  if(songs.length === 0) return <SongsEmptyState />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800 text-left text-gray-400 text-xs">
            <th className="px-4 py-2 w-12">#</th>

            <th className="px-4 py-2">Title</th>

            <th className="px-4 py-2">Album</th>

            <th className="px-4 py-2 text-right">
              <Clock size={16} />
            </th>
          </tr>
        </thead>

        <tbody>
          {songs.map((song, index) => (
            <tr
              key={song.id}
              className="hover:bg-gray-900/50 group transition-colors"
            >
              <td className="px-4 py-3 text-gray-400 group-hover:text-white">
                <span className="group-hover:hidden">{index + 1}</span>
                <Play size={16} className="hidden group-hover:block" />
              </td>

              <td className="px-4 py-3 font-medium">{song.title}</td>

              <td className="px-4 py-3 text-gray-400">{song.album}</td>
              
              <td className="px-4 py-3 text-gray-400 text-right">
                {formatTime(song.duration)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileSongsList;
