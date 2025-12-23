
import React, { useState } from 'react';

interface URLInputProps {
  onExtract: (url: string) => void;
  loading: boolean;
}

export const URLInput: React.FC<URLInputProps> = ({ onExtract, loading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onExtract(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-rose-400 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
      <div className="relative flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="貼上 YouTube 影片網址，例如：https://www.youtube.com/watch?v=..."
          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-lg outline-none focus:border-red-500/50 transition-all placeholder:text-gray-600"
        />
        <button
          type="submit"
          disabled={loading || !url}
          className="bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-gray-200 disabled:bg-gray-700 disabled:text-gray-500 transition-all flex items-center justify-center min-w-[140px]"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : '開始解析'}
        </button>
      </div>
    </form>
  );
};
