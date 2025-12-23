
import React, { useState } from 'react';
import { Header } from './components/Header';
import { URLInput } from './components/URLInput';
import { VideoPreview } from './components/VideoPreview';
import { DownloadGrid } from './components/DownloadGrid';
import { VideoMetadata } from './types';
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
      const summaryResult = await getVideoSummary(url);
      
      setVideoData({
        id,
        title: "影片資訊解析完成",
        thumbnailUrl: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
        author: "YouTube Creator",
        duration: "00:00",
        aiSummary: summaryResult.text,
        sources: summaryResult.sources
      });
    } catch (err) {
      setError("解析過程發生錯誤，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-gray-100 pb-20">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Header />
        
        <main className="space-y-12">
          <URLInput onExtract={handleUrlSubmit} loading={loading} />

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-6 py-4 rounded-2xl text-center">
              {error}
            </div>
          )}

          {videoData && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-12">
              <VideoPreview metadata={videoData} />
              <div className="pt-4">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-red-500 rounded-full"></span>
                  下載選項
                </h3>
                <DownloadGrid videoId={videoData.id} />
              </div>
            </div>
          )}

          {!videoData && !loading && !error && (
            <div className="text-center text-gray-600 py-32 opacity-40">
              <div className="text-6xl mb-6">🔗</div>
              <p className="text-xl">請輸入 YouTube 網址開始體驗</p>
            </div>
          )}
        </main>

        <footer className="mt-20 pt-10 border-t border-white/5 text-center text-gray-700 text-xs">
          <p>&copy; 2024 TubeFlow Studio. AI Powered Metadata Extraction.</p>
        </footer>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <div className="glass px-4 py-2 rounded-full border border-white/10 shadow-2xl">
          <span className="text-xs text-gray-400 font-semibold tracking-wide">作者：picachu huang</span>
        </div>
      </div>
    </div>
  );
};

export default App;
