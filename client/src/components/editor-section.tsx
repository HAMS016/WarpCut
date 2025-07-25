import VideoPlayer from "./video-player";
import WordPlayground from "./word-playground";
import Timeline from "./timeline";
import ControlPanel from "./control-panel";

export default function EditorSection() {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Video Preview & Timeline */}
        <div className="lg:col-span-3 space-y-6">
          <VideoPlayer />
          <WordPlayground />
          <Timeline />
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          <ControlPanel />
        </div>
      </div>
    </div>
  );
}
