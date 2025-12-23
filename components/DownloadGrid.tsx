
import React, { useState } from 'react';
import { DownloadFormat, QualityOption } from '../types';

interface DownloadGridProps {
  videoId: string;
}

const MP4_QUALITIES: QualityOption[] = [
  { label: '1080p (Full HD)', size: '124 MB', quality: 'high' },
  { label: '720p (HD)', size: '68 MB', quality: 'mid' },
  { label: '480p (SD)', size: '32 MB', quality: 'low' },
];

const MP3_QUALITIES: QualityOption[] = [
  { label: '320 kbps (Extreme)', size: '12 MB', quality: 'high' },
  { label: '256 kbps (High)', size: '9 MB', quality: 'mid' },
  { label: '128 kbps (Standard)', size: '4.5 MB', quality: 'low' },
];

export const DownloadGrid: React.FC<DownloadGridProps> = ({ videoId }) => {
  const [activeTab, setActiveTab] = useState<DownloadFormat>(DownloadFormat.MP4);
  const [downloadingLabel, setDownloadingLabel] = useState<string | null>(null);

  const options = activeTab === DownloadFormat.MP4 ? MP4_QUALITIES : MP3_QUALITIES;

  const handleDownload = (option: QualityOption) => {
    setDownloadingLabel(option.label);
    
    // Simulate progress and completion
    setTimeout(() => {
      setDownloadingLabel(null);
      const blob = new Blob(["模擬文件內容"], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `TubeFlow_Demo_${option.label}.${activeTab.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 2000);
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
          MP4 影片
        </button>
        <button
          onClick={() => setActiveTab(DownloadFormat.MP3)}
          className={`flex-1 md:w-40 py-2.5 px-6 rounded-lg font-bold text-sm transition-all ${
            activeTab === DownloadFormat.MP3 ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-gray-400 hover:text-white'
          }`}
        >
          MP3 音訊
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.label}
            disabled={!!downloadingLabel}
            onClick={() => handleDownload(option)}
            className="relative overflow-hidden group p-6 glass rounded-2xl border border-white/5 hover:border-red-500/30 transition-all text-left disabled:opacity-80"
          >
            {downloadingLabel === option.label && (
              <div className="absolute bottom-0 left-0 h-1 bg-red-500 animate-progress"></div>
            )}
            
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
              <span className="text-[10px] font-bold text-gray-500 uppercase">{option.size}</span>
            </div>

            <div className="font-bold text-lg mb-1 group-hover:text-red-400 transition-colors">
              {option.label}
            </div>
            <div className="text-[10px] text-gray-500 tracking-widest uppercase">
              {activeTab} Format
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-bold">
              {downloadingLabel === option.label ? (
                <span className="text-red-400 flex items-center gap-2">
                  <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  模擬下載中...
                </span>
              ) : (
                <span className="text-gray-400 group-hover:text-white transition-colors">立即下載</span>
              )}
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${downloadingLabel === option.label ? 'translate-y-1' : 'group-hover:translate-y-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </button>
        ))}
      </div>
      <p className="text-[10px] text-center text-gray-600 italic">
        * 註：受限於 YouTube 政策與瀏覽器安全限制，此版本下載功能僅為演示(模擬生成文件)。
      </p>
    </div>
  );
};
