import { useState } from "react";
import { Upload, Folder, Clock, Star, Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVideoStore } from "@/stores/video-store";

export default function MediaBrowser() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const { setActiveSection } = useVideoStore();

  const mediaFiles = [
    { id: 1, name: "Tutorial_01.mp4", type: "video", duration: "5:23", size: "124 MB", thumbnail: "🎥" },
    { id: 2, name: "Intro_Music.mp3", type: "audio", duration: "0:30", size: "2.1 MB", thumbnail: "🎵" },
    { id: 3, name: "Logo.png", type: "image", size: "854 KB", thumbnail: "🖼️" },
    { id: 4, name: "Background.jpg", type: "image", size: "1.2 MB", thumbnail: "🖼️" },
  ];

  const recentProjects = [
    { id: 1, name: "YouTube Tutorial", date: "Today", progress: 75 },
    { id: 2, name: "Product Demo", date: "Yesterday", progress: 100 },
    { id: 3, name: "Team Meeting", date: "2 days ago", progress: 50 },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gradient">Media Browser</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="w-8 h-8 p-0"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="w-8 h-8 p-0"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 gradient-glass border-primary/20"
          />
        </div>

        {/* Upload Button */}
        <Button 
          className="w-full gradient-primary text-white hover:shadow-primary transition-all duration-300"
          onClick={() => setActiveSection('upload')}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Media
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="media" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4 mt-4 gradient-secondary">
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="media" className="p-4 space-y-3">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 gap-3">
                  {mediaFiles.map((file) => (
                    <Card key={file.id} className="gradient-glass border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer">
                      <CardContent className="p-3">
                        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-2xl mb-2">
                          {file.thumbnail}
                        </div>
                        <div className="text-xs font-medium truncate">{file.name}</div>
                        <div className="text-xs text-muted-foreground">{file.size}</div>
                        {file.duration && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            {file.duration}
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {mediaFiles.map((file) => (
                    <div key={file.id} className="flex items-center space-x-3 p-2 gradient-glass rounded-lg border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer">
                      <div className="text-lg">{file.thumbnail}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{file.name}</div>
                        <div className="text-xs text-muted-foreground">{file.size}</div>
                      </div>
                      {file.duration && (
                        <Badge variant="secondary" className="text-xs">
                          {file.duration}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="projects" className="p-4 space-y-3">
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <Card key={project.id} className="gradient-glass border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-sm">{project.name}</h4>
                          <p className="text-xs text-muted-foreground">{project.date}</p>
                        </div>
                        <Badge variant={project.progress === 100 ? "default" : "secondary"}>
                          {project.progress}%
                        </Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="gradient-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="assets" className="p-4 space-y-3">
              <div className="text-center py-8">
                <Folder className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="font-medium mb-2">No Assets Yet</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Import assets like logos, graphics, and audio files
                </p>
                <Button variant="outline" size="sm" className="gradient-glass border-primary/30">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Assets
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}