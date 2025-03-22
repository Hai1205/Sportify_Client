import type { ReactNode } from "react";
import { Music, AlertCircle, Album } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-gray-800 rounded-full p-4 mb-4">
        {icon || <AlertCircle className="h-8 w-8 text-gray-400" />}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 max-w-md">{description}</p>
    </div>
  );
}

export function AlbumsEmptyState() {
  return (
    <EmptyState
      icon={<Album className="h-8 w-8 text-gray-400" />}
      title="No Albums Found"
      description="This user hasn't created any albums yet. Albums will appear here once they're created."
    />
  );
}

export function SongsEmptyState() {
  return (
    <EmptyState
      icon={<Music className="h-8 w-8 text-gray-400" />}
      title="No Songs Found"
      description="This user hasn't created any songs yet. Songs will appear here once they're created."
    />
  );
}

export function UserNotFoundState() {
  return (
    <div className=" h-[calc(100vh-420px)]">
      <EmptyState
        title="User Not Found"
        description="We couldn't find the user you're looking for. They may have deleted their account or the URL might be incorrect."
        
      />
    </div>
  );
}
