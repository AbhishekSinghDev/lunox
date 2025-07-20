"use client";

import useThread from "@/hooks/use-thread";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

interface SidebarThreadHeaderProps {
  threadId?: string;
}

const SidebarThreadHeader = ({ threadId }: SidebarThreadHeaderProps) => {
  const { thread } = useThread(threadId ?? "");

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="line-clamp-1">{thread?.content}</h1>
      </div>
    </header>
  );
};

export default SidebarThreadHeader;
