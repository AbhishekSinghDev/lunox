"use client";

import { MessageSquare } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThreadHistoryActions from "./thread-history-actions";

export function NavThreadHistory() {
  const pathname = usePathname();

  const [threads] = api.library.getAll.useSuspenseQuery();

  if (!threads || threads.length === 0) {
    return null;
  }

  const activeThreadId = pathname.split("/").pop();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Thread History</SidebarGroupLabel>
      <SidebarMenu className="no-scrollbar max-h-[calc(100vh-20rem)] overflow-y-auto">
        {threads.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              className={cn(
                activeThreadId === item.id &&
                  "bg-sidebar-accent text-sidebar-accent-foreground",
              )}
            >
              <Link href={`/thread/${item.id}`} prefetch={true}>
                <MessageSquare />
                <span className="line-clamp-1">
                  {item.content.slice(0, 50)}
                </span>
              </Link>
            </SidebarMenuButton>
            <ThreadHistoryActions threadId={item.id} />
          </SidebarMenuItem>
        ))}

        <div className="h-[100px]" />
      </SidebarMenu>
    </SidebarGroup>
  );
}
