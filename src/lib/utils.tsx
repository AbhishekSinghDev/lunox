import SidebarDashboardHeader from "@/components/shared/sidebar-dashboard-header";
import SidebarThreadHeader from "@/components/shared/sidebar-thread-header";
import ThreadAnswerTab from "@/components/thread/thread-answer-tab";
import ThreadImagesTab from "@/components/thread/thread-images-tab";
import ThreadSourcesTab from "@/components/thread/thread-sources-tab";
import ThreadVideosTab from "@/components/thread/thread-videos-tab";
import type { conversation } from "@/server/db/schema";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ActiveTab } from "./type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSidebarHeaderAccordingToPathname = (pathname: string) => {
  if (pathname === "/") {
    return <SidebarDashboardHeader />;
  } else if (pathname.startsWith("/thread")) {
    return <SidebarThreadHeader />;
  } else return <SidebarDashboardHeader />;
};

export const getTabContentAccordingToActiveTab = (
  activeTab: ActiveTab,
  threadId: string,
  conversationData: typeof conversation.$inferInsert,
) => {
  switch (activeTab) {
    case "Answer":
      return (
        <ThreadAnswerTab id={threadId} conversationData={conversationData} />
      );
    case "Images":
      return (
        <ThreadImagesTab id={threadId} conversationData={conversationData} />
      );
    case "Videos":
      return (
        <ThreadVideosTab id={threadId} conversationData={conversationData} />
      );
    case "Sources":
      return (
        <ThreadSourcesTab id={threadId} conversationData={conversationData} />
      );
    default:
      return (
        <ThreadAnswerTab id={threadId} conversationData={conversationData} />
      );
  }
};
