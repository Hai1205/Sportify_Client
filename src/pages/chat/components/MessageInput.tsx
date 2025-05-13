import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import { useChatStore } from "@/stores/useChatStore";

interface MessageInputProps {
  disabled?: boolean;
}

const MessageInput = ({ disabled = false }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { activeRoomId, sendMessage } = useChatStore();

  const handleSend = async () => {
    if (!message.trim() || !activeRoomId) return;
    
    setSending(true);
    
    try {
      sendMessage(activeRoomId, message.trim());
      setMessage("");
    } finally {
      setTimeout(() => setSending(false), 300); 
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled && message.trim()) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-zinc-700 mt-auto">
      <div className="flex gap-2 items-center">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Nhập tin nhắn..."
          className="bg-zinc-800"
          disabled={sending || disabled || !activeRoomId}
          autoComplete="off"
        />
        <Button 
          onClick={handleSend}
          disabled={!message.trim() || sending || disabled || !activeRoomId}
          className="min-w-[70px] flex justify-center"
          size="icon"
        >
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
