import { useState } from "react"
import { PlusCircle, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CreateAlbumModal() {
  const [open, setOpen] = useState(false)
  const [albumName, setAlbumName] = useState("")
  const [albumDescription, setAlbumDescription] = useState("")

  const handleCreateAlbum = () => {
    // Handle album creation logic here
    console.log("Creating album:", { albumName, albumDescription })
    setOpen(false)
    // Reset form
    setAlbumName("")
    setAlbumDescription("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gray-800 hover:bg-gray-700 text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Album
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Create New Album</DialogTitle>
          <DialogDescription className="text-gray-400">Fill in the details to create your new album.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="album-cover" className="text-white">
              Album thumbnail
            </Label>
            <div className="flex items-center justify-center h-40 bg-gray-800 rounded-md border border-dashed border-gray-700 cursor-pointer hover:bg-gray-750">
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <Upload className="h-8 w-8" />
                <span>Upload cover image</span>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="album-name" className="text-white">
              Album title
            </Label>
            <Input
              id="album-name"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="My New Album"
            />
          </div>
          {/* <div className="grid gap-2">
            <Label htmlFor="album-description" className="text-white">
              Description
            </Label>

            <Textarea
              id="album-description"
              value={albumDescription}
              onChange={(e: any) => setAlbumDescription(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Write a description for your album..."
            />
          </div> */}
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button onClick={handleCreateAlbum} className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium">
            Create Album
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}