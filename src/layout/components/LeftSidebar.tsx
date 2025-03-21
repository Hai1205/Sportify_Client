import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, Library, MessageCircle, Search } from "lucide-react";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMusicStore } from "@/stores/useMusicStore";

const LeftSidebar = () => {
  const { albums, getAllAlbum, isLoading } = useMusicStore();
  const { user: userAuth } = useAuthStore();

  useEffect(() => {
    getAllAlbum();
  }, [getAllAlbum]);

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

          {userAuth && (
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
        </div>
      </div>

      {/* Library section */}
      {/* <div className="flex-1 rounded-lg bg-zinc-900 p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />

            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <Link
                  to={`/albums/${album.id}`}
                  key={album.id}
                  className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
                >
                  <img
                    src={album.thumbnailUrl}
                    alt="Playlist img"
                    className="size-12 rounded-md flex-shrink-0 object-cover"
                  />

                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="font-medium truncate">{album.title}</p>

                    <p className="text-sm text-zinc-400 truncate">
                      Album • {album.user.fullName}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div> */}
    </div>
  );
};

export default LeftSidebar;
