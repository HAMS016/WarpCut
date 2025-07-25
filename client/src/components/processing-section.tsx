import { useEffect } from "react";
import { Wand2, CheckCircle, Loader2, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useVideoStore } from "@/stores/video-store";

export default function ProcessingSection() {
  const { processingState } = useVideoStore();

  if (!processingState) return null;

  const steps = [
    { key: 'extracting', label: 'Audio Extracted', icon: CheckCircle },
    { key: 'transcribing', label: 'Transcribing', icon: processingState.step === 'transcribing' ? Loader2 : processingState.progress > 40 ? CheckCircle : Circle },
    { key: 'cleaning', label: 'Cleaning', icon: processingState.step === 'cleaning' ? Loader2 : processingState.progress > 80 ? CheckCircle : Circle }
  ];

  return (
    <div className="animate-fade-in">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Wand2 className="text-primary w-6 h-6 animate-pulse" />
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mb-4">
            AI is Working Its Magic
          </h3>
          <p className="text-muted-foreground mb-8">
            Transcribing speech, removing silence, and cleaning up filler words...
          </p>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <Progress value={processingState.progress} className="h-3 mb-2" />
            <p className="text-sm text-muted-foreground">
              Processing: <span className="font-medium">{processingState.message}</span>
            </p>
          </div>

          {/* Processing Steps */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-sm">
            {steps.map((step, index) => {
              const isActive = processingState.step === step.key;
              const isComplete = processingState.progress > (index + 1) * 30;
              const Icon = step.icon;
              
              return (
                <div key={step.key} className="flex flex-col items-center space-y-2">
                  <Icon 
                    className={`w-5 h-5 ${
                      isComplete 
                        ? 'text-green-500' 
                        : isActive 
                          ? 'text-primary animate-spin' 
                          : 'text-muted-foreground'
                    }`} 
                  />
                  <span className={`text-xs ${
                    isComplete || isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
