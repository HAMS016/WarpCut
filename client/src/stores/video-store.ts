import { create } from 'zustand';
import type { VideoProject } from '@shared/schema';
import type { TranscriptSegment, ProcessingState } from '@/types/video';

interface VideoStore {
  // Current project state
  currentProject: VideoProject | null;
  videoFile: File | null;
  videoUrl: string | null;
  
  // Processing state
  processingState: ProcessingState | null;
  
  // Playback state
  currentTime: number;
  isPlaying: boolean;
  duration: number;
  
  // UI state
  activeSection: 'upload' | 'processing' | 'editor';
  showExportModal: boolean;
  
  // Actions
  setCurrentProject: (project: VideoProject | null) => void;
  setVideoFile: (file: File | null) => void;
  setProcessingState: (state: ProcessingState | null) => void;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setDuration: (duration: number) => void;
  setActiveSection: (section: 'upload' | 'processing' | 'editor') => void;
  setShowExportModal: (show: boolean) => void;
  
  // Transcript editing
  toggleWordDeletion: (wordIndex: number) => void;
  updateTranscript: (transcript: TranscriptSegment[]) => void;
}

export const useVideoStore = create<VideoStore>((set, get) => ({
  // Initial state
  currentProject: null,
  videoFile: null,
  videoUrl: null,
  processingState: null,
  currentTime: 0,
  isPlaying: false,
  duration: 0,
  activeSection: 'editor',
  showExportModal: false,
  
  // Actions
  setCurrentProject: (project) => {
    set({ currentProject: project });
    if (project) {
      set({ activeSection: 'editor' });
    }
  },
  
  setVideoFile: (file) => {
    set({ 
      videoFile: file,
      videoUrl: file ? URL.createObjectURL(file) : null
    });
  },
  
  setProcessingState: (state) => set({ processingState: state }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setDuration: (duration) => set({ duration: duration }),
  setActiveSection: (section) => set({ activeSection: section }),
  setShowExportModal: (show) => set({ showExportModal: show }),
  
  toggleWordDeletion: (wordIndex) => {
    const { currentProject } = get();
    if (!currentProject?.transcript) return;
    
    const updatedTranscript = currentProject.transcript.map((segment, index) => 
      index === wordIndex ? { ...segment, isDeleted: !segment.isDeleted } : segment
    );
    
    set({
      currentProject: {
        ...currentProject,
        transcript: updatedTranscript
      }
    });
  },
  
  updateTranscript: (transcript) => {
    const { currentProject } = get();
    if (!currentProject) return;
    
    set({
      currentProject: {
        ...currentProject,
        transcript
      }
    });
  },
}));
