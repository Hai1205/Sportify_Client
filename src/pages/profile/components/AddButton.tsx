import type React from "react"
import { useState } from "react"
import { Plus, Music, Disc } from "lucide-react"

interface AddButtonProps {
  activeTab: "albums" | "songs"
}

const AddButton: React.FC<AddButtonProps> = ({ activeTab }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6">
      {isOpen && (
        <div className="absolute bottom-16 right-0 flex flex-col gap-2 items-end mb-2">
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 flex items-center gap-2 shadow-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-sm pr-1">{activeTab === "albums" ? "Add Album" : "Add Song"}</span>
            {activeTab === "albums" ? <Disc size={20} /> : <Music size={20} />}
          </button>
        </div>
      )}

      <button
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Plus size={24} />
      </button>
    </div>
  )
}

export default AddButton

