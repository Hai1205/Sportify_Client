import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";
import { useUserStore } from "@/stores/useUserStore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "@/utils/types";

import { getOtherUserFromRoom } from "@/utils/chatHelpers";

const ChatHeader = () => {
  const { selectedUser, activeRoomId, chatRooms, onlineUsers } = useChatStore();
  const { user: currentUser } = useUserStore();
  const [displayUser, setDisplayUser] = useState<User | null>(selectedUser);
  useEffect(() => {
    if (activeRoomId && chatRooms.length > 0 && currentUser) {
      const currentRoom = chatRooms.find(room => room.id === activeRoomId);
      
      if (currentRoom) {
        console.log("Current room:", currentRoom);
        console.log("Current user ID:", currentUser.id);
        
        const otherUser = getOtherUserFromRoom(currentRoom, currentUser.id);
        console.log("Other user:", otherUser);
        
        if (currentUser) {
          setDisplayUser(currentUser); // <----
        } else {
          console.error("Could not find other user in room");
        }
      }
    } else if (selectedUser) {
      setDisplayUser(selectedUser);
    }
  }, [activeRoomId, chatRooms, currentUser, selectedUser]);

  if (!displayUser) return null;

  return (
    <div className="p-4 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <Link to={`/profile/${displayUser?.id}`}>
          <Avatar>
            <AvatarImage src={displayUser.avatarUrl} />
            <AvatarFallback>{displayUser.fullName?.[0] || '?'}</AvatarFallback>
          </Avatar>
        </Link>

        <div>
          <Link to={`/profile/${displayUser?.id}`}>
            <h2 className="font-medium hover:underline cursor-pointer">
              {displayUser.fullName}
            </h2>
          </Link>

          <p className="text-sm text-zinc-400">
            {onlineUsers.has(displayUser.id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};


export default ChatHeader;
