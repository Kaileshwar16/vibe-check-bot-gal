
import React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  isMuted: boolean;
  toggleMute: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({isMuted, toggleMute}) => {
  return (
    <div className="bg-gradient-to-r from-vibecheck-purple to-vibecheck-pink p-4 text-white flex items-center justify-between">
      <div className="flex items-center">
        <MessageCircle className="h-6 w-6 mr-2" />
        <h2 className="text-xl font-bold">Vibe Check Bot</h2>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="text-white hover:bg-white/20"
      >
        {isMuted 
          ? <span className="inline-block mr-1" title="Muted"><svg width="20" height="20"><line x1="3" y1="17" x2="17" y2="3" stroke="white" strokeWidth="2" /></svg></span>
          : <span className="inline-block mr-1" title="Speaking"><svg width="20" height="20"><circle cx="10" cy="10" r="6" stroke="white" strokeWidth="2" fill="none" /></svg></span>
        }
      </Button>
    </div>
  );
};

export default ChatHeader;
