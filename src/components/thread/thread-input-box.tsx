import { api } from "@/trpc/react";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ChatOptionsButtons from "../shared/chat-options-buttons";
import ChatTypeTabs from "../shared/chat-type-tabs";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface ThreadInputBoxProps {
  threadId: string;
}

const ThreadInputBox = ({ threadId }: ThreadInputBoxProps) => {
  const [userQuery, setUserQuery] = useState<string | undefined>(undefined);
  const [isComposing, setIsComposing] = useState(false);

  const trpcUtils = api.useUtils();
  const { mutate: sendMessage, isPending: isSendingMessage } =
    api.conversation.newMessage.useMutation({
      onSuccess: async (opts) => {
        if (!opts.inngestId) return toast.error("Failed to send message");

        await trpcUtils.library.getById.invalidate({ id: threadId });

        setUserQuery(undefined);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const handleSendMessage = () => {
    if (isSendingMessage) return;

    if (!userQuery?.trim()) return;

    sendMessage({
      libId: threadId,
      userQuery: userQuery,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="absolute bottom-0 left-1/2 z-50 w-full -translate-x-1/2 overflow-hidden md:max-w-[900px]">
      {/* Backdrop blur overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden bg-gradient-to-t to-transparent backdrop-blur-sm" />

      {/* Input container with similar styling to InputChatBox */}
      <div className="bg-background relative mx-auto flex flex-col gap-y-4 rounded-2xl border p-3 shadow-lg backdrop-blur-md">
        {/* Chat type toggle buttons */}
        <div className="flex items-center justify-between">
          <ChatTypeTabs />

          {/* Options buttons */}
          <ChatOptionsButtons />
        </div>

        {/* Main input area with relative positioning for button */}
        <div className="relative flex items-end gap-2">
          <Textarea
            className="placeholder:text-muted-foreground/60 bg-accent max-h-[420px] min-h-[44px] resize-none border-0 p-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Type a message..."
            rows={1}
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
          <Button
            size="icon"
            className="shrink-0"
            onClick={handleSendMessage}
            disabled={!userQuery?.trim() || isSendingMessage}
          >
            {isSendingMessage ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThreadInputBox;
