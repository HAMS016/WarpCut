import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, Film, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useVideoStore } from "@/stores/video-store";
import { ffmpegProcessor } from "@/lib/ffmpeg";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function UploadSection() {
  const { setVideoFile, setActiveSection, setProcessingState, setCurrentProject } = useVideoStore();
  const { toast } = useToast();

  const createProjectMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/video-projects", data);
      return response.json();
    },
    onSuccess: (project) => {
      setCurrentProject(project);
      startProcessing();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create video project",
        variant: "destructive",
      });
    }
  });

  const startProcessing = async () => {
    setActiveSection('processing');
    setProcessingState({
      step: 'extracting',
      progress: 0,
      message: 'Extracting audio...'
    });

    // Simulate processing steps
    setTimeout(() => {
      setProcessingState({
        step: 'transcribing',
        progress: 40,
        message: 'Transcribing speech...'
      });
    }, 2000);

    setTimeout(() => {
      setProcessingState({
        step: 'cleaning',
        progress: 80,
        message: 'Removing silence and filler words...'
      });
    }, 5000);

    setTimeout(() => {
      setProcessingState({
        step: 'ready',
        progress: 100,
        message: 'Processing complete!'
      });
      setActiveSection('editor');
      toast({
        title: "Processing Complete",
        description: "Your video is ready for editing!",
      });
    }, 8000);
  };

  const processVideo = async (file: File) => {
    setVideoFile(file);
    
    // Create project in database
    createProjectMutation.mutate({
      name: file.name.replace(/\.[^/.]+$/, ""),
      originalFileName: file.name,
      duration: 347, // Mock duration in seconds
      status: "processing"
    });
  };

  const loadSampleVideo = (type: string) => {
    // Create mock file for sample video
    const mockFile = new File(['mock video data'], `${type}-sample.mp4`, { type: 'video/mp4' });
    processVideo(mockFile);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      processVideo(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    multiple: false,
    maxSize: 500 * 1024 * 1024 // 500MB
  });

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Edit Videos in <span className="text-primary">Minutes</span>, Not Hours
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          AI-powered video editing so simple, an 8-year-old can use it. Upload, click magic, and export.
        </p>
      </div>

      {/* Magic Upload Zone */}
      <Card className="mb-8 border-2 border-dashed hover:border-primary transition-all duration-300 hover:shadow-xl">
        <CardContent 
          {...getRootProps()} 
          className={`p-12 text-center cursor-pointer transition-colors ${
            isDragActive ? 'bg-primary/10' : 'hover:bg-muted/50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
              <CloudUpload className="text-primary w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Drop Your Video Here</h3>
            <p className="text-muted-foreground mb-6">Or click to browse your files</p>
            <Button size="lg" className="text-lg px-8 py-4">
              <CloudUpload className="w-5 h-5 mr-2" />
              Choose Video
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Supports MP4, MOV, AVI, MKV • Max 500MB
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sample Videos */}
      <Card>
        <CardContent className="p-8">
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            Try with Sample Videos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tech Tutorial Sample */}
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => loadSampleVideo('tech')}>
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <Play className="text-muted-foreground w-8 h-8" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Tech Tutorial</h4>
                <p className="text-sm text-muted-foreground">
                  5 min coding walkthrough with silence removal
                </p>
              </CardContent>
            </Card>

            {/* Interview Sample */}
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => loadSampleVideo('interview')}>
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <Play className="text-muted-foreground w-8 h-8" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Interview</h4>
                <p className="text-sm text-muted-foreground">
                  10 min conversation with filler word cleanup
                </p>
              </CardContent>
            </Card>

            {/* Presentation Sample */}
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => loadSampleVideo('presentation')}>
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <Play className="text-muted-foreground w-8 h-8" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Presentation</h4>
                <p className="text-sm text-muted-foreground">
                  15 min demo with auto-captions
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
