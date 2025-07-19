"use client";

import { getTabContentAccordingToActiveTab } from "@/lib/utils";
import { useActiveTab } from "@/stores/thread";

interface ThreadContentProps {
  id: string;
}

const ThreadContent = ({ id }: ThreadContentProps) => {
  const { activeTab } = useActiveTab();
  const ActiveTabComponent = getTabContentAccordingToActiveTab(activeTab, id);

  return (
    <div className="relative mt-6 max-h-[calc(100vh-20rem)] overflow-y-auto">
      {ActiveTabComponent}

      <div className="h-[50px]" />
    </div>
  );
};

export default ThreadContent;
