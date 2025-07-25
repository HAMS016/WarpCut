import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Maximize, SkipBack, SkipForward } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useVideoStore } from "@/stores/video-store";

export default function VideoPlayer() {
  const { currentTime, isPlaying, duration, setCurrentTime, setIsPlaying, videoUrl, currentProject } = useVideoStore();
  const [volume, setVolume] = useState([80]);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      if (video.duration) {
        // Update store with actual duration
      }
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [setCurrentTime]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = ([value]: number[]) => {
    const newTime = (value / 100) * (videoRef.current?.duration || 347);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const skipTime = (seconds: number) => {
    const newTime = Math.max(0, Math.min(currentTime + seconds, videoRef.current?.duration || 347));
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const actualDuration = videoRef.current?.duration || duration || 347;
  const progress = actualDuration > 0 ? (currentTime / actualDuration) * 100 : 0;

  return (
    <Card className="gradient-glass border-0 shadow-xl-custom overflow-hidden">
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
                <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-primary">
                  <Play className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {currentProject?.name || "Upload a Video"}
                </h3>
                <p className="text-muted-foreground">
                  Your video will appear here once uploaded
                </p>
              </div>
            </div>
          )}
          
          {/* Premium Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center space-x-4">
              {/* Playback Controls */}
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => skipTime(-10)}
                  className="text-white hover:text-primary hover:bg-white/10 rounded-xl"
                >
                  <SkipBack className="w-4 h-4" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handlePlayPause}
                  className="text-white hover:text-primary hover:bg-white/10 w-12 h-12 rounded-xl gradient-primary shadow-primary"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => skipTime(10)}
                  className="text-white hover:text-primary hover:bg-white/10 rounded-xl"
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Progress Bar */}
              <div className="flex-1 mx-4">
                <Slider
                  value={[progress]}
                  onValueChange={handleSeek}
                  max={100}
                  step={0.1}
                  className="cursor-pointer"
                />
              </div>
              
              {/* Time Display */}
              <span className="text-white text-sm font-medium min-w-[100px] text-right">
                {formatTime(currentTime)} / {formatTime(actualDuration)}
              </span>
              
              {/* Volume Control */}
              <div className="flex items-center space-x-2">
                <Volume2 className="text-white w-4 h-4" />
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
                  className="w-20"
                />
              </div>
              
              {/* Fullscreen */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:text-primary hover:bg-white/10 rounded-xl"
                onClick={() => {
                  if (videoRef.current?.requestFullscreen) {
                    videoRef.current.requestFullscreen();
                  }
                }}
              >
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
