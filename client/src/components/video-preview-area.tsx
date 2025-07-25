import { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { useVideoStore } from "@/stores/video-store";

export default function VideoPreviewArea() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [volume, setVolume] = useState([80]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const { 
    currentTime, 
    isPlaying, 
    duration, 
    setCurrentTime, 
    setIsPlaying, 
    videoUrl, 
    currentProject 
  } = useVideoStore();

  // Sync video with playback state
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Update time when video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => {
      if (video.duration && duration !== video.duration) {
        // Update duration in store if needed
      }
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [setCurrentTime, duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const skipTime = (seconds: number) => {
    const newTime = Math.max(0, Math.min(currentTime + seconds, videoRef.current?.duration || duration || 347));
    handleSeek(newTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const actualDuration = videoRef.current?.duration || duration || 347;

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Video Preview */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl gradient-glass border-0 shadow-xl-custom overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-black aspect-video flex items-center justify-center relative group">
              {videoUrl ? (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full h-full object-contain"
                  onLoadedMetadata={() => {
                    if (videoRef.current?.duration) {
                      // Duration will be handled by useEffect
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full gradient-secondary flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-primary animate-glow">
                      <Play className="text-white w-12 h-12" />
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-4">
                      {currentProject?.name || "Ready to Edit"}
                    </h3>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                      Your video preview will appear here. Upload a video to get started with professional editing.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Enhanced Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center space-x-6">
                  {/* Main Playback Controls */}
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => skipTime(-10)}
                      className="text-white hover:text-primary hover:bg-white/10 rounded-xl w-12 h-12"
                    >
                      <SkipBack className="w-5 h-5" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="lg" 
                      onClick={handlePlayPause}
                      className="text-white hover:text-primary hover:bg-white/10 w-16 h-16 rounded-2xl gradient-primary shadow-primary"
                    >
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => skipTime(10)}
                      className="text-white hover:text-primary hover:bg-white/10 rounded-xl w-12 h-12"
                    >
                      <SkipForward className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  {/* Progress Bar - takes remaining space */}
                  <div className="flex-1 mx-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-white text-sm font-medium min-w-[50px]">
                        {formatTime(currentTime)}
                      </span>
                      <div className="flex-1 relative">
                        <div 
                          className="w-full h-2 bg-white/20 rounded-full cursor-pointer"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const percentage = x / rect.width;
                            const newTime = percentage * actualDuration;
                            handleSeek(newTime);
                          }}
                        >
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-150"
                            style={{ width: `${(currentTime / actualDuration) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-white text-sm font-medium min-w-[50px]">
                        {formatTime(actualDuration)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Secondary Controls */}
                  <div className="flex items-center space-x-4">
                    {/* Volume Control */}
                    <div className="flex items-center space-x-2">
                      <Volume2 className="text-white w-5 h-5" />
                      <Slider
                        value={volume}
                        onValueChange={(value) => {
                          setVolume(value);
                          if (videoRef.current) {
                            videoRef.current.volume = value[0] / 100;
                          }
                        }}
                        max={100}
                        step={1}
                        className="w-24"
                      />
                    </div>
                    
                    {/* Utility Buttons */}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-white hover:text-primary hover:bg-white/10 rounded-xl"
                      onClick={() => handleSeek(0)}
                    >
                      <RotateCcw className="w-5 h-5" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-white hover:text-primary hover:bg-white/10 rounded-xl"
                      onClick={handleFullscreen}
                    >
                      <Maximize className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Preview Controls */}
      <div className="p-4 border-t border-border/20 gradient-glass">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="gradient-glass border-primary/30">
              Reset View
            </Button>
            <Button variant="outline" size="sm" className="gradient-glass border-primary/30">
              Fit to Screen
            </Button>
            <div className="text-sm text-muted-foreground">
              Resolution: 1920×1080 • 29.97 FPS
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-sm text-muted-foreground">
              Preview Quality:
            </div>
            <Button variant="outline" size="sm" className="gradient-glass border-primary/30">
              High
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}