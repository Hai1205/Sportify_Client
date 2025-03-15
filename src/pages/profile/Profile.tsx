"use client";

import { useState, useEffect } from "react";
import { Music, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CreateAlbumModal } from "./components/CreateAlbumModal";
import { AlbumCardSkeleton } from "./components/AlbumCardSkeleton";
import { UserAlbumCard } from "./components/UserAlbumCard";
import { useParams } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import { AlbumsEmptyState, UserNotFoundState } from "./components/EmptyState";
import { UserSkeleton } from "./components/UserSkeleton";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMusicStore } from "@/stores/useMusicStore";

export default function SpotifyProfile() {
  const { userId } = useParams();
  const { user: userAuth, isLoading: userLoading, isArtist, isAdmin } = useAuthStore();
  const { albums, isLoading: albumLoading, getUserAlbums } = useMusicStore();
  const { user: currentUser, getUser, followUser } = useUserStore();
  const [activeTab, setActiveTab] = useState("albums");

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

  useEffect(() => {
    const fetchUserAlbums = async () => {
      try {
        if (!userId) {
          throw new Error("User ID is undefined");
        }

        getUserAlbums(userId);
      } catch (error) {
        console.error("Failed to load currentUser:", error);
      }
    };

    fetchUserAlbums();
  }, [getUserAlbums, userId]);

  const follow = (e: any) => {
    e.preventDefault();

    if (!userId) {
      throw new Error("User ID is undefined");
    }

    if (!userAuth?.id) {
      throw new Error("Current user ID is undefined");
    }

    followUser(userAuth?.id, userId);
  };

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

  const isMyProfile = userId === userAuth?.id;
  const amIFollowing = currentUser?.following.includes(userAuth);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-emerald-900 to-black p-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <Avatar className="h-40 w-40 md:h-52 md:w-52 rounded-full border-4 border-black shadow-xl">
              <AvatarImage src={currentUser?.avatarUrl} alt="User profile" />

              <AvatarFallback className="bg-emerald-900 text-4xl">
                {currentUser?.fullName
                  ? currentUser.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "?"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                  {currentUser?.fullName || "Unknown User"}
                </h1>

                {isMyProfile ? (
                  <div className="flex gap-2">
                    {isArtist || isAdmin && <CreateAlbumModal />}
                  </div>
                ) : (
                  isArtist && (
                    <Button
                      onClick={follow}
                      className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-8"
                    >
                      {userLoading && "Loading..."}

                      {!userLoading && amIFollowing && "Unfollow"}

                      {!userLoading && !amIFollowing && "Follow"}
                    </Button>
                  )
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm text-gray-300 mt-4">
                <div className="flex items-center justify-center md:justify-start gap-1">
                  <Music className="h-4 w-4" />

                  <span>{currentUser?.albums?.length || 0} Public Albums</span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-1">
                  <Users className="h-4 w-4" />

                  <span>{currentUser?.followers?.length || 0} Followers</span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-1">
                  <Users className="h-4 w-4" />

                  <span>{currentUser?.following?.length || 0} Following</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsContent value="albums" className="pt-6">
              {albumLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {Array(8)
                    .fill(0)
                    .map((_, index) => (
                      <AlbumCardSkeleton key={index} />
                    ))}
                </div>
              ) : albums.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {albums.map((album) => (
                    <UserAlbumCard key={album.id} {...album} />
                  ))}
                </div>
              ) : (
                <AlbumsEmptyState />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
