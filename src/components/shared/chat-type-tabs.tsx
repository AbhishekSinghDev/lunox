import { useChatType } from "@/stores/chat-input-store";
import { Atom, SearchCheck } from "lucide-react";
import { Button } from "../ui/button";

const ChatTypeTabs = () => {
  const { type, setType } = useChatType();

  return (
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
  );
};

export default ChatTypeTabs;
