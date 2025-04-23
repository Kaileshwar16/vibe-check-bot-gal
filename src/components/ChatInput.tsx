
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smile, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  onSend: () => void;
  isTyping: boolean;
  isLlamaLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  onSend,
  isTyping,
  isLlamaLoading,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-muted/30">
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="bg-vibecheck-lightpink hover:bg-vibecheck-pink hover:text-white transition-colors"
          onClick={() => toast("Mood boosters coming soon! 💖")}
        >
          <Smile className="h-5 w-5" />
        </Button>

        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isLlamaLoading ? "Loading AI bestie..." : "Type your message..."}
          className="flex-1 border-2 border-vibecheck-lightpurple focus:border-vibecheck-purple"
          disabled={isLlamaLoading}
        />

        <Button
          type="submit"
          className="bg-gradient-to-r from-vibecheck-purple to-vibecheck-pink hover:opacity-90 transition-opacity"
          disabled={!input.trim() || isTyping || isLlamaLoading}
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
