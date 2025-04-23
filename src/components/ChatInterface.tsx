

import React from "react";
import { useChat } from "@/hooks/useChat";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";

interface ChatInterfaceProps {
  apiKey: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = () => {
  const {
    messages,
    input,
    setInput,
    isTyping,
    isLlamaLoading,
    isMuted,
    handleSendMessage,
    toggleMute,
  } = useChat();

  return (
    <div className="flex flex-col h-[80vh] max-w-2xl w-full mx-auto border rounded-xl overflow-hidden bg-white shadow-lg">
      <ChatHeader isMuted={isMuted} toggleMute={toggleMute} />
      <ChatMessageList messages={messages} isTyping={isTyping} />
      <ChatInput
        input={input}
        setInput={setInput}
        onSend={handleSendMessage}
        isTyping={isTyping}
        isLlamaLoading={isLlamaLoading}
      />
    </div>
  );
};

export default ChatInterface;
