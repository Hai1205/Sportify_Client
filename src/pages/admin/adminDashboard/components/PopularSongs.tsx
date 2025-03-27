import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStatStore } from "@/stores/useStatStore";
import PlayButton from "@/pages/home/components/PlayButton";

export function PopularSongs() {
  const { songs, getPopularSongsStat } = useStatStore();

  useEffect(() => {
    getPopularSongsStat();
  }, [getPopularSongsStat]);
  return (
    <ScrollArea className="h-[290px] pr-4">
      <div className="space-y-4">
        {songs.map((song) => (
          <div
          key={song.id}
          className="relative flex items-center justify-between gap-4 rounded-lg border p-3 pr-12 hover:bg-muted/50 group"
        >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 rounded-md">
                <AvatarImage src={song.thumbnailUrl} alt={song.title} />

                <AvatarFallback>{song.title.substring(0, 2)}</AvatarFallback>
              </Avatar>

              <div>
                <div className="font-medium">{song.title}</div>

                <div className="text-sm text-muted-foreground">
                  {song.user.fullName}
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-end gap-1">
              <div className="text-sm">{song.views} plays</div>

              <div className="text-xs text-muted-foreground">
                {song.duration}
              </div>
            </div>
            <PlayButton song={song} />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
