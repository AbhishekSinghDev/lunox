"use client";

import { getTabContentAccordingToActiveTab } from "@/lib/utils";
import type { conversation } from "@/server/db/schema";
import { useActiveTab } from "@/stores/thread";

interface ThreadContentProps {
  id: string;
  conversation: typeof conversation.$inferInsert;
}

const ThreadContent = ({ id, conversation }: ThreadContentProps) => {
  const { activeTab } = useActiveTab();
  const ActiveTabComponent = getTabContentAccordingToActiveTab(
    activeTab,
    id,
    conversation,
  );

  return (
    <div className="relative mt-6 max-h-[calc(100vh-20rem)] overflow-y-auto">
      {ActiveTabComponent}

      <div className="h-[50px]" />
    </div>
  );
};

export default ThreadContent;
