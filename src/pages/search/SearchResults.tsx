import type React from "react";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMusicStore } from "@/stores/useMusicStore";
import { useUserStore } from "@/stores/useUserStore";
import { SongResults } from "./components/SongResult";
import { AlbumResults } from "./components/AlbumResult";
import { UserResults } from "./components/UserResult";

export function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  const { songs, albums, searchSongs, searchAlbums, getAllAlbum, getAllSong } =
    useMusicStore();
  // console.log(albums);
  //   console.log("Type of albums:", typeof albums);
  // console.log("Instance check:", Array.isArray(albums));
  const { users, searchUsers, getAllUser } = useUserStore();

  const fetchData = useCallback(() => {
    if (!query.trim()) {
      getAllSong();
      getAllAlbum();
      getAllUser();
    } else {
      searchSongs(query);
      searchAlbums(query);
      searchUsers(query);
    }
  }, [
    query,
    getAllSong,
    getAllAlbum,
    getAllUser,
    searchSongs,
    searchAlbums,
    searchUsers,
  ]);

  useEffect(() => {
    setSearchQuery(query);
    fetchData();
  }, [query, fetchData]);

  // Handle search
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSearchParams({ query: searchQuery.trim() });
    },
    [searchQuery, setSearchParams]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Search Results</h2>

        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

            <Input
              type="search"
              placeholder="Search for songs, albums..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button type="submit" size="sm">
            Search
          </Button>
        </form>
      </div>

      {query ? (
        <>
          <div className="text-lg">
            Search results for: <span className="font-medium">"{query}"</span>
          </div>

          <Tabs defaultValue="songs" className="space-y-4">
            <TabsList>
              <TabsTrigger value="songs">Songs ({songs.length})</TabsTrigger>

              {/* <TabsTrigger value="albums">Albums ({albums.length})</TabsTrigger> */}

              <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="songs" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Songs</CardTitle>
                </CardHeader>

                <CardContent>
                  <SongResults songs={songs} query={query} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="albums" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Albums</CardTitle>
                </CardHeader>

                <CardContent>
                  <AlbumResults albums={albums} query={query} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Users</CardTitle>
                </CardHeader>

                <CardContent>
                  <UserResults users={users} query={query} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search className="h-16 w-16 text-muted-foreground mb-6" />

          <h3 className="text-xl font-medium">Start searching</h3>

          <p className="text-muted-foreground mt-2 max-w-md">
            Enter a search term above to find songs, albums, and more in the
            Spotify catalog.
          </p>
        </div>
      )}
    </div>
  );
}
