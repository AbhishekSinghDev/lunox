"use client";

import { THREAD_DETAILS_TABS } from "@/lib/constants";
import type { ActiveTab } from "@/lib/type";
import { cn } from "@/lib/utils";
import { useActiveTab } from "@/stores/thread";

const ThreadTabs = () => {
  const { activeTab, setActiveTab } = useActiveTab();

  const handleActiveTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mx-auto mt-6 flex items-center gap-x-2 border-b border-b-gray-700 pb-2 md:max-w-[760px]">
      {THREAD_DETAILS_TABS.map((item) => (
        <button
          key={item.title}
          className={cn(
            "text-foreground hover:text-foreground/80 relative flex cursor-pointer items-center gap-1 px-2 py-1 text-sm font-medium",
            activeTab === item.title
              ? "text-foreground/80 dark:bg-background/60 bg-primary text-primary-foreground rounded-md"
              : "text-foreground",
          )}
          onClick={() => handleActiveTabChange(item.title)}
        >
          {<item.icon className="h-4 w-4" />}
          <span>{item.title}</span>
          {/* {item.badge && (
            <span className="ml-1 rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">
              {item.badge}
            </span>
          )} */}

          {/* {activeTab === item.title && (
            <span className="absolute -bottom-2 left-0 z-10 h-0.5 w-full rounded bg-yellow-500" />
          )} */}
        </button>
      ))}
    </div>
  );
};

export default ThreadTabs;
