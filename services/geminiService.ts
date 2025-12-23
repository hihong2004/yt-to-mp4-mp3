
import { GoogleGenAI } from "@google/genai";

export interface SummaryResult {
  text: string;
  sources: { title: string; uri: string }[];
}

export async function getVideoSummary(videoUrl: string): Promise<SummaryResult> {
  try {
    // 確保獲取有效的 API Key，相容不同的注入方式
    const apiKey = (window as any).process?.env?.API_KEY || process.env.API_KEY || '';
    
    const ai = new GoogleGenAI({ apiKey });
    
    // 使用更明確的指令引導搜尋工具找出具體影片資訊
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `這是一個 YouTube 影片連結：${videoUrl}。請利用搜尋工具找出這支影片的準確標題、作者名稱以及內容大意。最後用繁體中文提供一個約 60 字的精彩且流暢的簡介。`,
      config: {
        temperature: 0.7,
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "AI 目前無法從搜尋結果中生成摘要。";
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
      text: "AI 暫時無法分析此連結內容。可能是因為網址受限或流量過大。您仍可點擊下方按鈕使用真實的下載工具。", 
      sources: [] 
    };
  }
}
