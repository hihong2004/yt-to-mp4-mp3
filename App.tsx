
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { URLInput } from './components/URLInput';
import { VideoPreview } from './components/VideoPreview';
import { DownloadGrid } from './components/DownloadGrid';
import { VideoMetadata, DownloadFormat } from './types';
import { getVideoSummary } from './services/geminiService';

const App: React.FC = () => {
  const [videoData, setVideoData] = useState<VideoMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleUrlSubmit = async (url: string) => {
    const id = extractVideoId(url);
    if (!id) {
      setError("請輸入有效的 YouTube 網址");
      setVideoData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // In a real app, we'd fetch this from a proxy or API. 
      // Here we simulate the metadata fetch and use Gemini for insights.
      const summary = await getVideoSummary(url);
      
      setVideoData({
        id,
        title: "獲取中的影片內容...", // Simplified as real title requires backend/Yt-API
        thumbnailUrl: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
        author: "YouTube Creator",
        duration: "00:00",
        aiSummary: summary
      });
    } catch (err) {
      setError("無法解析此網址，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <Header />
      
      <main className="space-y-12">
        <URLInput onExtract={handleUrlSubmit} loading={loading} />

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-center">
            {error}
          </div>
        )}

        {videoData && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
            <VideoPreview metadata={videoData} />
            <DownloadGrid videoId={videoData.id} />
          </div>
        )}

        {!videoData && !loading && !error && (
          <div className="text-center text-gray-500 py-20">
            <div className="mb-4 text-4xl">🚀</div>
            <p>輸入網址即可開始解析與下載</p>
          </div>
        )}
      </main>

      <footer className="mt-20 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
        <p>&copy; 2024 TubeFlow. 純前端展示版本 - 整合 Gemini AI 解析</p>
      </footer>
    </div>
  );
};

export default App;
