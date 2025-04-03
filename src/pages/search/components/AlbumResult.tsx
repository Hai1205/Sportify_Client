import { Play, Disc3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Album } from "@/utils/types";
import { Link } from "react-router-dom";

interface AlbumResultsProps {
	albums: Album[];
	query: string;
}

export function AlbumResults({ albums, query }: AlbumResultsProps) {
  if (albums.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Disc3 className="h-12 w-12 text-muted-foreground mb-4" />

        <h3 className="text-lg font-medium">No albums found</h3>

        <p className="text-muted-foreground mt-1">
          We couldn't find any albums matching "{query}"
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {albums.map((album) => (
        <div
          key={album.id}
          className="flex flex-col overflow-hidden rounded-lg border transition-all hover:shadow-md"
        >
          <div className="relative aspect-square overflow-hidden">
            <img
              src={album.thumbnailUrl || "/placeholder.svg"}
              alt={album.title}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-2 right-2 h-10 w-10 rounded-full shadow-md"
            >
              <Link to={`/albums/${album.id}`}>
                <Play className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-col p-4">
            <h3 className="font-semibold line-clamp-1">{album.title}</h3>

            <p className="text-sm text-muted-foreground">
              {album.user.fullName}
            </p>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {album.releaseDate}
              </span>

              <span className="text-xs text-muted-foreground">
                {album.songs.length} tracks
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
