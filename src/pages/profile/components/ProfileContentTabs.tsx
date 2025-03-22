import type React from "react"
import ProfileAlbumsList from "./ProfileAlbumList"
import ProfileSongsList from "./ProfileSongList"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Album {
  id: string
  title: string
  thumbailUrl: string
  releaseDate: string
}

interface Song {
  id: string
  title: string
  album: string
  duration: number
}

interface ContentTabsProps {
  activeTab: "albums" | "songs"
  setActiveTab: (tab: "albums" | "songs") => void
  albums: Album[]
  songs: Song[]
}

const ProfileContentTabs: React.FC<ContentTabsProps> = ({ activeTab, setActiveTab, albums, songs }) => {
  return (
    <div className="container mx-auto px-4 py-6 flex flex-col h-[calc(100vh-370px)]">
      <div className="flex border-b border-gray-800 mb-6">
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === "albums" ? "text-white border-b-2 border-green-500" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("albums")}
        >
          Albums
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === "songs" ? "text-white border-b-2 border-green-500" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("songs")}
        >
          Songs
        </button>
      </div>

      <ScrollArea className="flex-1 h-full">
        {activeTab === "albums" ? <ProfileAlbumsList albums={albums} /> : <ProfileSongsList songs={songs} />}
      </ScrollArea>
    </div>
  )
}

export default ProfileContentTabs

