
export interface VideoSource {
  title: string;
  uri: string;
}

export interface VideoMetadata {
  id: string;
  title: string;
  thumbnailUrl: string;
  author: string;
  duration: string;
  aiSummary?: string;
  sources?: VideoSource[];
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
