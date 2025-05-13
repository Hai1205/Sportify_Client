import { useEffect } from "react";
import { useChatStore } from "@/stores/useChatStore";
import { useUserStore } from "@/stores/useUserStore"; 
import { Card } from "@/components/ui/card";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "react-router-dom";
import { isChatMember, getOtherUserFromRoom } from "@/utils/chatHelpers";

const ChatPage = () => {
  const { 
    disconnectSocket, 
    getChatRooms,
    chatRooms,
    activeRoomId,
    setActiveRoom,
    setSelectedUser
  } = useChatStore();
  const { user } = useUserStore();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  useEffect(() => {
    getChatRooms().then(() => {
      const savedRoomId = localStorage.getItem('activeRoomId');
      if (savedRoomId && !activeRoomId) {
        setActiveRoom(savedRoomId);
      }
    });
    
    return () => {
      disconnectSocket();
    };
  }, [getChatRooms, disconnectSocket, setActiveRoom, activeRoomId]);
  useEffect(() => {
    if (userId && chatRooms.length > 0 && user) {
      console.log("Looking for room with userId:", userId);
      console.log("Current user:", user);
      console.log("Available rooms:", chatRooms);
      const room = chatRooms.find(room => {
        const isDirectChat = room.roomType === 'direct' || room.conversation_type === 'direct';
        if (!isDirectChat) return false;
        
        return room.members.some(member => {
          if (isChatMember(member)) {
            const memberId = member.user_data?.id || member.user;
            const result = memberId === userId;
            return result;
          }
          return member.id === userId;
        });
      });
      
      if (room) {
        console.log("Found room:", room);
        setActiveRoom(room.id);
      } else {
        console.log("Room not found for userId:", userId);
      }
    }
  }, [userId, chatRooms, user, setActiveRoom]);

  useEffect(() => {
    if (activeRoomId && chatRooms.length > 0 && user) {
      localStorage.setItem('activeRoomId', activeRoomId);
      
      const currentRoom = chatRooms.find(room => room.id === activeRoomId);
      if (currentRoom) {
        const otherUser = getOtherUserFromRoom(currentRoom, user.id);
        if (otherUser) {
          setSelectedUser(otherUser);
        }
      }
    }
  }, [activeRoomId, chatRooms, user, setSelectedUser]);
  
  return (
    <div className="container my-0 mx-auto">
      <h1 className="text-2xl font-bold mb-3">Tin nhắn</h1>
      
      <div className="grid grid-cols-12 gap-2 h-[68vh]">
        {/* Các phần còn lại giữ nguyên */}
        <Card className="col-span-12 md:col-span-4 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Cuộc trò chuyện</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <RoomList />
            </div>
          </div>
        </Card>
        
        <Card className="col-span-12 md:col-span-8 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <MessageList />
            </div>
            <Separator />
            <ChatInput />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;
