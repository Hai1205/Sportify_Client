export function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="h-16 w-16 bg-gray-800 rounded-full mx-auto mb-4"></div>
       
        <div className="h-6 w-48 bg-gray-800 rounded mx-auto mb-2"></div>
        
        <div className="h-4 w-32 bg-gray-800 rounded mx-auto"></div>
      </div>
    </div>
  );
}
