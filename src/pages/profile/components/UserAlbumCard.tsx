import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Album } from "@/utils/types"
import { Music } from "lucide-react"

export function UserAlbumCard({ id, title, thumbnailUrl, songs }: Album) {
  return (
    <Card key={id} className="bg-gray-900 hover:bg-gray-800 transition-colors border-none">
      <CardContent className="p-4">
        <div className="relative group">
          <img
            src={thumbnailUrl || "/placeholder.svg"}
            alt={title}
            className="w-full aspect-square object-cover rounded-md mb-4"
          />
          <Button
            className="absolute bottom-4 right-4 rounded-full w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-black opacity-0 group-hover:opacity-100 transition-opacity"
            size="icon"
          >
            <Music className="h-6 w-6" />
          </Button>
        </div>
       
        <h3 className="font-bold mb-1">{title}</h3>
       
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>{songs.length} songs</span>
        </div>
      </CardContent>
    </Card>
  )
}