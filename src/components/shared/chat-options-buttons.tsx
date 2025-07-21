import { Cpu, Globe, Mic, Paperclip } from "lucide-react";
import { Button } from "../ui/button";
import TooltipWrapper from "./tooltip-wrapper";

const ChatOptionsButtons = () => {
  return (
    <div className="flex items-center gap-1">
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
  );
};

export default ChatOptionsButtons;
