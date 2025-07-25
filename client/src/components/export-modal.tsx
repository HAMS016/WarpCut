import { CheckCircle, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { useVideoStore } from "@/stores/video-store";

export default function ExportModal() {
  const { showExportModal, setShowExportModal } = useVideoStore();

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'tech-tutorial-edited.mp4';
    link.click();
  };

  return (
    <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
      <DialogContent className="max-w-md animate-slide-up">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600 w-6 h-6" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowExportModal(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            Export Complete!
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center">
          <p className="text-muted-foreground mb-8">
            Your video has been processed and is ready for download.
          </p>
          
          <div className="space-y-3 mb-6">
            <Button onClick={handleDownload} className="w-full py-4">
              <Download className="w-4 h-4 mr-2" />
              Download Video
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowExportModal(false)}
              className="w-full"
            >
              Close
            </Button>
          </div>
          
          <Card className="p-4 bg-muted">
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>File:</strong> tech-tutorial-edited.mp4</p>
              <p><strong>Size:</strong> 45.2 MB</p>
              <p><strong>Duration:</strong> 4:32</p>
              <p><strong>Resolution:</strong> 1920x1080</p>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
