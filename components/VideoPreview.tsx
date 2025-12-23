
import React from 'react';
import { VideoMetadata } from '../types';

interface VideoPreviewProps {
  metadata: VideoMetadata;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ metadata }) => {
  return (
    <div className="glass rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
      <div className="md:w-1/2 relative group">
        <img
          src={metadata.thumbnailUrl}
          alt="Thumbnail"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
        <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-xs font-mono">
          HD PREVIEW
        </div>
      </div>
      <div className="md:w-1/2 p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4 line-clamp-2 leading-tight">
          {metadata.title}
        </h2>
        
        <div className="flex items-center gap-2 mb-6 text-gray-400">
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xs">
            YT
          </div>
          <span className="font-medium">{metadata.author}</span>
        </div>

        {metadata.aiSummary && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 italic text-gray-300 text-sm leading-relaxed">
            <span className="text-rose-400 font-bold not-italic text-xs block mb-1">AI 影片解析：</span>
            "{metadata.aiSummary}"
          </div>
        )}
      </div>
    </div>
  );
};
