import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function StyleStudio() {
  const [selectedStyle, setSelectedStyle] = useState("youtube");
  const [fontSize, setFontSize] = useState([24]);
  const [position, setPosition] = useState("bottom");

  const captionStyles = [
    { id: "youtube", label: "YouTube" },
    { id: "tiktok", label: "TikTok" },
    { id: "instagram", label: "Instagram" },
    { id: "custom", label: "Custom" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Style Studio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Caption Style */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Caption Style</Label>
          <div className="grid grid-cols-2 gap-2">
            {captionStyles.map((style) => (
              <Button
                key={style.id}
                variant={selectedStyle === style.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStyle(style.id)}
                className="text-sm"
              >
                {style.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Font Size: {fontSize[0]}px
          </Label>
          <Slider
            value={fontSize}
            onValueChange={setFontSize}
            min={12}
            max={48}
            step={2}
            className="w-full"
          />
        </div>

        {/* Position */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Position</Label>
          <div className="flex space-x-2">
            <Button
              variant={position === "top" ? "default" : "outline"}
              size="sm"
              onClick={() => setPosition("top")}
              className="flex-1"
            >
              Top
            </Button>
            <Button
              variant={position === "bottom" ? "default" : "outline"}
              size="sm"
              onClick={() => setPosition("bottom")}
              className="flex-1"
            >
              Bottom
            </Button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <p 
            className="text-white font-semibold"
            style={{ fontSize: `${fontSize[0]}px` }}
          >
            Hello everyone, welcome to my coding tutorial.
          </p>
          <p className="text-gray-400 text-xs mt-2">Live Preview</p>
        </div>
      </CardContent>
    </Card>
  );
}
