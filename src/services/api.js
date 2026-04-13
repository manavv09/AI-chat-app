import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

export const fetchAIResponse = async (userMessage, historyStr = "", onChunk) => {
  if (!genAI) {
    return "The Gemini API key is missing. Please add VITE_GEMINI_API_KEY in your .env file and restart the development server.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    // We provide history context by prepending it to the prompt
    // In a fully robust system, you'd use startChat instead.
    const prompt = `Context of conversation so far:\n${historyStr}\nUser: ${userMessage}`;
    const result = await model.generateContentStream(prompt);
    
    let fullText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      if (onChunk) {
        onChunk(chunkText);
      }
    }
    return fullText;
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    return "I encountered an error connecting to the AI. Please verify your API key and network connection.";
  }
};
