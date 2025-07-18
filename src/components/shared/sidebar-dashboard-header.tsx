"use client";

import { useInputChat } from "@/stores/chat-input-store";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

const SidebarDashboardHeader = () => {
  const { message } = useInputChat();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="line-clamp-1">
          {message?.slice(0, 50) ?? "Welcome to Lunox.ai"}
        </h1>
      </div>
    </header>
  );
};

export default SidebarDashboardHeader;
