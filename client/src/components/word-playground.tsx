import { Info, RotateCcw, Trash2, Eye, EyeOff, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useVideoStore } from "@/stores/video-store";

export default function WordPlayground() {
  const { currentProject, toggleWordDeletion } = useVideoStore();

  // Mock transcript data
  const mockTranscript = [
    { text: "Hello", start: 0, end: 1.2, isDeleted: false, isFiller: false },
    { text: "everyone,", start: 1.2, end: 2.5, isDeleted: false, isFiller: false },
    { text: "welcome", start: 2.5, end: 3.0, isDeleted: false, isFiller: false },
    { text: "to", start: 3.0, end: 3.4, isDeleted: false, isFiller: false },
    { text: "my", start: 3.4, end: 3.8, isDeleted: false, isFiller: false },
    { text: "um", start: 3.8, end: 4.1, isDeleted: true, isFiller: true },
    { text: "coding", start: 4.1, end: 4.8, isDeleted: false, isFiller: false },
    { text: "tutorial.", start: 4.8, end: 5.5, isDeleted: false, isFiller: false },
    { text: "Today", start: 5.5, end: 6.0, isDeleted: false, isFiller: false },
    { text: "we're", start: 6.0, end: 6.4, isDeleted: false, isFiller: false },
    { text: "going", start: 6.4, end: 6.8, isDeleted: false, isFiller: false },
    { text: "to", start: 6.8, end: 7.0, isDeleted: false, isFiller: false },
    { text: "uh", start: 7.0, end: 7.3, isDeleted: true, isFiller: true },
    { text: "build", start: 7.3, end: 7.8, isDeleted: false, isFiller: false },
    { text: "a", start: 7.8, end: 8.0, isDeleted: false, isFiller: false },
    { text: "React", start: 8.0, end: 8.6, isDeleted: false, isFiller: false },
    { text: "application.", start: 8.6, end: 9.5, isDeleted: false, isFiller: false },
  ];

  const transcript = currentProject?.transcript || mockTranscript;
  const deletedFillerWords = transcript.filter(word => word.isFiller && word.isDeleted).length;

  return (
    <Card className="gradient-glass border-0 shadow-xl-custom">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Eye className="text-white w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl text-gradient">Word Playground</CardTitle>
              <p className="text-sm text-muted-foreground">Click words to edit your video</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30">
              <Info className="w-3 h-3 mr-1" />
              Interactive
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Action Bar */}
        <div className="flex items-center justify-between p-3 gradient-secondary rounded-xl">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-muted-foreground">Deleted</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-muted-foreground">Filler Words</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-muted-foreground">Normal</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-xs">
              <Filter className="w-3 h-3 mr-1" />
              Filter
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <RotateCcw className="w-3 h-3 mr-1" />
              Restore All
            </Button>
          </div>
        </div>

        {/* Enhanced Transcript with clickable words */}
        <div className="max-h-80 overflow-y-auto space-y-3 p-4 gradient-glass rounded-xl border border-primary/10">
          <div className="flex flex-wrap gap-2 leading-relaxed">
            {transcript.map((word, index) => (
              <span
                key={index}
                className={`transcript-word px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 font-medium text-sm select-none hover:scale-105 ${
                  word.isDeleted
                    ? word.isFiller
                      ? 'bg-red-500/20 hover:bg-red-500/30 line-through text-red-400 border border-red-500/30'
                      : 'bg-red-500/20 hover:bg-red-500/30 line-through text-red-400 border border-red-500/30'
                    : word.isFiller
                      ? 'bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 border border-yellow-400/30 animate-pulse-slow'
                      : 'bg-blue-500/10 hover:bg-blue-500/20 text-foreground border border-blue-500/20 hover:border-blue-500/40'
                }`}
                onClick={() => toggleWordDeletion(index)}
                title={word.isFiller ? "Filler word - click to remove" : "Click to toggle deletion"}
              >
                {word.text}
                {word.isFiller && !word.isDeleted && (
                  <span className="ml-1 text-xs opacity-60">⚠️</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Statistics and Actions */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Trash2 className="w-4 h-4 text-red-500" />
                <span className="text-muted-foreground">{deletedFillerWords} filler words removed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-green-500" />
                <span className="text-muted-foreground">
                  {transcript.filter(w => !w.isDeleted).length} words remaining
                </span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Estimated time saved: {Math.round(deletedFillerWords * 0.8)}s
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="gradient-glass border-primary/30">
              <EyeOff className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" className="gradient-primary text-white hover:shadow-primary transition-all duration-300">
              <RotateCcw className="w-4 h-4 mr-2" />
              Apply Changes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
