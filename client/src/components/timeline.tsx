import { useState } from "react";
import { Scissors, Trash2, Activity, ZoomIn, ZoomOut, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

export default function Timeline() {
  const [zoomLevel, setZoomLevel] = useState([50]);
  
  const cuts = [
    { id: 1, start: 24, end: 28, type: 'silence', label: 'Silence removed' },
    { id: 2, start: 45, end: 47, type: 'filler', label: 'Um, uh...' },
    { id: 3, start: 89, end: 92, type: 'manual', label: 'Manual cut' },
    { id: 4, start: 156, end: 159, type: 'silence', label: 'Long pause' },
  ];

  const timeMarkers = Array.from({ length: 10 }, (_, i) => i * 30);

  return (
    <Card className="gradient-glass border-0 shadow-xl-custom">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Activity className="text-white w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl text-gradient">Timeline</CardTitle>
              <p className="text-sm text-muted-foreground">Visual editing control</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/30">
              {cuts.length} cuts detected
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Timeline Controls */}
        <div className="flex items-center justify-between p-3 gradient-secondary rounded-xl">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="rounded-lg">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2 min-w-[120px]">
              <span className="text-xs text-muted-foreground">Zoom</span>
              <Slider
                value={zoomLevel}
                onValueChange={setZoomLevel}
                max={100}
                min={10}
                step={10}
                className="w-16"
              />
            </div>
            <Button variant="ghost" size="sm" className="rounded-lg">
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            Timeline: 5:47 total • {cuts.length} edits
          </div>
        </div>

        {/* Enhanced Timeline visualization */}
        <div className="relative gradient-glass rounded-xl h-32 overflow-hidden border border-primary/10 p-4">
          {/* Enhanced Waveform background */}
          <div className="absolute inset-4 flex items-center justify-between">
            {Array.from({ length: 80 }, (_, i) => {
              const height = Math.sin(i * 0.3) * 30 + Math.random() * 40 + 20;
              const opacity = Math.random() * 0.6 + 0.4;
              return (
                <div
                  key={i}
                  className="bg-primary/40 rounded-full transition-all duration-300"
                  style={{
                    width: '2px',
                    height: `${height}%`,
                    opacity: opacity,
                  }}
                />
              );
            })}
          </div>

          {/* Time markers with premium styling */}
          {timeMarkers.map((time) => (
            <div
              key={time}
              className="absolute top-0 bottom-0 border-l border-primary/20"
              style={{ left: `${(time / 300) * 100}%` }}
            >
              <span className="absolute -top-8 -left-6 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg border border-primary/20">
                {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}
              </span>
            </div>
          ))}

          {/* Enhanced Cut segments */}
          {cuts.map((cut) => (
            <div
              key={cut.id}
              className={`absolute top-4 bottom-4 rounded-lg cursor-pointer group transition-all duration-300 hover:scale-105 ${
                cut.type === 'silence' 
                  ? 'bg-red-500/70 hover:bg-red-500/90 border border-red-500' 
                  : cut.type === 'filler' 
                    ? 'bg-yellow-500/70 hover:bg-yellow-500/90 border border-yellow-500' 
                    : 'bg-blue-500/70 hover:bg-blue-500/90 border border-blue-500'
              }`}
              style={{
                left: `${(cut.start / 300) * 100}%`,
                width: `${Math.max(((cut.end - cut.start) / 300) * 100, 2)}%`,
              }}
            >
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background text-foreground text-xs px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap z-10">
                <div className="font-medium">{cut.label}</div>
                <div className="text-muted-foreground">
                  {Math.floor(cut.start / 60)}:{String(cut.start % 60).padStart(2, '0')} - 
                  {Math.floor(cut.end / 60)}:{String(cut.end % 60).padStart(2, '0')}
                </div>
              </div>
            </div>
          ))}

          {/* Enhanced Playhead */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-primary z-20 shadow-lg rounded-full"
            style={{ left: '15%' }}
          >
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full shadow-primary animate-pulse flex items-center justify-center">
              <Play className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>

        {/* Enhanced Cut information */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Detected Cuts</h4>
            <Button variant="outline" size="sm" className="gradient-glass border-primary/30">
              <Scissors className="w-4 h-4 mr-2" />
              Add Cut
            </Button>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {cuts.map((cut) => (
              <div key={cut.id} className="flex items-center justify-between p-4 gradient-glass rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full shadow-sm ${
                    cut.type === 'silence' ? 'bg-red-500' : 
                    cut.type === 'filler' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <div className="font-medium text-foreground">{cut.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.floor(cut.start / 60)}:{String(cut.start % 60).padStart(2, '0')} - {Math.floor(cut.end / 60)}:{String(cut.end % 60).padStart(2, '0')} 
                      <span className="ml-2">({cut.end - cut.start}s saved)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-primary/10">
                    <Play className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-red-500/10 hover:text-red-500">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
