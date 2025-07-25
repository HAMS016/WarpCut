import { Scissors, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Timeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Waveform visualization */}
          <div className="bg-muted rounded-xl p-4 h-24 flex items-end justify-center space-x-1">
            {/* Mock waveform bars */}
            {Array.from({ length: 50 }, (_, i) => {
              const height = Math.random() * 80 + 20;
              const isRemoved = i === 15 || i === 28 || i === 35;
              return (
                <div
                  key={i}
                  className={`waveform-bar rounded-t ${
                    isRemoved ? 'bg-destructive/40' : 'bg-primary'
                  }`}
                  style={{ height: `${height}%`, width: '3px' }}
                  title={isRemoved ? 'Removed segment' : undefined}
                />
              );
            })}
          </div>
          
          {/* Timeline controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Scissors className="w-4 h-4 mr-2" />
                Split
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Original: 5:47 → Edited: 4:32 (21% shorter)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
