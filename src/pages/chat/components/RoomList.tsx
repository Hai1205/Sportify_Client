import { useEffect } from "react";
import { useChatStore } from "@/stores/useChatStore";
import { ChatRoom } from "@/utils/types";
import { useUserStore } from "@/stores/useUserStore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const RoomList = () => {
  const { user } = useUserStore();
  const { chatRooms, getChatRooms, setActiveRoom, setSelectedUser, selectedUser, activeRoomId } = useChatStore();

  useEffect(() => {
    if (user) {
      getChatRooms();
    }
  }, [user, getChatRooms]);

  // Helper để lấy tên hiển thị cho phòng chat 1-1
  const getDirectChatName = (room: ChatRoom) => {
    if (room.roomType === 'direct' && room.members.length === 2) {
      const otherUser = room.members.find(member => member.id !== user?.id);
      return otherUser?.fullName || 'Unknown User';
    }
    return room.name || `Group ${room.id}`;
  };

  // Helper để lấy avatar cho phòng chat
  const getRoomAvatar = (room: ChatRoom) => {
    if (room.roomType === 'direct' && room.members.length === 2) {
      const otherUser = room.members.find(member => member.id !== user?.id);
      return otherUser?.avatarUrl || '';
    }
    return ''; // Có thể thêm avatar mặc định cho group chat
  };

  const handleSelectRoom = (room: ChatRoom) => {
    if (room.roomType === 'direct') {
      // Với chat 1-1, set selectedUser là người còn lại trong phòng
      const otherUser = room.members.find(member => member.id !== user?.id);
      if (otherUser) {
        setSelectedUser(otherUser);
        setActiveRoom(room.id);
      }
    } else {
      // Với group chat, clear selectedUser và chỉ set activeRoomId
      setSelectedUser(null);
      setActiveRoom(room.id);
    }
  };

  return (
    <div className="space-y-2 p-2">
      <h3 className="font-medium text-zinc-400 px-2">Recent Chats</h3>
      
      {chatRooms.map(room => (
        <div
          key={room.id}
          onClick={() => handleSelectRoom(room)}
          className={cn(
            "flex items-center gap-3 p-2 rounded-lg cursor-pointer",
            (selectedUser && room.roomType === 'direct' && 
             room.members.some(m => m.id === selectedUser.id)) ||
            (activeRoomId === room.id)
              ? "bg-zinc-800"
              : "hover:bg-zinc-800/50"
          )}
        >
          <Avatar>
            <AvatarImage src={getRoomAvatar(room)} />
            <AvatarFallback>
              {room.roomType === 'group' ? 'G' : getDirectChatName(room)[0]}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <p className="font-medium truncate">{getDirectChatName(room)}</p>
            {room.lastMessage && (
              <p className="text-xs text-zinc-400 truncate">
                {room.lastMessage.content}
              </p>
            )}
          </div>
          
          {room.roomType === 'group' && (
            <span className="text-xs px-2 py-1 bg-green-800 rounded-full ml-auto">
              Group
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default RoomList;