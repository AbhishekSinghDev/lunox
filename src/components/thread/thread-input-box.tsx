import { Textarea } from "../ui/textarea";

const ThreadInputBox = () => {
  return (
    <div className="absolute bottom-0 left-1/2 z-50 w-full max-w-[900px] -translate-x-1/2 px-4 pt-8 pb-6">
      {/* Backdrop blur overlay */}
      <div className="from-background via-background/50 pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent backdrop-blur-sm" />

      {/* Input container with simple styling */}
      <div className="bg-background/80 border-border relative mx-auto h-[98px] overflow-hidden rounded-2xl border shadow-lg backdrop-blur-md">
        <Textarea
          className="placeholder:text-muted-foreground/60 h-full resize-none rounded-2xl border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
};

export default ThreadInputBox;
