import { useState } from "react";
import { Palette, Volume2, Crop, Filter, Type, Layers, Settings, Wand2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export default function PropertiesPanel() {
  const [brightness, setBrightness] = useState([50]);
  const [contrast, setContrast] = useState([50]);
  const [saturation, setSaturation] = useState([50]);
  const [volume, setVolume] = useState([80]);
  const [enableCaptions, setEnableCaptions] = useState(true);

  const videoEffects = [
    { name: "Blur", icon: "🌫️", active: false },
    { name: "Vintage", icon: "📼", active: false },
    { name: "B&W", icon: "⚫", active: false },
    { name: "Sepia", icon: "🟤", active: false },
    { name: "Sharpen", icon: "🔍", active: false },
    { name: "Glow", icon: "✨", active: false },
  ];

  const audioEffects = [
    { name: "Echo", icon: "🔄", active: false },
    { name: "Reverb", icon: "🏛️", active: false },
    { name: "Bass Boost", icon: "🔊", active: false },
    { name: "Noise Gate", icon: "🚪", active: false },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border/20">
        <h3 className="text-lg font-semibold text-gradient">Properties</h3>
        <p className="text-sm text-muted-foreground">Customize your video</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="video" className="h-full">
          <TabsList className="grid w-full grid-cols-4 mx-4 mt-4 gradient-secondary">
            <TabsTrigger value="video" className="text-xs">Video</TabsTrigger>
            <TabsTrigger value="audio" className="text-xs">Audio</TabsTrigger>
            <TabsTrigger value="text" className="text-xs">Text</TabsTrigger>
            <TabsTrigger value="ai" className="text-xs">AI</TabsTrigger>
          </TabsList>

          <div className="p-4 space-y-4">
            {/* Video Tab */}
            <TabsContent value="video" className="space-y-4">
              {/* Basic Adjustments */}
              <Card className="gradient-glass border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Basic Adjustments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-xs mb-2 block">Brightness: {brightness[0]}%</Label>
                    <Slider
                      value={brightness}
                      onValueChange={setBrightness}
                      max={100}
                      min={0}
                      step={1}
                    />
                  </div>
                  <div>
                    <Label className="text-xs mb-2 block">Contrast: {contrast[0]}%</Label>
                    <Slider
                      value={contrast}
                      onValueChange={setContrast}
                      max={100}
                      min={0}
                      step={1}
                    />
                  </div>
                  <div>
                    <Label className="text-xs mb-2 block">Saturation: {saturation[0]}%</Label>
                    <Slider
                      value={saturation}
                      onValueChange={setSaturation}
                      max={100}
                      min={0}
                      step={1}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Video Effects */}
              <Card className="gradient-glass border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>Video Effects</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {videoEffects.map((effect, index) => (
                      <Button
                        key={index}
                        variant={effect.active ? "default" : "outline"}
                        size="sm"
                        className="h-auto p-3 gradient-glass border-primary/20"
                      >
                        <div className="text-center">
                          <div className="text-lg mb-1">{effect.icon}</div>
                          <div className="text-xs">{effect.name}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Crop & Transform */}
              <Card className="gradient-glass border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Crop className="w-4 h-4" />
                    <span>Crop & Transform</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Select defaultValue="16:9">
                    <SelectTrigger className="gradient-glass border-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16:9">16:9 (YouTube)</SelectItem>
                      <SelectItem value="9:16">9:16 (TikTok)</SelectItem>
                      <SelectItem value="1:1">1:1 (Instagram)</SelectItem>
                      <SelectItem value="4:3">4:3 (Classic)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="w-full gradient-glass border-primary/30">
                    Auto Crop
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Audio Tab */}
            <TabsContent value="audio" className="space-y-4">
              {/* Volume Control */}
              <Card className="gradient-glass border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Volume2 className="w-4 h-4" />
                    <span>Volume Control</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-xs mb-2 block">Master Volume: {volume[0]}%</Label>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      min={0}
                      step={1}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Fade In/Out</Label>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Audio Effects */}
              <Card className="gradient-glass border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>Audio Effects</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {audioEffects.map((effect, index) => (
                      <Button
                        key={index}
                        variant={effect.active ? "default" : "outline"}
                        size="sm"
                        className="h-auto p-3 gradient-glass border-primary/20"
                      >
                        <div className="text-center">
                          <div className="text-lg mb-1">{effect.icon}</div>
                          <div className="text-xs">{effect.name}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Audio Tools */}
              <Card className="gradient-glass border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Wand2 className="w-4 h-4" />
                    <span>AI Audio Tools</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full gradient-glass border-primary/30">
                    Remove Background Noise
                  </Button>
                  <Button variant="outline" size="sm" className="w-full gradient-glass border-primary/30">
                    Enhance Voice Quality
                  </Button>
                  <Button variant="outline" size="sm" className="w-full gradient-glass border-primary/30">
                    Auto Level Audio
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Text/Captions Tab */}
            <TabsContent value="text" className="space-y-4">
              {/* Caption Settings */}
              <Card className="gradient-glass border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Type className="w-4 h-4" />
                    <span>Captions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Enable Captions</Label>
                    <Switch checked={enableCaptions} onCheckedChange={setEnableCaptions} />
                  </div>
                  {enableCaptions && (
                    <>
                      <Select defaultValue="bottom">
                        <SelectTrigger className="gradient-glass border-primary/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top">Top</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="bottom">Bottom</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="large">
                        <SelectTrigger className="gradient-glass border-primary/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small Text</SelectItem>
                          <SelectItem value="medium">Medium Text</SelectItem>
                          <SelectItem value="large">Large Text</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" className="w-full gradient-glass border-primary/30">
                        Customize Style
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Text Overlays */}
              <Card className="gradient-glass border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Layers className="w-4 h-4" />
                    <span>Text Overlays</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full gradient-glass border-primary/30">
                    Add Title
                  </Button>
                  <Button variant="outline" size="sm" className="w-full gradient-glass border-primary/30">
                    Add Lower Third
                  </Button>
                  <Button variant="outline" size="sm" className="w-full gradient-glass border-primary/30">
                    Add Call-to-Action
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI Tab */}
            <TabsContent value="ai" className="space-y-4">
              {/* AI Enhancement */}
              <Card className="gradient-primary border-0 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Wand2 className="w-4 h-4" />
                    <span>AI Enhancement</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="secondary" size="sm" className="w-full bg-white text-primary">
                    Auto-Enhance Video
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10">
                    Smart Cropping
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10">
                    Scene Detection
                  </Button>
                </CardContent>
              </Card>

              {/* AI Feedback */}
              <Card className="gradient-glass border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>AI Feedback</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-xs text-muted-foreground space-y-2">
                    <div className="flex items-start space-x-2">
                      <Badge variant="secondary" className="text-xs">Tip</Badge>
                      <span>Your video could benefit from better lighting</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Badge variant="secondary" className="text-xs">Suggestion</Badge>
                      <span>Consider adding background music</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Badge variant="default" className="text-xs">Good</Badge>
                      <span>Audio quality is excellent</span>
                    </div>
                  </div>
                  <Textarea 
                    placeholder="Ask AI for feedback on your video..."
                    className="gradient-glass border-primary/20 text-xs"
                    rows={3}
                  />
                  <Button variant="outline" size="sm" className="w-full gradient-glass border-primary/30">
                    Get AI Analysis
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}