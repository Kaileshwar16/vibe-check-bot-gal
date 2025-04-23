
import { useState, useEffect, useRef } from "react";
import { loadLlamaPipeline, callLlama } from "@/utils/chatUtils";
import { toast } from "@/components/ui/sonner";

// Message interface
export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hey there! I'm your vibe check bot. How are you feeling today? Let's chat about what's on your mind!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLlamaLoading, setIsLlamaLoading] = useState(true);
  const [llamaChat, setLlamaChat] = useState<any>(null);

  // Speech stuff
  const [isMuted, setIsMuted] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const synth = window.speechSynthesis;

  // On mount: load Llama and voices
  useEffect(() => {
    (async () => {
      setIsLlamaLoading(true);
      toast("Loading Gen Z AI brain (Llama)...", { duration: 2000 });
      try {
        const chatPipeline = await loadLlamaPipeline((progress) => {
          if (progress % 0.2 < 0.01) {
            toast(`Llama is loading... ${(progress * 100).toFixed(0)}%`);
          }
        });
        setLlamaChat(() => chatPipeline);
        setIsLlamaLoading(false);
        toast.success("Llama is ready to slay 🦙🔥");
      } catch (e) {
        console.error("Failed to load Llama model:", e);
        toast.error("Failed to load Llama model for local AI responses.");
        setIsLlamaLoading(false);
      }
    })();

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      const femaleVoice = availableVoices.find(
        (voice) =>
          voice.name.includes("female") ||
          voice.name.includes("Female") ||
          voice.name.includes("girl") ||
          voice.name.includes("Girl")
      );
      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
      } else if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]);
      }
    };
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    setTimeout(() => {
      const welcomeMessage = messages[0].content;
      speakMessage(welcomeMessage);
    }, 1000);

    return () => {
      if (synth) {
        synth.cancel();
      }
    };
    // eslint-disable-next-line
  }, []);

  // TTS
  const speakMessage = (text: string) => {
    if (!selectedVoice || isMuted) return;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.pitch = 1.1;
    utterance.rate = 1.0;
    synth.speak(utterance);
  };

  // Send message
  const handleSendMessage = async () => {
    if (!input.trim() || isLlamaLoading) {
      toast("Hold up, AI is still booting up...", { duration: 1500 });
      return;
    }
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    try {
      const botResponseText = await callLlama(llamaChat, userMessage.content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setTimeout(() => {
        speakMessage(botResponseText);
      }, 100);
    } catch (error) {
      console.error("Error handling message:", error);
      toast.error("Failed to get a response from the AI. Try again?");
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "😭 Sorry, my AI brain flopped. Try again in a sec?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleMute = () => {
    if (!isMuted) synth.cancel();
    setIsMuted((muted) => !muted);
    toast.info(isMuted ? "Voice enabled" : "Voice muted");
  };

  return {
    messages,
    input,
    setInput,
    isTyping,
    isLlamaLoading,
    isMuted,
    voices,
    selectedVoice,
    setSelectedVoice,
    handleSendMessage,
    toggleMute,
  };
};
