import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Upload, Save, Clock, Calendar, Eye } from "lucide-react"

interface Song {
  id: number
  title: string
  album: string
  albumId: number
  duration: string
  releaseDate: string
  views: number
  genre: string
  lyrics: string
  thumbnail: string
}

interface Album {
  id: number
  title: string
}

const SongDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [song, setSong] = useState<Song | null>(null)
  const [albums, setAlbums] = useState<Album[]>([])
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("")

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Fetch song data
    const mockSongs = [
      {
        id: 1,
        title: "Dancing in the Rain",
        album: "Midnight Memories",
        albumId: 1,
        duration: "3:45",
        releaseDate: "2023-05-15",
        views: 1245678,
        genre: "Pop",
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
        genre: "Pop",
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
        genre: "Electronic",
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
        genre: "Electronic",
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
        genre: "Acoustic",
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
        genre: "Indie",
        lyrics: "Mountain high\nTouching the sky\nBreathing the air\nFeeling alive",
        thumbnail: "/placeholder.svg?height=200&width=200",
      },
    ]

    // Fetch albums data
    const mockAlbums = [
      { id: 1, title: "Midnight Memories" },
      { id: 2, title: "Summer Vibes" },
      { id: 3, title: "Acoustic Sessions" },
      { id: 4, title: "First Light" },
    ]

    const foundSong = mockSongs.find((s) => s.id === Number.parseInt(id || "0"))
    if (foundSong) {
      setSong(foundSong)
      setThumbnailPreview(foundSong.thumbnail)
    }
    setAlbums(mockAlbums)
  }, [id])

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL for preview
      const previewUrl = URL.createObjectURL(file)
      setThumbnailPreview(previewUrl)

      // Update the song object with the new thumbnail
      if (song) {
        setSong({
          ...song,
          thumbnail: previewUrl,
        })
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!song) return

    const { name, value } = e.target
    setSong({
      ...song,
      [name]: value,
    })
  }

  const handleSave = () => {
    // In a real app, you would save the changes to a server
    setIsEditing(false)
    alert("Changes saved successfully!")
  }

  if (!song) {
    return (
      <div className="min-h-screen bg-spotify-black flex items-center justify-center">
        <div className="text-white">Loading song details...</div>
      </div>
    )
  }

  return (
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
          <h1 className="text-3xl font-bold">{isEditing ? "Edit Song" : "Song Details"}</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-spotify-green hover:bg-spotify-green-dark rounded-full transition-colors"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Thumbnail section */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-900 rounded-md overflow-hidden">
              <img src={thumbnailPreview || song.thumbnail} alt={song.title} className="w-full h-full object-cover" />
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

            {/* Non-editable info */}
            <div className="space-y-3 bg-gray-900/50 p-4 rounded-md">
              <div className="flex items-center text-gray-400">
                <Clock size={16} className="mr-2" />
                <span>Duration: {song.duration}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Calendar size={16} className="mr-2" />
                <span>Released: {new Date(song.releaseDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Eye size={16} className="mr-2" />
                <span>Views: {song.views.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Song details form */}
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
                  value={song.title}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                />
              ) : (
                <div className="text-xl font-semibold">{song.title}</div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="genre" className="block text-gray-400">
                Genre
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  value={song.genre}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                />
              ) : (
                <div>{song.genre}</div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="albumId" className="block text-gray-400">
                Album
              </label>
              {isEditing ? (
                <select
                  id="albumId"
                  name="albumId"
                  value={song.albumId}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                >
                  {albums.map((album) => (
                    <option key={album.id} value={album.id}>
                      {album.title}
                    </option>
                  ))}
                </select>
              ) : (
                <div>{song.album}</div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="lyrics" className="block text-gray-400">
                Lyrics
              </label>
              {isEditing ? (
                <textarea
                  id="lyrics"
                  name="lyrics"
                  value={song.lyrics}
                  onChange={handleInputChange}
                  rows={10}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                />
              ) : (
                <div className="whitespace-pre-line bg-gray-900/50 p-4 rounded-md">{song.lyrics}</div>
              )}
            </div>

            {isEditing && (
              <div className="flex justify-end">
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
  )
}

export default SongDetail

