
import { pipeline } from "@huggingface/transformers";


export const llamaModelName = "Xenova/llama-2-7b-chat";

// Prompt builder for Gen Z
export function buildGenZPrompt(userMessage: string) {
  return `You are "Vibe Check Bot", a Gen Z AI therapist bestie. Always reply in a super playful, cheeky, friendly, and highly supportive tone, using lots of Gen Z slang, emojis, and short sentences. Be empathetic and make it fun, even when things are tough.

User: ${userMessage}
Vibe Check Bot:`;
}

// Loads Llama Pipeline
export async function loadLlamaPipeline(progressCb?: (progress: number) => void) {
  const chatPipeline = await pipeline(
    "text-generation",
    llamaModelName,
    { 
      progress_callback: (progressInfo: any) => {
        if (
          progressInfo.status === "progress" && 
          typeof progressInfo?.progress === "number"
        ) {
          if (progressCb) progressCb(progressInfo.progress);
        }
      }
    }
  );
  return chatPipeline;
}

// Calls the Llama pipeline
export async function callLlama(chatPipeline: any, message: string) {
  const inputPrompt = buildGenZPrompt(message);
  const result = await chatPipeline(inputPrompt, {
    max_new_tokens: 64,
    temperature: 0.9,
    top_p: 0.95, 
    repetition_penalty: 1.2,
    stop: ["User:"],
  });
  if (
    Array.isArray(result) &&
    result[0] &&
    result[0].generated_text
  ) {
    const output = result[0].generated_text.replace(inputPrompt, "").trim();
    return output || "Periodt! Anything else on your mind?";
  }
  return "Vibe check complete! (But the AI flopped 🤡)";
}
