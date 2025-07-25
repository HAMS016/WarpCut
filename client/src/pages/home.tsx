import { useState } from "react";
import { useVideoStore } from "@/stores/video-store";
import { useAuth } from "@/hooks/use-auth";
import UploadSection from "@/components/upload-section";
import ProcessingSection from "@/components/processing-section";
import EditorSection from "@/components/editor-section";
import ExportModal from "@/components/export-modal";
import MediaBrowser from "@/components/media-browser";
import VideoPreviewArea from "@/components/video-preview-area";
import TimelinePanel from "@/components/timeline-panel";
import PropertiesPanel from "@/components/properties-panel";
import { Scissors, HelpCircle, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const { activeSection } = useVideoStore();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Header */}
      <header className="gradient-glass border-b border-border/20 backdrop-blur-xl sticky top-0 z-50 shadow-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-primary animate-glow">
                    <Scissors className="text-white w-6 h-6" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient">WarpCut</h1>
                  <p className="text-xs text-muted-foreground -mt-1">AI Video Editor</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold border border-primary/20">
                  ✨ AI-Powered
                </span>
                <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-semibold border border-green-500/20">
                  🚀 Pro
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="rounded-xl hover:bg-muted/50">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-xl hover:bg-muted/50 px-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{user?.username}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600 dark:text-red-400">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Video Editor Layout */}
      <div className="flex h-[calc(100vh-5rem)] overflow-hidden">
        {/* Left Sidebar - Media Browser */}
        <div className="w-80 gradient-glass border-r border-border/20 flex flex-col">
          <MediaBrowser />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Preview Area */}
          <div className="flex-1">
            {activeSection === 'upload' && (
              <div className="h-full flex items-center justify-center p-6">
                <UploadSection />
              </div>
            )}
            {activeSection === 'processing' && (
              <div className="h-full flex items-center justify-center p-6">
                <ProcessingSection />
              </div>
            )}
            {activeSection === 'editor' && <VideoPreviewArea />}
          </div>

          {/* Bottom Timeline Panel */}
          <div className="h-80 gradient-glass border-t border-border/20">
            <TimelinePanel />
          </div>
        </div>

        {/* Right Sidebar - Properties & Effects */}
        <div className="w-80 gradient-glass border-l border-border/20 flex flex-col">
          <PropertiesPanel />
        </div>
      </div>

      <ExportModal />
    </div>
  );
}
