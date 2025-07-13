"use client";

import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SIDEBAR } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { NavThreadHistory } from "./nav-thread-history";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="text-sidebar-primary-foreground relative flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src="/static/logo/lunox.png"
                    alt="Lunox"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Lunox</span>
                  <span className="truncate text-xs">Lunox.ai</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="no-scrollbar">
        <NavMain items={SIDEBAR.navMain} />
        <NavThreadHistory threadHistory={SIDEBAR.threadHistory} />
        <NavSecondary items={SIDEBAR.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={SIDEBAR.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
