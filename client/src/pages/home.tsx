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
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-700 rounded-xl flex items-center justify-center">
                  <Scissors className="text-primary-foreground w-4 h-4" />
                </div>
                <h1 className="text-xl font-bold text-foreground">WarpCut</h1>
              </div>
              <span className="hidden sm:inline-block bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                AI-Powered
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <HelpCircle className="w-4 h-4" />
              </Button>
              <Button variant="default" size="sm">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'upload' && <UploadSection />}
        {activeSection === 'processing' && <ProcessingSection />}
        {activeSection === 'editor' && <EditorSection />}
      </main>

      <ExportModal />
    </div>
  );
}
