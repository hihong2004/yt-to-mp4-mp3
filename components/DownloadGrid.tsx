
import React, { useState } from 'react';
import { DownloadFormat, QualityOption } from '../types';

interface DownloadGridProps {
  videoId: string;
}

const MP4_QUALITIES: QualityOption[] = [
  { label: '1080p (Full HD)', size: '124 MB', quality: 'high' },
  { label: '720p (HD)', size: '68 MB', quality: 'mid' },
  { label: '480p (SD)', size: '32 MB', quality: 'low' },
  { label: '360p', size: '18 MB', quality: 'low' },
];

const MP3_QUALITIES: QualityOption[] = [
  { label: '320 kbps (Extreme)', size: '12 MB', quality: 'high' },
  { label: '256 kbps (High)', size: '9 MB', quality: 'mid' },
  { label: '128 kbps (Standard)', size: '4.5 MB', quality: 'low' },
  { label: '64 kbps (Eco)', size: '2 MB', quality: 'low' },
];

export const DownloadGrid: React.FC<DownloadGridProps> = ({ videoId }) => {
  const [activeTab, setActiveTab] = useState<DownloadFormat>(DownloadFormat.MP4);
  const [downloadingLabel, setDownloadingLabel] = useState<string | null>(null);

  const options = activeTab === DownloadFormat.MP4 ? MP4_QUALITIES : MP3_QUALITIES;

  const handleDownload = (option: QualityOption) => {
    setDownloadingLabel(option.label);
    // Simulate download delay
    setTimeout(() => {
      setDownloadingLabel(null);
      alert(`模擬下載啟動：${option.label} ${activeTab} 格式`);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 w-full md:w-max">
        <button
          onClick={() => setActiveTab(DownloadFormat.MP4)}
          className={`flex-1 md:w-32 py-2 px-6 rounded-lg font-bold transition-all ${
            activeTab === DownloadFormat.MP4 ? 'bg-red-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          MP4 影片
        </button>
        <button
          onClick={() => setActiveTab(DownloadFormat.MP3)}
          className={`flex-1 md:w-32 py-2 px-6 rounded-lg font-bold transition-all ${
            activeTab === DownloadFormat.MP3 ? 'bg-red-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          MP3 音訊
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.label}
            disabled={!!downloadingLabel}
            onClick={() => handleDownload(option)}
            className="flex items-center justify-between p-5 glass rounded-2xl hover:bg-white/10 transition-all border border-transparent hover:border-red-500/30 group text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div>
              <div className="font-bold text-lg mb-1">{option.label}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">{option.size} • .{activeTab.toLowerCase()}</div>
            </div>
            
            <div className="flex items-center">
              {downloadingLabel === option.label ? (
                <div className="flex items-center text-red-400 font-medium">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  處理中
                </div>
              ) : (
                <div className="bg-white/10 p-3 rounded-full group-hover:bg-red-500 group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
