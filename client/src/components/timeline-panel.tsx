import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, ZoomIn, ZoomOut, Scissors, Volume2, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useVideoStore } from "@/stores/video-store";

export default function TimelinePanel() {
  const [zoomLevel, setZoomLevel] = useState([50]);
  const [currentTime, setCurrentTime] = useState(45);
  const { isPlaying, setIsPlaying } = useVideoStore();
  
  const totalDuration = 347; // 5:47 in seconds
  const timelineScale = zoomLevel[0] / 50; // 1x at 50%

  // Video track
  const videoClips = [
    { id: 1, start: 0, end: 120, name: "Intro Segment", color: "bg-blue-500" },
    { id: 2, start: 120, end: 240, name: "Main Content", color: "bg-green-500" },
    { id: 3, start: 240, end: 347, name: "Conclusion", color: "bg-purple-500" },
  ];

  // Audio tracks
  const audioTracks = [
    { id: 1, start: 0, end: 347, name: "Main Audio", level: 0.8, color: "bg-orange-500" },
    { id: 2, start: 30, end: 60, name: "Intro Music", level: 0.3, color: "bg-pink-500" },
  ];

  // Subtitle track
  const subtitleSegments = [
    { id: 1, start: 5, end: 25, text: "Welcome to our tutorial" },
    { id: 2, start: 30, end: 55, text: "Today we'll learn about video editing" },
    { id: 3, start: 60, end: 90, text: "Let's start with the basics" },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPositionPercent = (time: number) => {
    return (time / totalDuration) * 100;
  };

  const getWidthPercent = (duration: number) => {
    return (duration / totalDuration) * 100;
  };

  const timeMarkers = [];
  for (let i = 0; i <= totalDuration; i += 30) {
    timeMarkers.push(i);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Timeline Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border/20">
        <div className="flex items-center space-x-4">
          {/* Playback Controls */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-10 h-10 p-0 gradient-primary text-white"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          {/* Time Display */}
          <div className="text-sm font-mono bg-muted px-3 py-1 rounded">
            {formatTime(currentTime)} / {formatTime(totalDuration)}
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Slider
              value={zoomLevel}
              onValueChange={setZoomLevel}
              max={200}
              min={25}
              step={25}
              className="w-20"
            />
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Badge variant="secondary" className="text-xs">
              {zoomLevel[0]}%
            </Badge>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Scissors className="w-4 h-4 mr-2" />
            Split
          </Button>
          <Button variant="outline" size="sm" className="gradient-glass border-primary/30">
            Export
          </Button>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 overflow-auto">
        <div className="relative" style={{ width: `${100 * timelineScale}%`, minWidth: '100%' }}>
          {/* Time Ruler */}
          <div className="h-8 border-b border-border/20 relative bg-muted/30">
            {timeMarkers.map((time) => (
              <div
                key={time}
                className="absolute top-0 bottom-0 border-l border-border/40"
                style={{ left: `${getPositionPercent(time)}%` }}
              >
                <span className="absolute top-1 left-1 text-xs text-muted-foreground font-mono">
                  {formatTime(time)}
                </span>
              </div>
            ))}
          </div>

          {/* Video Track */}
          <div className="h-16 border-b border-border/20 relative bg-background">
            <div className="flex items-center h-full">
              <div className="w-20 px-3 text-sm font-medium border-r border-border/20 bg-muted/50 h-full flex items-center">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Video</span>
                </div>
              </div>
              <div className="flex-1 relative h-full">
                {videoClips.map((clip) => (
                  <div
                    key={clip.id}
                    className={`absolute top-1 bottom-1 ${clip.color} opacity-80 rounded cursor-pointer group hover:opacity-100 transition-all duration-200`}
                    style={{
                      left: `${getPositionPercent(clip.start)}%`,
                      width: `${getWidthPercent(clip.end - clip.start)}%`,
                    }}
                  >
                    <div className="p-2 h-full flex items-center">
                      <span className="text-white text-xs font-medium truncate">
                        {clip.name}
                      </span>
                    </div>
                    {/* Resize handles */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white opacity-0 group-hover:opacity-100 cursor-w-resize"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white opacity-0 group-hover:opacity-100 cursor-e-resize"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Audio Track 1 */}
          <div className="h-12 border-b border-border/20 relative bg-background">
            <div className="flex items-center h-full">
              <div className="w-20 px-3 text-sm font-medium border-r border-border/20 bg-muted/50 h-full flex items-center">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4" />
                  <span className="text-xs">Audio 1</span>
                </div>
              </div>
              <div className="flex-1 relative h-full">
                {audioTracks.map((track) => (
                  <div
                    key={track.id}
                    className={`absolute top-1 bottom-1 ${track.color} opacity-70 rounded cursor-pointer hover:opacity-90 transition-all duration-200`}
                    style={{
                      left: `${getPositionPercent(track.start)}%`,
                      width: `${getWidthPercent(track.end - track.start)}%`,
                    }}
                  >
                    <div className="p-1 h-full flex items-center">
                      {/* Audio waveform representation */}
                      <div className="flex items-center space-x-0.5 w-full h-full">
                        {Array.from({ length: 20 }, (_, i) => (
                          <div
                            key={i}
                            className="bg-white rounded-full opacity-80"
                            style={{
                              width: '1px',
                              height: `${Math.random() * track.level * 100}%`,
                              minHeight: '2px',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subtitle Track */}
          <div className="h-10 border-b border-border/20 relative bg-background">
            <div className="flex items-center h-full">
              <div className="w-20 px-3 text-sm font-medium border-r border-border/20 bg-muted/50 h-full flex items-center">
                <span className="text-xs">Subtitles</span>
              </div>
              <div className="flex-1 relative h-full">
                {subtitleSegments.map((segment) => (
                  <div
                    key={segment.id}
                    className="absolute top-1 bottom-1 bg-yellow-500 opacity-70 rounded cursor-pointer hover:opacity-90 transition-all duration-200"
                    style={{
                      left: `${getPositionPercent(segment.start)}%`,
                      width: `${getWidthPercent(segment.end - segment.start)}%`,
                    }}
                  >
                    <div className="p-1 h-full flex items-center">
                      <span className="text-black text-xs truncate">
                        {segment.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Playhead */}
          <div
            className="absolute top-8 bottom-0 w-0.5 bg-red-500 z-10 pointer-events-none"
            style={{ left: `${getPositionPercent(currentTime)}%` }}
          >
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}