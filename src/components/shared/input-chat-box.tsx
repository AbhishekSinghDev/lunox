"use client";

import { Button } from "@/components/ui/button";
import { useChatType } from "@/stores/chat-input-store";
import { Atom, Cpu, Globe, Mic, Paperclip, SearchCheck } from "lucide-react";
import InputChat from "./input-chat";
import TooltipWrapper from "./tooltip-wrapper";

const InputChatBox = () => {
  const { type, setType } = useChatType();

  return (
    <div className="bg-background relative flex w-full max-w-2xl flex-col gap-y-4 rounded-2xl border p-3">
      {/* Chat type toggle buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            variant={type === "search" ? "default" : "ghost"}
            size="sm"
            onClick={() => setType("search")}
            className="h-8 px-3"
          >
            <SearchCheck className="mr-1 size-4" />
            Search
          </Button>
          <Button
            variant={type === "research" ? "default" : "ghost"}
            size="sm"
            onClick={() => setType("research")}
            className="h-8 px-3"
          >
            <Atom className="mr-1 size-4" />
            Research
          </Button>
        </div>

        <div className="flex items-center gap-1">
          {/* Options buttons */}
          <div className="flex items-center gap-x-1">
            <TooltipWrapper
              trigger={
                <Button variant="ghost" size="icon" className="size-8">
                  <Cpu className="size-4" />
                </Button>
              }
              content="Choose AI Model"
              asChild
            />
            <TooltipWrapper
              trigger={
                <Button variant="ghost" size="icon" className="size-8">
                  <Globe className="size-4" />
                </Button>
              }
              content="Choose Language"
              asChild
            />
            <TooltipWrapper
              trigger={
                <Button variant="ghost" size="icon" className="size-8">
                  <Paperclip className="size-4" />
                </Button>
              }
              content="Attach File"
              asChild
            />
            <TooltipWrapper
              trigger={
                <Button variant="ghost" size="icon" className="size-8">
                  <Mic className="size-4" />
                </Button>
              }
              content="Speech to Text"
              asChild
            />
          </div>
        </div>
      </div>

      {/* Main input area */}
      <InputChat />
    </div>
  );
};

export default InputChatBox;
