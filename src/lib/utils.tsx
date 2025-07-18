import SidebarDashboardHeader from "@/components/shared/sidebar-dashboard-header";
import SidebarThreadHeader from "@/components/shared/sidebar-thread-header";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
