import { Card, CardContent } from "@/components/ui/card"

export function AlbumCardSkeleton() {
  return (
    <Card className="bg-gray-900 border-none">
      <CardContent className="p-4">
        <div className="animate-pulse">
        
          <div className="bg-gray-800 aspect-square rounded-md mb-4"></div>
      
          <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
       
          <div className="h-3 bg-gray-800 rounded w-1/2"></div>
        </div>
      </CardContent>
    </Card>
  )
}