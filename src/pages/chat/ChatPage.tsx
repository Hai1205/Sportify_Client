import { useEffect, useState, useRef, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import UsersList from "./components/UsersList";
import ChatHeader from "./components/ChatHeader";
import MessageInput from "./components/MessageInput";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { NoConversationPlaceholder } from "./components/NoConversationPlaceholder";
import { Message } from "@/utils/types";
import { Loader2 } from "lucide-react";

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const ChatPage = () => {
  const { user: userAuth } = useAuthStore();
  const { 
    selectedUser, 
    getMessages, 
    initSocket, 
    messages: storeMessages, 
    activeRoomId,
    isLoading,
    isLoadingMore,
    hasMoreMessages,
    loadMoreMessages
  } = useChatStore();

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [initialScrollDone, setInitialScrollDone] = useState(false);
  const [isNearTop, setIsNearTop] = useState(false);

  // Sử dụng useMemo để lọc tin nhắn theo cuộc trò chuyện hiện tại
  const filteredMessages = useMemo(() => {
    if (!userAuth?.id || !selectedUser) return [];

    return storeMessages
      .filter(msg => 
        (msg.senderId === userAuth.id && msg.receiverId === selectedUser.id) || 
        (msg.senderId === selectedUser.id && msg.receiverId === userAuth.id)
      )
      // Loại bỏ duplicate tin nhắn bằng Map thay vì reduce
      .reduce((uniqueMessages, msg) => {
        const key = msg.tempId || msg.id;
        // Nếu đã có tin nhắn với id này, chỉ thay thế nếu không phải pending
        const existing = uniqueMessages.findIndex(m => (m.tempId || m.id) === key);
        if (existing >= 0) {
          if (!msg.pending) {
            uniqueMessages[existing] = msg; // Thay thế bằng tin nhắn không pending
          }
        } else {
          uniqueMessages.push(msg);
        }
        return uniqueMessages;
      }, [] as Message[])
      .sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }, [storeMessages, selectedUser, userAuth]);

  // Chỉ khởi tạo socket khi có user, tránh việc khởi tạo nhiều lần
  useEffect(() => {
    if (userAuth?.id) {
      initSocket(userAuth.id);
    }
  }, [userAuth?.id, initSocket]);

  // Xử lý scroll và load thêm
  useEffect(() => {
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollElement) return;

    const handleScroll = () => {
      // Kiểm tra nếu đang ở gần đầu trang (khoảng 50px)
      const isTop = scrollElement.scrollTop < 50;
      setIsNearTop(isTop && hasMoreMessages);
      
      // Nếu đang ở đầu và còn tin nhắn để load, gọi loadMoreMessages
      if (isTop && hasMoreMessages && !isLoadingMore) {
        loadMoreMessages();
      }
    };

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [hasMoreMessages, isLoadingMore, loadMoreMessages]);

  // Scroll xuống cuối khi có tin nhắn mới hoặc khi chọn user mới
  useEffect(() => {
    if (!filteredMessages.length || initialScrollDone) return;
    
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollElement) {
      setTimeout(() => {
        scrollElement.scrollTop = scrollElement.scrollHeight;
        setInitialScrollDone(true);
      }, 100);
    }
  }, [filteredMessages, initialScrollDone]);

  // Reset initialScrollDone khi chọn user mới
  useEffect(() => {
    setInitialScrollDone(false);
  }, [selectedUser]);

  // Giữ vị trí scroll khi load thêm tin nhắn cũ
  useEffect(() => {
    if (isLoadingMore) {
      const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
      const oldHeight = scrollElement?.scrollHeight;
      
      const preserveScroll = () => {
        if (scrollElement) {
          const newHeight = scrollElement.scrollHeight;
          scrollElement.scrollTop = newHeight - oldHeight;
        }
      };
      
      // Kiểm tra khi isLoadingMore thành false
      const checkLoadingState = () => {
        if (!useChatStore.getState().isLoadingMore) {
          preserveScroll();
          clearInterval(interval);
        }
      };
      
      const interval = setInterval(checkLoadingState, 100);
      return () => clearInterval(interval);
    }
  }, [isLoadingMore]);

  // Tự động scroll xuống cuối khi có tin nhắn mới được gửi hoặc nhận
  useEffect(() => {
    if (initialScrollDone && filteredMessages.length > 0 && !isLoadingMore) {
      const lastMessage = filteredMessages[filteredMessages.length - 1];
      // Chỉ scroll nếu tin nhắn mới được gửi/nhận trong khoảng 2 giây gần đây
      const isRecentMessage = (Date.now() - new Date(lastMessage.createdAt).getTime()) < 2000;
      
      if (isRecentMessage) {
        const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollElement) {
          setTimeout(() => {
            scrollElement.scrollTop = scrollElement.scrollHeight;
          }, 100);
        }
      }
    }
  }, [filteredMessages, initialScrollDone, isLoadingMore]);

  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        <UsersList />

        {/* chat message */}
        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <ChatHeader />

              <ScrollArea className="h-[calc(100vh-340px)] chat-messages" ref={scrollAreaRef}>
                <div className="p-4 space-y-4">
                  {/* Loading indicator khi cuộn lên để tải thêm tin nhắn */}
                  {isLoadingMore && (
                    <div className="flex justify-center items-center py-2">
                      <Loader2 className="h-5 w-5 text-zinc-500 animate-spin" />
                      <span className="ml-2 text-zinc-500 text-sm">Đang tải tin nhắn cũ...</span>
                    </div>
                  )}
                  
                  {/* Hiển thị thông báo khi không còn tin nhắn cũ */}
                  {!hasMoreMessages && filteredMessages.length > 0 && !isLoading && !isLoadingMore && (
                    <div className="text-center py-2">
                      <span className="text-xs text-zinc-500">Không còn tin nhắn cũ hơn</span>
                    </div>
                  )}
                  
                  {isLoading && !isLoadingMore ? (
                    <div className="flex justify-center items-center h-full">
                      <Loader2 className="h-6 w-6 text-zinc-500 animate-spin" />
                      <span className="ml-2 text-zinc-500">Đang tải tin nhắn...</span>
                    </div>
                  ) : (
                    filteredMessages.map((message) => (
                      <div
                        key={message.tempId || message.id}
                        className={`flex items-start gap-3 ${
                          message.senderId === userAuth?.id
                            ? "flex-row-reverse"
                            : ""
                        }`}
                      >
                        <Avatar className="size-8">
                          <AvatarImage
                            src={
                              message.senderId === userAuth?.id
                                ? userAuth.avatarUrl
                                : selectedUser.avatarUrl
                            }
                          />
                          <AvatarFallback>
                            {message.senderId === userAuth?.id 
                              ? userAuth.fullName?.[0] || userAuth.username?.[0]
                              : selectedUser.fullName?.[0] || selectedUser.username?.[0]}
                          </AvatarFallback>
                        </Avatar>

                        <div
                          className={`rounded-lg p-3 max-w-[70%] 
                            ${message.senderId === userAuth?.id 
                              ? "bg-green-500" 
                              : "bg-zinc-800"
                            }
                            ${message.pending ? "opacity-70" : ""}
                          `}
                        >
                          <p className="text-sm">{message.content}</p>

                          <span className="text-xs text-zinc-300 mt-1 block">
                            {formatTime(message.createdAt)}
                            {message.pending && " · Đang gửi..."}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                  
                  {/* Hiển thị thông báo khi không có tin nhắn */}
                  {!isLoading && !isLoadingMore && filteredMessages.length === 0 && (
                    <div className="flex justify-center items-center py-10">
                      <p className="text-zinc-500">Không có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!</p>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <MessageInput />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </main>
  );
};
export default ChatPage;
