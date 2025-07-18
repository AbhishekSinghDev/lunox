"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatType, useInputChat } from "@/stores/chat-input-store";
import { api } from "@/trpc/react";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const InputChat = () => {
  const { message, setMessage } = useInputChat();
  const { type } = useChatType();
  const [isComposing, setIsComposing] = useState(false);

  const { mutate: createLibraryEntry, isPending } =
    api.library.create.useMutation({
      onSuccess: () => {
        setMessage(undefined);
      },
      onError: (opts) => {
        toast.error(opts.message);
      },
    });

  const placeholder =
    type === "search" ? "Search anything..." : "Research topic...";

  const handleSubmit = () => {
    if (!message?.trim()) return;

    createLibraryEntry({
      message: message,
      type,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-end gap-2">
      <Textarea
        placeholder={placeholder}
        value={message ?? undefined}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        className="no-scrollbar max-h-52 min-h-[44px] resize-none border-0 bg-transparent p-3 shadow-none focus-visible:ring-0"
        rows={1}
      />
      <Button
        onClick={handleSubmit}
        disabled={!message?.trim()}
        size="icon"
        className="shrink-0"
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
      </Button>
    </div>
  );
};

export default InputChat;
