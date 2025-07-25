import { useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useVideoStore } from "@/stores/video-store";

export default function VideoPlayer() {
  const { currentTime, isPlaying, duration, setCurrentTime, setIsPlaying } = useVideoStore();
  const [volume, setVolume] = useState([80]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-black aspect-video flex items-center justify-center relative">
          {/* Mock video frame */}
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="text-white text-center">
              <Play className="w-16 h-16 mb-4 opacity-80 mx-auto" />
              <p className="text-lg">Sample Tech Tutorial Video</p>
              <p className="text-sm text-gray-400">
                {formatTime(currentTime)} / {formatTime(347)}
              </p>
            </div>
          </div>
          
          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handlePlayPause}
                className="text-white hover:text-primary"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              
              <div className="flex-1">
                <Slider
                  value={[progress]}
                  onValueChange={([value]) => setCurrentTime((value / 100) * 347)}
                  max={100}
                  step={0.1}
                  className="cursor-pointer"
                />
              </div>
              
              <span className="text-white text-sm min-w-[80px]">
                {formatTime(currentTime)} / {formatTime(347)}
              </span>
              
              <div className="flex items-center space-x-2">
                <Volume2 className="text-white w-4 h-4" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
