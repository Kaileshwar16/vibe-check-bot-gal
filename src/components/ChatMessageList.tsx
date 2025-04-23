
import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/hooks/useChat";

interface ChatMessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({messages, isTyping}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  return (
    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {message.content}
            <div className="text-xs opacity-70 mt-1">
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="bot-message">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-white pulse-animate"></div>
              <div className="w-2 h-2 rounded-full bg-white pulse-animate" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 rounded-full bg-white pulse-animate" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default ChatMessageList;
