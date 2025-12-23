
export interface VideoMetadata {
  id: string;
  title: string;
  thumbnailUrl: string;
  author: string;
  duration: string;
  aiSummary?: string;
}

export enum DownloadFormat {
  MP4 = 'MP4',
  MP3 = 'MP3'
}

export interface QualityOption {
  label: string;
  size: string;
  quality: string;
}

export interface DownloadTask {
  id: string;
  label: string;
  format: DownloadFormat;
  progress: number;
  status: 'pending' | 'downloading' | 'completed';
}
