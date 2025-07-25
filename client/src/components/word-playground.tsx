import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Word Playground</CardTitle>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Info className="text-primary w-4 h-4" />
            <span>Click words to delete them</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Transcript with clickable words */}
        <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
          <div className="flex flex-wrap gap-1">
            {transcript.map((word, index) => (
              <span
                key={index}
                className={`transcript-word px-2 py-1 rounded cursor-pointer transition-all ${
                  word.isDeleted
                    ? word.isFiller
                      ? 'bg-destructive/20 hover:bg-destructive/30 line-through text-destructive'
                      : 'bg-destructive/20 hover:bg-destructive/30 line-through'
                    : word.isFiller
                      ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
                      : 'bg-muted hover:bg-muted/70'
                }`}
                onClick={() => toggleWordDeletion(index)}
              >
                {word.text}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="inline-block w-3 h-3 bg-destructive/20 rounded mr-2"></span>
            {deletedFillerWords} filler words detected and removed
          </div>
          <Button variant="outline" size="sm">
            Restore All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
