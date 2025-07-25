import { Wand2, Scissors, Volume2, Crop, Subtitles, Zap, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdvancedCaptionStudio from "./advanced-caption-studio";
import { useVideoStore } from "@/stores/video-store";

export default function ControlPanel() {
  const { setShowExportModal } = useVideoStore();

  const quickActions = [
    { icon: Scissors, label: "Remove Silence", action: () => console.log("Remove silence"), color: "text-blue-500" },
    { icon: Volume2, label: "Clean Audio", action: () => console.log("Clean audio"), color: "text-green-500" },
    { icon: Subtitles, label: "Add Captions", action: () => console.log("Add captions"), color: "text-purple-500" },
    { icon: Crop, label: "Smart Crop", action: () => console.log("Smart crop"), color: "text-orange-500" },
  ];

  const exportOptions = [
    { platform: "YouTube", resolution: "1080p, 16:9", color: "bg-red-500/10 hover:bg-red-500/20 border-red-500/30", icon: "🎥" },
    { platform: "TikTok", resolution: "1080p, 9:16", color: "gradient-glass border-primary/30 hover:border-primary/50", icon: "📱" },
    { platform: "Instagram", resolution: "1080p, 1:1", color: "bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/30", icon: "📸" },
  ];

  return (
    <div className="space-y-6">
      {/* AI Magic Button */}
      <Card className="gradient-primary border-0 text-white shadow-primary animate-glow">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-3">AI Magic ✨</h3>
          <p className="text-white/90 text-sm mb-6 leading-relaxed">
            One-click video perfection powered by artificial intelligence
          </p>
          <Button 
            variant="secondary" 
            className="w-full bg-white text-primary hover:bg-white/90 font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Wand2 className="w-5 h-5 mr-2" />
            Apply All AI Fixes
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="gradient-glass border-0 shadow-xl-custom">
        <CardHeader>
          <CardTitle className="text-xl flex items-center space-x-2">
            <Zap className="w-5 h-5 text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start px-6 py-4 h-auto hover:bg-muted/50 transition-all duration-300 rounded-xl"
                onClick={action.action}
              >
                <IconComponent className={`w-5 h-5 mr-4 ${action.color}`} />
                <span className="font-medium text-foreground">{action.label}</span>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Advanced Caption Studio */}
      <AdvancedCaptionStudio />

      {/* Export Options */}
      <Card className="gradient-glass border-0 shadow-xl-custom">
        <CardHeader>
          <CardTitle className="text-xl flex items-center space-x-2">
            <Download className="w-5 h-5 text-primary" />
            <span>Export Video</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {exportOptions.map((option, index) => (
            <div
              key={index}
              className={`w-full p-4 rounded-xl text-left flex items-center space-x-4 transition-all duration-300 border cursor-pointer hover:scale-105 ${option.color}`}
            >
              <div className="text-2xl">{option.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-foreground">{option.platform}</div>
                <div className="text-sm text-muted-foreground">{option.resolution}</div>
              </div>
            </div>
          ))}
          
          <Button 
            className="w-full mt-6 py-6 text-lg gradient-primary text-white hover:shadow-primary transition-all duration-300 rounded-xl font-semibold"
            onClick={() => setShowExportModal(true)}
          >
            <Download className="w-5 h-5 mr-3" />
            Export Video
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
