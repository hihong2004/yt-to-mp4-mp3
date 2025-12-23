
import { GoogleGenAI } from "@google/genai";

export interface SummaryResult {
  text: string;
  sources: { title: string; uri: string }[];
}

export async function getVideoSummary(videoUrl: string): Promise<SummaryResult> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `這是一個 YouTube 網址：${videoUrl}。請根據這個網址內容（使用搜尋工具獲取），用繁體中文提供一個約 50 字的精彩介紹。`,
      config: {
        temperature: 0.7,
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "無法獲取影片摘要。";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({
        title: chunk.web?.title || '參考來源',
        uri: chunk.web?.uri || ''
      }))
      .filter((s: any) => s.uri) || [];

    return { text, sources };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { 
      text: "AI 暫時無法分析此連結，請確認網址是否正確或稍後再試。", 
      sources: [] 
    };
  }
}
