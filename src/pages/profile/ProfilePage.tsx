import { useEffect, useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileContentTabs from "./components/ProfileContentTabs";
import { useUserStore } from "@/stores/useUserStore";
import { useParams } from "react-router-dom";
import { UserEmptyState } from "../../layout/components/EmptyState";
import { ProfileSkeleton } from "./components/ProfileSkeleton";
import { useAuthStore } from "@/stores/useAuthStore";
import { ScrollArea } from "@/components/ui/scroll-area";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<"albums" | "songs">("albums");
  const { userId } = useParams();
  const { user: userAuth, isLoading: userLoading } = useAuthStore();
  const { user: currentUser, getUser, followUser } = useUserStore();

  useEffect(() => {
    const fetchUser = () => {
      try {
        if (!userId) {
          throw new Error("User ID is undefined");
        }

        getUser(userId);
      } catch (error) {
        console.error("Failed to load currentUser:", error);
      }
    };

    fetchUser();
  }, [getUser, userId]);

  // Show loading state while currentUser data is being fetched
  if (userLoading) {
    return <ProfileSkeleton />;
  }

  // Show currentUser not found state if currentUser data couldn't be loaded
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <UserEmptyState />
      </div>
    );
  }

  if (!userAuth) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <UserEmptyState />
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="relative pb-20">
        <ProfileHeader
          user={currentUser}
          userAuth={userAuth}
          userLoading={userLoading}
          followUser={followUser}
          getUser={getUser}
        />

        <ProfileContentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </ScrollArea>
  );
};

export default ProfilePage;
