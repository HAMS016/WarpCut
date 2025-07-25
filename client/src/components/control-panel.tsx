import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StyleStudio from "./style-studio";
import { useVideoStore } from "@/stores/video-store";

export default function ControlPanel() {
  const { setShowExportModal } = useVideoStore();

  const quickActions = [
    { icon: "🔇", label: "Remove Silence", action: () => console.log("Remove silence") },
    { icon: "🎵", label: "Clean Audio", action: () => console.log("Clean audio") },
    { icon: "📝", label: "Add Captions", action: () => console.log("Add captions") },
    { icon: "✂️", label: "Smart Crop", action: () => console.log("Smart crop") },
  ];

  const exportOptions = [
    { platform: "YouTube", resolution: "1080p, 16:9", color: "bg-red-50 hover:bg-red-100 border-red-200", icon: "🎥" },
    { platform: "TikTok", resolution: "1080p, 9:16", color: "bg-muted hover:bg-muted/70", icon: "📱" },
    { platform: "Instagram", resolution: "1080p, 1:1", color: "bg-muted hover:bg-muted/70", icon: "📸" },
  ];

  return (
    <div className="space-y-6">
      {/* AI Magic Button */}
      <Card className="bg-gradient-to-br from-primary to-purple-700 text-primary-foreground">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Wand2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">AI Magic</h3>
          <p className="text-primary-foreground/80 text-sm mb-4">One-click video perfection</p>
          <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90">
            Apply All AI Fixes
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start px-4 py-3 h-auto"
              onClick={action.action}
            >
              <span className="text-lg mr-3">{action.icon}</span>
              <span className="font-medium">{action.label}</span>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Style Studio */}
      <StyleStudio />

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Export Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {exportOptions.map((option, index) => (
            <div
              key={index}
              className={`w-full p-4 rounded-xl text-left flex items-center space-x-3 transition-colors border cursor-pointer ${option.color}`}
            >
              <span className="text-lg">{option.icon}</span>
              <div>
                <div className="font-medium">{option.platform}</div>
                <div className="text-sm text-muted-foreground">{option.resolution}</div>
              </div>
            </div>
          ))}
          
          <Button 
            className="w-full mt-6 py-4 text-lg" 
            onClick={() => setShowExportModal(true)}
          >
            📥 Export Video
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
