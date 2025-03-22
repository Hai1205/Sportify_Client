import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProfileHeaderProps {
  currentUser: User;
  userAuth: User;
  userLoading: boolean;
  followUser: (currentUserId: string, opponentId: string) => Promise<any>;
}

const ProfileHeader = ({
  currentUser,
  userAuth,
  userLoading,
  followUser,
}: ProfileHeaderProps) => {
  const follow = (e: any) => {
    e.preventDefault();

    if (!currentUser.id) {
      throw new Error("User ID is undefined");
    }

    if (!userAuth?.id) {
      throw new Error("Current user ID is undefined");
    }

    followUser(userAuth?.id, currentUser.id);
  };

  const isMyProfile = currentUser.id === userAuth?.id;
  const amIFollowing = currentUser?.following.includes(userAuth);

  return (
    <div className="bg-gradient-to-b from-purple-900 to-black p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Avatar className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/10">
          <AvatarImage src={currentUser.avatarUrl} alt={currentUser.fullName} />

          <AvatarFallback className="text-8xl font-bold">
            {currentUser.fullName[0]}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold">{currentUser.fullName}</h1>

          <p className="text-gray-400 mb-2">@{currentUser.username}</p>

          <div className="flex justify-center md:justify-start gap-4 mb-4">
            <div>
              <span className="font-bold">{currentUser.followers.length}</span>

              <span className="text-gray-400 ml-1">Followers</span>
            </div>

            <div>
              <span className="font-bold">{currentUser.following.length}</span>

              <span className="text-gray-400 ml-1">Following</span>
            </div>
          </div>

          {!isMyProfile && (
            <div className="flex gap-3 justify-center md:justify-start">
              <Button
                onClick={follow}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
              >
                {userLoading && "Loading..."}

                {!userLoading && amIFollowing && "Unfollow"}

                {!userLoading && !amIFollowing && "Follow"}
              </Button>

              <Link
                to="/chat"
                className="bg-transparent border border-gray-400 hover:border-white text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
              >
                <MessageSquare size={18} />
                
                <span>Message</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
