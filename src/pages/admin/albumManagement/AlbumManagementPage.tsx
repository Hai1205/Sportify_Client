import { Link, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { MoreHorizontal, Music, Pencil, Plus, Search, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMusicStore } from "@/stores/useMusicStore";
import { AlbumsEmptyState } from "@/layout/components/EmptyState";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Album } from "@/utils/types";
import { TableSkeleton } from "../../../layout/components/TableSkeleton";
import UploadAlbumDialog from "./components/UploadAlbumDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EditAlbumDialog from "./components/EditAlbumDialog";

export default function AlbumManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const queryString = location.search;

  const [isAddAlbumOpen, setIsAddAlbumOpen] = useState(false);
  const [albums, setAlbums] = useState<Album[] | []>([]);

  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { isLoading, getAllAlbum, searchAlbums } = useMusicStore();

  useEffect(() => {
    const fetchAlbums = async () => {
      if (queryString) {
        await searchAlbums(queryString).then(setAlbums);
      } else {
        await getAllAlbum().then(setAlbums);
      }
    };

    fetchAlbums();
  }, [getAllAlbum, query, queryString, searchAlbums]);

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

  const handleAlbumUploaded = (newAlbum: Album) => {
    setAlbums([...albums, newAlbum]);
  };

  const handleEditAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Albums</h2>

        <div className="flex items-center gap-2">
          <Dialog open={isAddAlbumOpen} onOpenChange={setIsAddAlbumOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setIsAddAlbumOpen(true)}
                size="sm"
                className="h-8 gap-1"
              >
                <Plus className="h-4 w-4" />
                Upload Album
              </Button>
            </DialogTrigger>

            <UploadAlbumDialog
              isOpen={isAddAlbumOpen}
              onOpenChange={setIsAddAlbumOpen}
              onAlbumUploaded={handleAlbumUploaded}
            />
          </Dialog>
        </div>
      </div>

      <Card className="bg-zinc-900">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Album Management</CardTitle>

            <div className="flex items-center gap-2">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="relative w-60">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

                  <Input
                    type="search"
                    placeholder="Search albums..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>
        </CardHeader>
        <ScrollArea className="h-[calc(100vh-340px)] w-full rounded-xl">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px] text-center">
                    Thumbnail
                  </TableHead>

                  <TableHead className="text-center">Title</TableHead>

                  <TableHead className="text-center">Artist</TableHead>

                  <TableHead className="text-center">Release Date</TableHead>

                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <TableSkeleton />
                    </TableCell>
                  </TableRow>
                ) : albums.length > 0 ? (
                  albums.map((album) => (
                    <TableRow key={album.id}>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <Link to={`/album-details/${album.id}`}>
                            <Avatar className="h-9 w-9 rounded-md">
                              <AvatarImage
                                src={album.thumbnailUrl}
                                alt={album.title}
                              />
                              <AvatarFallback>
                                <Music className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                        </div>
                      </TableCell>

                      <TableCell className="text-center hover:underline">
                        <Link to={`/album-details/${album.id}`}>
                          {album.title}
                        </Link>
                      </TableCell>

                      <TableCell className="text-center hover:underline">
                        <Link to={`/profile/${album.user.id}`}>
                          {album.user.fullName}
                        </Link>
                      </TableCell>

                      <TableCell className="text-center">
                        {album.releaseDate}
                      </TableCell>

                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>

                              <DropdownMenuItem
                                onClick={() => handleEditAlbum(album)}
                                className="cursor-pointer"
                              >
                                <Pencil className="mr-2 h-4 w-4 cursor-pointer" />
                                {" Edit"}
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              <DropdownMenuItem className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                {" Delete"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <AlbumsEmptyState message="No albums have been added yet. Create an album to get started." />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </ScrollArea>
      </Card>

      <EditAlbumDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        album={selectedAlbum}
      />
    </div>
  );
}
