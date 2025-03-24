import { Play, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Song } from "@/utils/types";

interface SongResultsProps {
  songs: Song[];
  query: string;
}

export function SongResults({ songs, query }: SongResultsProps) {
  if (songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Music className="h-12 w-12 text-muted-foreground mb-4" />

        <h3 className="text-lg font-medium">No song found</h3>

        <p className="text-muted-foreground mt-1">
          We couldn't find any song matching "{query}"
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {songs.map((song) => (
        <div
          key={song.id}
          className="flex flex-col overflow-hidden rounded-lg border transition-all hover:shadow-md"
        >
          <div className="relative aspect-square overflow-hidden">
            <img
              src={song.thumbnailUrl || "/placeholder.svg"}
              alt={song.title}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-2 right-2 h-10 w-10 rounded-full shadow-md"
            >
              {/* <Link to={`/songs/${song.id}`}>
              </Link> */}
              <Play className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col p-4">
            <h3 className="font-semibold line-clamp-1">{song.title}</h3>

            <p className="text-sm text-muted-foreground">
              {song.user.fullName}
            </p>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {song.releaseDate}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
