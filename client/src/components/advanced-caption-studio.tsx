import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Type, Palette, Sparkles, Wand2, Eye } from "lucide-react";

interface CaptionStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  backgroundColor: string;
  outlineColor: string;
  outlineWidth: number;
  shadowColor: string;
  shadowOffset: number;
  position: "top" | "center" | "bottom";
  alignment: "left" | "center" | "right";
  animation: "none" | "typewriter" | "fade" | "bounce" | "highlight";
  highlightWords: boolean;
  autoSize: boolean;
  maxWordsPerLine: number;
}

export default function AdvancedCaptionStudio() {
  const [activeTab, setActiveTab] = useState("style");
  const [captionStyle, setCaptionStyle] = useState<CaptionStyle>({
    fontFamily: "Inter",
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    outlineColor: "#000000",
    outlineWidth: 2,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: 4,
    position: "bottom",
    alignment: "center",
    animation: "none",
    highlightWords: true,
    autoSize: true,
    maxWordsPerLine: 8,
  });

  const fontFamilies = [
    { name: "Inter", category: "modern" },
    { name: "Poppins", category: "modern" },
    { name: "Montserrat", category: "modern" },
    { name: "Roboto", category: "clean" },
    { name: "Open Sans", category: "clean" },
    { name: "Lato", category: "clean" },
    { name: "Oswald", category: "impact" },
    { name: "Bebas Neue", category: "impact" },
    { name: "Anton", category: "impact" },
    { name: "Playfair Display", category: "elegant" },
    { name: "Merriweather", category: "elegant" },
    { name: "Dancing Script", category: "creative" },
    { name: "Bangers", category: "fun" },
    { name: "Fredoka One", category: "fun" },
  ];

  const presetStyles = [
    {
      name: "YouTube Pro",
      icon: "🎥",
      style: {
        fontFamily: "Inter",
        fontSize: 28,
        fontWeight: "600",
        color: "#FFFFFF",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        position: "bottom" as const,
        animation: "fade" as const,
      }
    },
    {
      name: "TikTok Viral",
      icon: "📱",
      style: {
        fontFamily: "Poppins",
        fontSize: 36,
        fontWeight: "800",
        color: "#FFFFFF",
        outlineColor: "#000000",
        outlineWidth: 3,
        position: "center" as const,
        animation: "bounce" as const,
      }
    },
    {
      name: "Instagram Reel",
      icon: "📸",
      style: {
        fontFamily: "Montserrat",
        fontSize: 30,
        fontWeight: "700",
        color: "#FFFFFF",
        backgroundColor: "rgba(255, 105, 180, 0.9)",
        position: "bottom" as const,
        animation: "highlight" as const,
      }
    },
    {
      name: "Podcast Elegant",
      icon: "🎙️",
      style: {
        fontFamily: "Playfair Display",
        fontSize: 24,
        fontWeight: "400",
        color: "#F8F9FA",
        backgroundColor: "rgba(33, 37, 41, 0.9)",
        position: "bottom" as const,
        animation: "typewriter" as const,
      }
    }
  ];

  const updateStyle = (updates: Partial<CaptionStyle>) => {
    setCaptionStyle(prev => ({ ...prev, ...updates }));
  };

  const applyPreset = (preset: any) => {
    setCaptionStyle(prev => ({ ...prev, ...preset.style }));
  };

  return (
    <Card className="gradient-glass border-0 shadow-xl-custom">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
            <Type className="text-white w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-xl text-gradient">AI Caption Studio</CardTitle>
            <p className="text-sm text-muted-foreground">Create stunning captions with AI precision</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 gradient-secondary rounded-xl">
            <TabsTrigger value="presets" className="rounded-lg">Presets</TabsTrigger>
            <TabsTrigger value="style" className="rounded-lg">Style</TabsTrigger>
            <TabsTrigger value="effects" className="rounded-lg">Effects</TabsTrigger>
            <TabsTrigger value="ai" className="rounded-lg">AI</TabsTrigger>
          </TabsList>

          {/* Presets Tab */}
          <TabsContent value="presets" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {presetStyles.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 gradient-glass border-primary/20 hover:border-primary transition-all duration-300"
                  onClick={() => applyPreset(preset)}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{preset.icon}</div>
                    <div className="font-semibold text-sm">{preset.name}</div>
                  </div>
                </Button>
              ))}
            </div>
          </TabsContent>

          {/* Style Tab */}
          <TabsContent value="style" className="space-y-6">
            {/* Font Family */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Font Family</Label>
              <Select value={captionStyle.fontFamily} onValueChange={(value) => updateStyle({ fontFamily: value })}>
                <SelectTrigger className="gradient-glass border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontFamilies.map((font) => (
                    <SelectItem key={font.name} value={font.name}>
                      <div className="flex items-center space-x-2">
                        <span style={{ fontFamily: font.name }}>{font.name}</span>
                        <Badge variant="secondary" className="text-xs">{font.category}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Font Size */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Font Size: {captionStyle.fontSize}px
              </Label>
              <Slider
                value={[captionStyle.fontSize]}
                onValueChange={([value]) => updateStyle({ fontSize: value })}
                min={16}
                max={72}
                step={2}
                className="w-full"
              />
            </div>

            {/* Font Weight */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Font Weight</Label>
              <Select value={captionStyle.fontWeight} onValueChange={(value) => updateStyle({ fontWeight: value })}>
                <SelectTrigger className="gradient-glass border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300">Light (300)</SelectItem>
                  <SelectItem value="400">Regular (400)</SelectItem>
                  <SelectItem value="500">Medium (500)</SelectItem>
                  <SelectItem value="600">Semi Bold (600)</SelectItem>
                  <SelectItem value="700">Bold (700)</SelectItem>
                  <SelectItem value="800">Extra Bold (800)</SelectItem>
                  <SelectItem value="900">Black (900)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Position */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Position</Label>
              <div className="grid grid-cols-3 gap-2">
                {["top", "center", "bottom"].map((pos) => (
                  <Button
                    key={pos}
                    variant={captionStyle.position === pos ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateStyle({ position: pos as any })}
                    className="capitalize"
                  >
                    {pos}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Effects Tab */}
          <TabsContent value="effects" className="space-y-6">
            {/* Animation */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Animation</Label>
              <Select value={captionStyle.animation} onValueChange={(value) => updateStyle({ animation: value as any })}>
                <SelectTrigger className="gradient-glass border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="fade">Fade In</SelectItem>
                  <SelectItem value="typewriter">Typewriter</SelectItem>
                  <SelectItem value="bounce">Bounce</SelectItem>
                  <SelectItem value="highlight">Word Highlight</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Outline Width */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Outline Width: {captionStyle.outlineWidth}px
              </Label>
              <Slider
                value={[captionStyle.outlineWidth]}
                onValueChange={([value]) => updateStyle({ outlineWidth: value })}
                min={0}
                max={8}
                step={1}
                className="w-full"
              />
            </div>

            {/* Shadow Offset */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Shadow Offset: {captionStyle.shadowOffset}px
              </Label>
              <Slider
                value={[captionStyle.shadowOffset]}
                onValueChange={([value]) => updateStyle({ shadowOffset: value })}
                min={0}
                max={12}
                step={1}
                className="w-full"
              />
            </div>

            {/* Switches */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Highlight Words</Label>
                <Switch
                  checked={captionStyle.highlightWords}
                  onCheckedChange={(checked) => updateStyle({ highlightWords: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Auto Size</Label>
                <Switch
                  checked={captionStyle.autoSize}
                  onCheckedChange={(checked) => updateStyle({ autoSize: checked })}
                />
              </div>
            </div>
          </TabsContent>

          {/* AI Tab */}
          <TabsContent value="ai" className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-glow">
                <Sparkles className="text-white w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">AI Caption Enhancement</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Let AI optimize your captions for maximum engagement and readability
              </p>
            </div>

            <div className="space-y-3">
              <Button className="w-full gradient-primary text-white hover:shadow-primary transition-all duration-300">
                <Wand2 className="w-4 h-4 mr-2" />
                Auto-Generate Styles
              </Button>
              <Button variant="outline" className="w-full gradient-glass border-primary/30">
                <Palette className="w-4 h-4 mr-2" />
                Smart Color Matching
              </Button>
              <Button variant="outline" className="w-full gradient-glass border-primary/30">
                <Eye className="w-4 h-4 mr-2" />
                Readability Optimization
              </Button>
            </div>

            <div className="gradient-glass p-4 rounded-xl border border-primary/20">
              <h4 className="font-medium text-foreground mb-2">AI Suggestions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Increase font size by 4px for better mobile readability</li>
                <li>• Use higher contrast colors for accessibility</li>
                <li>• Consider word highlighting for key phrases</li>
                <li>• Optimal position: Bottom center for this video type</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        {/* Live Preview */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Live Preview</Label>
          <div 
            className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden"
            style={{ 
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
            }}
          >
            <div
              className={`absolute px-4 py-2 rounded-lg max-w-[80%] text-center transition-all duration-300 ${
                captionStyle.position === "top" ? "top-4" :
                captionStyle.position === "center" ? "top-1/2 -translate-y-1/2" :
                "bottom-4"
              }`}
              style={{
                fontFamily: captionStyle.fontFamily,
                fontSize: `${captionStyle.fontSize * 0.5}px`, // Scaled down for preview
                fontWeight: captionStyle.fontWeight,
                color: captionStyle.color,
                backgroundColor: captionStyle.backgroundColor,
                textShadow: `${captionStyle.shadowOffset}px ${captionStyle.shadowOffset}px 0px ${captionStyle.shadowColor}`,
                WebkitTextStroke: `${captionStyle.outlineWidth}px ${captionStyle.outlineColor}`,
                textAlign: captionStyle.alignment,
              }}
            >
              Hello everyone, welcome to my{" "}
              <span className={captionStyle.highlightWords ? "text-primary font-bold" : ""}>
                coding tutorial
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button className="flex-1 gradient-primary text-white hover:shadow-primary transition-all duration-300">
            Apply to Video
          </Button>
          <Button variant="outline" className="gradient-glass border-primary/30">
            Save Style
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}