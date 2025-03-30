import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Upload, Save, Plus, Trash2, Music } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Song {
  id: number
  title: string
  album: string
  albumId: number
  duration: string
  releaseDate: string
  views: number
  lyrics: string
  thumbnail: string
}

interface Album {
  id: number
  title: string
  artist: string
  cover: string
  releaseDate: string
}

const AlbumDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [album, setAlbum] = useState<Album | null>(null)
  const [albumSongs, setAlbumSongs] = useState<Song[]>([])
  const [availableSongs, setAvailableSongs] = useState<Song[]>([])
  const [selectedSong, setSelectedSong] = useState<number>(0)
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("")

  useEffect(() => {
    const mockSongs = [
      {
        id: 1,
        title: "Dancing in the Rain",
        album: "Midnight Memories",
        albumId: 1,
        duration: "3:45",
        releaseDate: "2023-05-15",
        views: 1245678,
        lyrics:
          "Dancing in the rain\nFeeling no pain\nWashing away yesterday's sorrows\nDancing in the rain\nStarting again\nLooking forward to all our tomorrows",
        thumbnail: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 2,
        title: "Starlight",
        album: "Midnight Memories",
        albumId: 1,
        duration: "4:12",
        releaseDate: "2023-05-15",
        views: 987432,
        lyrics: "Under the starlight\nEverything feels right\nHolding you close through the night\nUnder the starlight",
        thumbnail: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 3,
        title: "Ocean Waves",
        album: "Summer Vibes",
        albumId: 2,
        duration: "3:28",
        releaseDate: "2022-06-30",
        views: 2345678,
        lyrics: "Like ocean waves\nYou crash into me\nPulling me under\nSetting me free",
        thumbnail: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 4,
        title: "Sunset Dreams",
        album: "Summer Vibes",
        albumId: 2,
        duration: "5:02",
        releaseDate: "2022-06-30",
        views: 1876543,
        lyrics: "Sunset dreams\nPainted skies\nHolding you close\nAs the day dies",
        thumbnail: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 5,
        title: "Whispers",
        album: "Acoustic Sessions",
        albumId: 3,
        duration: "3:56",
        releaseDate: "2021-11-10",
        views: 1543210,
        lyrics: "Whispers in the dark\nEchoes of your heart\nSilent words that speak so loud\nWhispers in the dark",
        thumbnail: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 6,
        title: "Mountain High",
        album: "First Light",
        albumId: 4,
        duration: "4:23",
        releaseDate: "2020-03-22",
        views: 2134567,
        lyrics: "Mountain high\nTouching the sky\nBreathing the air\nFeeling alive",
        thumbnail: "/placeholder.svg?height=200&width=200",
      },
    ]

    const a = {
      id: 1,
      title: "Midnight Memories",
      artist: "Jane Doe",
      cover: "/placeholder.svg?height=200&width=200",
      releaseDate: "2023-05-15",
    }
    if (a) {
      setAlbum(a)
      setThumbnailPreview(a.cover)
    }

    // Filter songs for this album
    setAlbumSongs(mockSongs)

    // Get songs not in this album for the add song dropdown
    const otherSongs = mockSongs.filter((s) => s.albumId !== Number.parseInt(id || "0"))
    setAvailableSongs(otherSongs)
  }, [id])

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL for preview
      const previewUrl = URL.createObjectURL(file)
      setThumbnailPreview(previewUrl)

      // Update the album object with the new thumbnail
      if (album) {
        setAlbum({
          ...album,
          cover: previewUrl,
        })
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!album) return

    const { name, value } = e.target
    setAlbum({
      ...album,
      [name]: value,
    })
  }

  const handleAddSong = () => {
    if (selectedSong === 0) return

    const songToAdd = availableSongs.find((s) => s.id === selectedSong)
    if (songToAdd) {
      // In a real app, you would update the song's album ID on the server
      setAlbumSongs([...albumSongs, { ...songToAdd, albumId: Number.parseInt(id || "0") }])
      setAvailableSongs(availableSongs.filter((s) => s.id !== selectedSong))
      setSelectedSong(0)
    }
  }

  const handleRemoveSong = (songId: number) => {
    // In a real app, you would update the song's album ID on the server
    const songToRemove = albumSongs.find((s) => s.id === songId)
    if (songToRemove) {
      setAlbumSongs(albumSongs.filter((s) => s.id !== songId))
      setAvailableSongs([...availableSongs, songToRemove])
    }
  }

  const handleSave = () => {
    // In a real app, you would save the changes to a server
    setIsEditing(false)
    alert("Changes saved successfully!")
  }

  if (!album) {
    return (
      <div className="min-h-screen bg-spotify-black flex items-center justify-center">
        <div className="text-white">Loading album details...</div>
      </div>
    )
  }

  return (
    <ScrollArea className=" h-[calc(100vh-170px)] w-full">
      <div className="min-h-screen bg-spotify-black text-white p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with back button */}
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              Back to Profile
            </Link>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{isEditing ? "Edit Album" : "Album Details"}</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-spotify-green hover:bg-spotify-green-dark rounded-full transition-colors"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="grid md:grid-cols-[300px_1fr] gap-8">
            {/* Album cover section */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-900 rounded-md overflow-hidden">
                <img src={thumbnailPreview || album.cover} alt={album.title} className="w-full h-full object-cover" />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-spotify-green hover:bg-spotify-green-dark text-white p-3 rounded-full transition-colors"
                    >
                      <Upload size={24} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleThumbnailChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Album details form */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-gray-400">
                  Title
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={album.title}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                  />
                ) : (
                  <div className="text-xl font-semibold">{album.title}</div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="releaseDate" className="block text-gray-400">
                  Release Date
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    id="releaseDate"
                    name="releaseDate"
                    value={album.releaseDate}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                  />
                ) : (
                  <div>{new Date(album.releaseDate).toLocaleDateString()}</div>
                )}
              </div>

              {/* Songs list */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Songs</h2>
                  {isEditing && availableSongs.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <select
                        value={selectedSong}
                        onChange={(e) => setSelectedSong(Number.parseInt(e.target.value))}
                        className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                      >
                        <option value={0}>Select a song to add</option>
                        {availableSongs.map((song) => (
                          <option key={song.id} value={song.id}>
                            {song.title}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleAddSong}
                        disabled={selectedSong === 0}
                        className="p-2 bg-spotify-green hover:bg-spotify-green-dark rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  )}
                </div>

                {albumSongs.length === 0 ? (
                  <div className="text-gray-400 py-4 text-center">No songs in this album yet.</div>
                ) : (
                  <div className="bg-gray-900/50 rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800 text-left text-gray-400 text-xs">
                          <th className="px-4 py-2 w-12">#</th>
                          <th className="px-4 py-2">Title</th>
                          <th className="px-4 py-2">Duration</th>
                          {isEditing && <th className="px-4 py-2 w-12"></th>}
                        </tr>
                      </thead>
                      <tbody>
                        {albumSongs.map((song, index) => (
                          <tr key={song.id} className="border-b border-gray-800 last:border-b-0">
                            <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                            <td className="px-4 py-3">
                              <Link to={`/song-detail/${song.id}`} className="hover:underline flex items-center">
                                <Music size={16} className="mr-2 text-gray-400" />
                                {song.title}
                              </Link>
                            </td>
                            <td className="px-4 py-3 text-gray-400">{song.duration}</td>
                            {isEditing && (
                              <td className="px-4 py-3">
                                <button
                                  onClick={() => handleRemoveSong(song.id)}
                                  className="p-1 text-gray-400 hover:text-white transition-colors"
                                  title="Remove from album"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-spotify-green hover:bg-spotify-green-dark rounded-full flex items-center transition-colors"
                  >
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

export default AlbumDetail

