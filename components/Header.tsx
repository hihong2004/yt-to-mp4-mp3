
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-16">
      <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-400 shadow-lg shadow-red-500/20">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      </div>
      <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
        TubeFlow
      </h1>
      <p className="text-lg text-gray-400 max-w-lg mx-auto">
        極速解析 YouTube 影片資訊，支援多種音質與畫質下載選項。
      </p>
    </header>
  );
};
