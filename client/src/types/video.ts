export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
  confidence?: number;
  isDeleted?: boolean;
  isFiller?: boolean;
}

export interface CutSegment {
  start: number;
  end: number;
  type: "silence" | "filler" | "manual";
}

export interface VideoSettings {
  showCaptions: boolean;
  cropMode: "16:9" | "9:16" | "1:1";
  captionStyle: "youtube" | "tiktok" | "instagram" | "custom";
  fontSize: number;
  captionPosition: "top" | "middle" | "bottom";
}

export type ProcessingStep = "uploading" | "extracting" | "transcribing" | "cleaning" | "ready";

export interface ProcessingState {
  step: ProcessingStep;
  progress: number;
  message: string;
}
