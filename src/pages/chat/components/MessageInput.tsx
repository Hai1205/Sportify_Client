import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { user } = useAuthStore();
  const { selectedUser, sendMessage, activeRoomId, sendGroupMessage } = useChatStore();
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    try {
      setSending(true);
      
      if (activeRoomId && !selectedUser) {
        // Group message
        await sendGroupMessage(activeRoomId, user?.id!, message);
      } else if (selectedUser) {
        // Direct message
        await sendMessage(selectedUser.id, user?.id!, message);
      }
      
      // Clear input after sending
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!selectedUser && !activeRoomId) return null;

  return (
    <div className="p-4 border-t border-zinc-700 mt-auto">
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Nhập tin nhắn..."
          className="bg-zinc-800"
          disabled={sending}
        />
        <Button 
          onClick={handleSend}
          disabled={!message.trim() || sending}
        >
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
