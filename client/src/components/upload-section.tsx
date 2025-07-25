import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, Film, Play, Sparkles, Zap, Wand2 } from "lucide-react";
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
  const [uploadProgress, setUploadProgress] = useState(0);

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
    // Simulate upload progress
    setUploadProgress(0);
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    setVideoFile(file);
    
    // Get actual video duration
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      const duration = Math.floor(video.duration) || 347; // fallback to mock duration
      
      // Create project in database
      createProjectMutation.mutate({
        name: file.name.replace(/\.[^/.]+$/, ""),
        originalFileName: file.name,
        duration: duration,
        status: "processing"
      });
    };
    
    video.src = URL.createObjectURL(file);
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
    <div className="animate-fade-in min-h-screen flex flex-col justify-center">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-primary animate-glow">
              <Sparkles className="text-white w-8 h-8" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Wand2 className="w-3 h-3 text-black" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-bold mb-6">
          <span className="text-gradient">AI Video Magic</span>
          <br />
          <span className="text-foreground">In Seconds</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Professional video editing powered by artificial intelligence. So simple, 
          <span className="text-primary font-semibold"> even an 8-year-old</span> can create stunning videos.
        </p>
      </div>

      {/* Premium Upload Zone */}
      <div className="max-w-4xl mx-auto w-full">
        <Card className="gradient-glass border-0 shadow-xl-custom hover:shadow-primary transition-all duration-500 animate-scale-in">
          <CardContent 
            {...getRootProps()} 
            className={`p-16 text-center cursor-pointer transition-all duration-300 ${
              isDragActive ? 'bg-primary/5 scale-105' : 'hover:bg-muted/20'
            }`}
          >
            <input {...getInputProps()} />
            
            <div className="max-w-lg mx-auto">
              {/* Animated Upload Icon */}
              <div className="relative mb-8">
                <div className={`w-24 h-24 gradient-primary rounded-3xl flex items-center justify-center mx-auto shadow-primary transition-all duration-300 ${
                  isDragActive ? 'scale-110 animate-pulse' : 'animate-bounce-slow'
                }`}>
                  <CloudUpload className="text-white w-10 h-10" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isDragActive ? 'Drop it like it\'s hot!' : 'Upload Your Video'}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Drag & drop your video file here, or click to browse
              </p>
              
              <Button size="lg" className="gradient-primary text-white font-semibold px-12 py-6 text-lg rounded-2xl shadow-primary hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Film className="w-6 h-6 mr-3" />
                Choose Video File
              </Button>
              
              <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>MP4, MOV, AVI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Up to 500MB</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>HD Quality</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Demo Section */}
      <div className="mt-16 text-center">
        <Card className="gradient-secondary border-0 shadow-glass max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Try with a Sample Video
            </h3>
            <p className="text-muted-foreground mb-6">
              Want to see the magic in action? Load a demo video and experience the AI editing power.
            </p>
            <Button 
              onClick={() => loadSampleVideo('demo')} 
              variant="outline" 
              size="lg"
              className="gradient-glass border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Load Demo Video
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
