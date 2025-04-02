import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Clock, Heart, Music, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useMusicStore } from "@/stores/useMusicStore";
import { useAuthStore } from "@/stores/useAuthStore";
import formatTime from "@/utils/service/formatTime";
import { SongsEmptyState } from "@/layout/components/EmptyState";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TableSkeleton } from "@/layout/components/TableSkeleton";
import { Song } from "@/utils/types";

export default function FavoriteSongsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const queryString = location.search;

  const [songs, setSongs] = useState<Song[] | []>([]);

  const { isLoading, likeSong, searchSongs } = useMusicStore();

  const { user: userAuth } = useAuthStore();

  useEffect(() => {
    const fetchSongs = async () => {
      if (queryString) {
        await searchSongs(queryString).then(setSongs);
      } else {
        const likedSongs = (userAuth?.likedSongs || []) as Song[];
        setSongs(likedSongs);
      }
    };

    fetchSongs();
  }, [likeSong, query, queryString, searchSongs, userAuth]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (searchQuery.trim()) {
        setSearchParams({ query: searchQuery.trim() });
      } else {
        setSearchParams();
      }
    },
    [searchQuery, setSearchParams]
  );

  const toggleLike = async (song: Song) => {
    if(!userAuth){
        return;
    }
    
    await likeSong(userAuth?.id, song.id);
    setSongs(songs.filter((s) => s.id !== song.id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Favorite Songs</h2>
      </div>

      <Tabs defaultValue="all-songs" className="space-y-4">
        <TabsContent value="all-songs" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Song List</CardTitle>

                <div className="flex items-center gap-2">
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-2"
                  >
                    <div className="relative w-60">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

                      <Input
                        type="search"
                        placeholder="Search songs..."
                        className="w-full pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </CardHeader>

            <ScrollArea className="h-[calc(100vh-305px)] w-full rounded-xl">
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px] text-center">
                        Thumbnail
                      </TableHead>

                      <TableHead className="text-center">Title</TableHead>

                      <TableHead className="text-center">Artist</TableHead>

                      <TableHead className="text-center">Album</TableHead>

                      <TableHead className="text-center">Duration</TableHead>

                      <TableHead className="text-center">Views</TableHead>

                      <TableHead className="text-center">
                        Release Date
                      </TableHead>

                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={9}>
                          <TableSkeleton />
                        </TableCell>
                      </TableRow>
                    ) : songs.length > 0 ? (
                      songs.map((song) => (
                        <TableRow key={song.id}>
                          <TableCell className="text-center">
                            <div className="flex justify-center">
                              <Avatar className="h-9 w-9 rounded-md">
                                <AvatarImage
                                  src={song.thumbnailUrl}
                                  alt={song.title}
                                />
                                <AvatarFallback>
                                  <Music className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            </div>
                          </TableCell>

                          <TableCell className="text-center">
                            {song.title}
                          </TableCell>

                          <TableCell className="text-center">
                            {song.user.fullName}
                          </TableCell>

                          <TableCell className="text-center">
                            {song.album?.title}
                          </TableCell>

                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span>{formatTime(song.duration)}</span>
                            </div>
                          </TableCell>

                          <TableCell className="text-center">
                            {song.views}
                          </TableCell>

                          <TableCell className="text-center">
                            {song.releaseDate}
                          </TableCell>

                          <TableCell className="text-center">
                            <button
                              onClick={() => toggleLike(song)}
                              className="rounded-full p-1 hover:text-white"
                            >
                              <Heart className="h-4 w-4" fill={"#1DB954"} />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9}>
                          <SongsEmptyState message="No songs have been added yet. Upload a song to get started." />
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
