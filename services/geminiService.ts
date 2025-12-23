
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getVideoSummary(videoUrl: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `這是一個 YouTube 網址：${videoUrl}。請根據這個網址（如果能獲取資訊）或這類網址常見的內容，用繁體中文提供一個簡短的一句話介紹，說明這支影片可能在講什麼。`,
      config: {
        temperature: 0.7,
        tools: [{ googleSearch: {} }]
      }
    });
    return response.text || "無法獲取影片摘要。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI 暫時無法分析此連結。";
  }
}
