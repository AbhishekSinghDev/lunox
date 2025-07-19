"use client";

import {
  Copy,
  MessageSquare,
  MoreHorizontal,
  Share,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavThreadHistory() {
  const { isMobile } = useSidebar();

  const pathname = usePathname();

  const [threads] = api.library.getAll.useSuspenseQuery();

  if (!threads || threads.length === 0) {
    return null;
  }

  const activeThreadId = pathname.split("/").pop();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Thread History</SidebarGroupLabel>
      <SidebarMenu>
        {threads.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              className={cn(
                activeThreadId === item.id &&
                  "bg-sidebar-accent text-sidebar-accent-foreground",
              )}
            >
              <Link href={`/thread/${item.id}`}>
                <MessageSquare />
                <span className="line-clamp-1">
                  {item.content.slice(0, 50)}
                </span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Copy className="text-muted-foreground" />
                  <span>Duplicate Thread</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="text-muted-foreground" />
                  <span>Share Thread</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="group text-red-600 focus:text-white">
                  <Trash2 className="text-red-600 group-hover:text-white" />
                  <span>Delete Thread</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
