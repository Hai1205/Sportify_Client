import { useState } from "react";
import { useChatStore } from "@/stores/useChatStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const { activeRoomId, sendMessage } = useChatStore();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !activeRoomId) return;
    
    sendMessage(activeRoomId, message.trim());
    setMessage("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tin nhắn..."
          className="flex-1 min-h-[60px] max-h-[120px] resize-none"
          disabled={!activeRoomId}
        />
        
        <Button 
          type="submit" 
          size="icon" 
          className="self-end h-[60px]"
          disabled={!message.trim() || !activeRoomId}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;