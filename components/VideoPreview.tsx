
import React from 'react';
import { VideoMetadata } from '../types';

interface VideoPreviewProps {
  metadata: VideoMetadata;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ metadata }) => {
  return (
    <div className="glass rounded-3xl overflow-hidden shadow-2xl border border-white/5">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-5/12 relative group bg-gray-900">
          <img
            src={metadata.thumbnailUrl}
            alt="Thumbnail"
            className="w-full h-full object-cover aspect-video md:aspect-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 bg-red-600 px-2 py-1 rounded text-[10px] font-bold tracking-tighter uppercase">
            Live Preview
          </div>
        </div>
        
        <div className="md:w-7/12 p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-gray-400 uppercase">YouTube</span>
            <span className="text-gray-500 text-xs tracking-wider">ID: {metadata.id}</span>
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-white leading-snug">
            {metadata.title}
          </h2>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-rose-400 font-bold text-[10px] uppercase tracking-widest">AI 智慧簡介</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                {metadata.aiSummary}
              </p>
              
              {metadata.sources && metadata.sources.length > 0 && (
                <div className="pt-3 border-t border-white/5 mt-3">
                  <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-tight">參考來源：</div>
                  <div className="flex flex-wrap gap-2">
                    {metadata.sources.map((source, i) => (
                      <a 
                        key={i} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors bg-blue-400/10 px-2 py-1 rounded"
                      >
                        {source.title.substring(0, 20)}...
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
