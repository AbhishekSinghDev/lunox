"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { INNGEST_ID_PARAM } from "@/lib/constants";
import { useChatType, useInputChat } from "@/stores/chat-input-store";
import { api } from "@/trpc/react";
import { Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const InputChat = () => {
  const router = useRouter();
  const { message, setMessage } = useInputChat();
  const { type } = useChatType();
  const [isComposing, setIsComposing] = useState(false);

  const trpcUtils = api.useUtils();

  const { mutate: createLibraryEntry, isPending } =
    api.library.create.useMutation({
      onSuccess: async (opts) => {
        await trpcUtils.library.getAll.invalidate();
        setMessage(undefined);
        router.push(
          `/thread/${opts.libId}?${INNGEST_ID_PARAM}=${opts.inngestId}`,
        );
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
        value={message ?? ""}
        onChange={(e) =>
          setMessage(e.target.value === "" ? undefined : e.target.value)
        }
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        className="no-scrollbar max-h-52 min-h-[44px] resize-none border-0 bg-transparent p-3 shadow-none focus-visible:ring-0"
        rows={1}
      />
      <Button
        onClick={handleSubmit}
        disabled={!message?.trim() || isPending}
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
