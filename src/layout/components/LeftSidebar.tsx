import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, Library, MessageCircle, Music, Search, Album as AlbumIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { Album } from "@/utils/types";

const LeftSidebar = () => {
  const { isAuth, isArtist, isAdmin, user: userAuth } = useAuthStore();

  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userAlbums = (userAuth?.albums || []) as Album[];
      setAlbums(userAlbums);
    };

    fetchData();
  }, [userAuth]);

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Navigation menu */}
      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <HomeIcon className="mr-2 size-5" />

            <span className="hidden md:inline">Home</span>
          </Link>

          <Link
            to={"/search"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <Search className="mr-2 size-5" />

            <span className="hidden md:inline">Search</span>
          </Link>

          {isAuth && (
            <Link
              to={"/chat"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800",
                })
              )}
            >
              <MessageCircle className="mr-2 size-5" />

              <span className="hidden md:inline">Messages</span>
            </Link>
          )}

          {(isArtist || isAdmin) && (
            <>
              <Link
                to={"/music-uploader"}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    className:
                      "w-full justify-start text-white hover:bg-zinc-800",
                  })
                )}
              >
                <Music className="mr-2 size-5" />

                <span className="hidden md:inline">Upload music</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Library section */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />

            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          {isAuth && (
            <div className="space-y-2">
              <Link
                to={`/favorite-songs`}
                className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
              >
                <AlbumIcon className="size-5" />
                <div className="flex-1 min-w-0 hidden md:block">
                  <p className="font-low truncate">Favorite songs</p>
                </div>
              </Link>
            </div>
          )}

          <div className="space-y-2">
            {albums.map((album) => (
              <Link
                to={`/album/${album.id}`}
                key={album.id}
                className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
              >
                <img
                  src={album.thumbnailUrl}
                  alt={album.title}
                  className="size-12 rounded-md flex-shrink-0 object-cover"
                />

                <div className="flex-1 min-w-0 hidden md:block">
                  <p className="font-low truncate">{album.title}</p>

                  <p className="text-sm text-zinc-400 truncate">
                    Disc3 • {album.user.fullName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;