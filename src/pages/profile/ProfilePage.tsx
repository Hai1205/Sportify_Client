import { useEffect, useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileContentTabs from "./components/ProfileContentTabs";
import { useUserStore } from "@/stores/useUserStore";
import { useParams } from "react-router-dom";
import { UserNotFoundState } from "./components/EmptyState";
import { UserSkeleton } from "./components/UserSkeleton";
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

  // const user = {
  //   fullName: "Jane Doe",
  //   avatarUrl: "/placeholder.svg?height=150&width=150",
  //   username: "janedoe",
  //   followers: ["a", "b", "c", "d", "e", "f", "g"],
  //   following: ["a", "b", "c", "d", "e", "f", "g"],
  // };

  const albums = [
    {
      id: "1",
      title: "Midnight Memories",
      artist: "Jane Doe",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2023",
    },
    {
      id: "2",
      title: "Summer Vibes",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2022",
    },
    {
      id: "3",
      title: "Acoustic Sessions",
      artist: "Jane Doe",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2021",
    },
    {
      id: "4",
      title: "First Light",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2020-01-01",
    },
    {
      id: "5",
      title: "First Light",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2020-01-01",
    },
    {
      id: "6",
      title: "First Light",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2020-01-01",
    },
    {
      id: "7",
      title: "First Light",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2020-01-01",
    },
    {
      id: "8",
      title: "First Light",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2020-01-01",
    },
    {
      id: "9",
      title: "First Light",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2020-01-01",
    },
    {
      id: "10",
      title: "First Light",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2020-01-01",
    },
    {
      id: "11",
      title: "First Light",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2020-01-01",
    },
    {
      id: "12",
      title: "First Light",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2020-01-01",
    },
    {
      id: "13",
      title: "First Light",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2020-01-01",
    },
    {
      id: "14",
      title: "First Light",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2020-01-01",
    },
    {
      id: "15",
      title: "First Light",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2020-01-01",
    },
    {
      id: "16",
      title: "First Light",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2020-01-01",
    },
    {
      id: "17",
      title: "First Light",
      thumbailUrl: "/placeholder.svg?height=200&width=200",
      releaseDate: "2020-01-01",
    },
  ];

  const songs = [
    {
      id: "1",
      title: "Dancing in the Rain",
      album: "Midnight Memories",
      duration: 300,
    },
    { id: "2", title: "Starlight", album: "Midnight Memories", duration: 300 },
    { id: "3", title: "Ocean Waves", album: "Summer Vibes", duration: 300 },
    { id: "4", title: "Sunset Dreams", album: "Summer Vibes", duration: 300 },
    { id: "5", title: "Whispers", album: "Acoustic Sessions", duration: 300 },
    { id: "6", title: "Mountain High", album: "First Light", duration: 300 },
  ];

  // Show loading state while currentUser data is being fetched
  if (userLoading) {
    return <UserSkeleton />;
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
        albums={albums}
        songs={songs}
      />
    </div>
  );
};

export default ProfilePage;
