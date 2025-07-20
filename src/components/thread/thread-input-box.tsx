import { Textarea } from "../ui/textarea";

const ThreadInputBox = () => {
  return (
    <div className="absolute bottom-0 left-1/2 z-50 w-full -translate-x-1/2 overflow-hidden md:max-w-[900px]">
      {/* Backdrop blur overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden bg-gradient-to-t to-transparent backdrop-blur-sm" />

      {/* Input container with simple styling */}
      <div className="border-border relative mx-auto h-[98px] overflow-hidden rounded-2xl border shadow-lg backdrop-blur-md">
        <Textarea
          className="placeholder:text-muted-foreground/60 h-full resize-none rounded-2xl border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
};

export default ThreadInputBox;
