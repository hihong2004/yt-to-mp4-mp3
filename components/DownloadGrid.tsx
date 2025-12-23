
import React, { useState } from 'react';
import { DownloadFormat, QualityOption } from '../types';

interface DownloadGridProps {
  videoId: string;
}

const MP4_QUALITIES: QualityOption[] = [
  { label: '1080p (Full HD)', size: '高清畫質', quality: '1080' },
  { label: '720p (HD)', size: '標準高清', quality: '720' },
  { label: '480p (SD)', size: '一般畫質', quality: '480' },
];

const MP3_QUALITIES: QualityOption[] = [
  { label: '320 kbps', size: '極高音質', quality: '320' },
  { label: '256 kbps', size: '高品質', quality: '256' },
  { label: '128 kbps', size: '標準音質', quality: '128' },
];

export const DownloadGrid: React.FC<DownloadGridProps> = ({ videoId }) => {
  const [activeTab, setActiveTab] = useState<DownloadFormat>(DownloadFormat.MP4);
  const [downloadingLabel, setDownloadingLabel] = useState<string | null>(null);

  const options = activeTab === DownloadFormat.MP4 ? MP4_QUALITIES : MP3_QUALITIES;

  const handleDownload = (option: QualityOption) => {
    setDownloadingLabel(option.label);
    
    // 使用 Loader.to 的外部轉檔服務 API
    // 這樣可以繞過 CORS 限制並提供真實的下載內容
    const format = activeTab === DownloadFormat.MP3 ? 'mp3' : option.quality;
    const downloadUrl = `https://loader.to/api/button/?url=https://www.youtube.com/watch?v=${videoId}&f=${format}`;

    // 模擬 1 秒的準備時間後跳轉至轉檔頁面
    setTimeout(() => {
      setDownloadingLabel(null);
      window.open(downloadUrl, '_blank');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 w-full md:w-max">
        <button
          onClick={() => setActiveTab(DownloadFormat.MP4)}
          className={`flex-1 md:w-40 py-2.5 px-6 rounded-lg font-bold text-sm transition-all ${
            activeTab === DownloadFormat.MP4 ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-gray-400 hover:text-white'
          }`}
        >
          MP4 影片下載
        </button>
        <button
          onClick={() => setActiveTab(DownloadFormat.MP3)}
          className={`flex-1 md:w-40 py-2.5 px-6 rounded-lg font-bold text-sm transition-all ${
            activeTab === DownloadFormat.MP3 ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-gray-400 hover:text-white'
          }`}
        >
          MP3 音訊提取
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.label}
            disabled={!!downloadingLabel}
            onClick={() => handleDownload(option)}
            className="relative overflow-hidden group p-6 glass rounded-2xl border border-white/5 hover:border-red-500/30 transition-all text-left disabled:opacity-80 shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${activeTab === DownloadFormat.MP4 ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {activeTab === DownloadFormat.MP4 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 3v9.13a4.499 4.499 0 00-3.5.87 4.5 4.5 0 107-3.616V5.48l9-1.8v3.58a4.499 4.499 0 00-3.5.87 4.5 4.5 0 107-3.616V3z" />
                  </svg>
                )}
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{option.size}</span>
            </div>

            <div className="font-bold text-lg mb-1 group-hover:text-red-400 transition-colors">
              {option.label}
            </div>
            <div className="text-[10px] text-gray-500 tracking-widest uppercase">
              點擊前往外部轉檔頁面
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-bold">
              {downloadingLabel === option.label ? (
                <span className="text-red-400 flex items-center gap-2">
                  <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  準備中...
                </span>
              ) : (
                <span className="text-gray-400 group-hover:text-white transition-colors">立即下載</span>
              )}
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${downloadingLabel === option.label ? 'translate-y-1' : 'group-hover:translate-y-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </button>
        ))}
      </div>
      <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
        <div className="text-xl mt-0.5">💡</div>
        <p className="text-[11px] text-yellow-200/80 leading-relaxed">
          由於 YouTube 版權保護，我們使用穩定的外部轉檔引擎為您提供真實文件。點擊按鈕後會開啟轉檔下載頁面，請在該頁面點擊「Download」按鈕即可保存檔案到您的裝置。
        </p>
      </div>
    </div>
  );
};
