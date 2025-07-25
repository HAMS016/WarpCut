import { useState } from "react";
import { useVideoStore } from "@/stores/video-store";
import UploadSection from "@/components/upload-section";
import ProcessingSection from "@/components/processing-section";
import EditorSection from "@/components/editor-section";
import ExportModal from "@/components/export-modal";
import { Scissors, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { activeSection } = useVideoStore();

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
              <Button className="gradient-primary text-white hover:shadow-primary transition-all duration-300 rounded-xl font-semibold px-6">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with premium spacing */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
        activeSection === 'upload' ? 'py-0' : 'py-8'
      }`}>
        {activeSection === 'upload' && <UploadSection />}
        {activeSection === 'processing' && <ProcessingSection />}
        {activeSection === 'editor' && <EditorSection />}
      </main>

      <ExportModal />
    </div>
  );
}
