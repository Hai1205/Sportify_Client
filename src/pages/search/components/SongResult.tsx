import { useState } from "react"
import { Play, Pause, Info, ListPlus, MoreHorizontal, Pencil, Music } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Song } from "@/utils/types"

interface SongResultsProps {
  songs: Song[]
  query: string
}

export function SongResults({ songs, query }: SongResultsProps) {
  const [playingSong, setPlayingSong] = useState<string | null>(null)

  const togglePlaySong = (songId: string) => {
    if (playingSong === songId) {
      setPlayingSong(null)
    } else {
      setPlayingSong(songId)
    }
  }

  if (songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Music className="h-12 w-12 text-muted-foreground mb-4" />
       
        <h3 className="text-lg font-medium">No songs found</h3>
       
        <p className="text-muted-foreground mt-1">We couldn't find any songs matching "{query}"</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[500px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]"></TableHead>
          
            <TableHead>Title</TableHead>
          
            <TableHead>Artist</TableHead>
         
            <TableHead>Album</TableHead>
         
            <TableHead>Duration</TableHead>
         
            {/* <TableHead>Plays</TableHead> */}
         
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
   
        <TableBody>
          {songs.map((song) => (
            <TableRow key={song.id}>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => togglePlaySong(song.id)}
                >
                  {playingSong === song.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </TableCell>
            
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 rounded-md">
                    <AvatarImage src={song.thumbnailUrl} alt={song.title} />
                   
                    <AvatarFallback>
                      <Music className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                
                  <div className="flex flex-col">
                    <span className="font-medium">{song.title}</span>
                    {/* {song.explicit && (
                      <Badge variant="outline" className="w-fit text-xs">
                        Explicit
                      </Badge>
                    )} */}
                  </div>
                </div>
              </TableCell>
           
              <TableCell>{song.user.fullName}</TableCell>
             
              <TableCell>{song.album?.title}</TableCell>
            
              <TableCell>{song.duration}</TableCell>
            
              {/* <TableCell>{song.plays}</TableCell> */}
            
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
              
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  
                    <DropdownMenuItem>
                      <Info className="mr-2 h-4 w-4" /> View details
                    </DropdownMenuItem>
                 
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" /> Edit song
                    </DropdownMenuItem>
                 
                    <DropdownMenuSeparator />
                 
                    <DropdownMenuItem>
                      <ListPlus className="mr-2 h-4 w-4" /> Add to playlist
                    </DropdownMenuItem>
                  
                    <DropdownMenuItem>Download</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

