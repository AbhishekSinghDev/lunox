"use client";

import { getSidebarHeaderAccordingToPathname } from "@/lib/utils";
import { usePathname } from "next/navigation";

const SidebarHeaderWrapper = () => {
  const pathname = usePathname();

  return <>{getSidebarHeaderAccordingToPathname(pathname)}</>;
};

export default SidebarHeaderWrapper;
