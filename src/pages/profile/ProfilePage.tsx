import { useEffect, useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileContentTabs from "./components/ProfileContentTabs";
import { useUserStore } from "@/stores/useUserStore";
import { useParams } from "react-router-dom";
import { UserNotFoundState } from "./components/ProfileEmptyState";
import { ProfileSkeleton } from "./components/ProfileSkeleton";
import { useAuthStore } from "@/stores/useAuthStore";

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
        <UserNotFoundState />
      </div>
    );
  }

  if (!userAuth) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <UserNotFoundState />
      </div>
    );
  }

  return (
    <div className="relative pb-20">
      <ProfileHeader
        currentUser={currentUser}
        userAuth={userAuth}
        userLoading={userLoading}
        followUser={followUser}
      />

      <ProfileContentTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default ProfilePage;
