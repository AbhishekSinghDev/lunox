"use client";

import { getTabContentAccordingToActiveTab } from "@/lib/utils";
import type { conversation } from "@/server/db/schema";
import { useInngestId } from "@/stores/inngest-store";
import { useActiveTab } from "@/stores/thread-store";
import { api } from "@/trpc/react";
import { skipToken } from "@tanstack/react-query";
import { useEffect } from "react";

interface ThreadContentProps {
  id: string;
  conversation: typeof conversation.$inferInsert;
}

const ThreadContent = ({ id, conversation }: ThreadContentProps) => {
  const trpcUtils = api.useUtils();
  const { activeTab } = useActiveTab();
  const { inngestId, setInngestId } = useInngestId();

  const ActiveTabComponent = getTabContentAccordingToActiveTab(
    activeTab,
    id,
    conversation,
  );

  const { data: inngestRes, isLoading: isLoadingInngestRunResult } =
    api.inngest.getRunById.useQuery(inngestId ? { inngestId } : skipToken, {
      enabled:
        !!inngestId &&
        !conversation?.webSearchResult &&
        !conversation?.aiResponse,
      refetchInterval: (data) => {
        if (
          data.state.data?.status === "Completed" ||
          data.state.data?.status === "Cancelled"
        ) {
          return false;
        }

        return 1000;
      },
    });

  useEffect(() => {
    if (inngestRes?.status === "Completed") {
      void trpcUtils.library.getById.invalidate({ id });
      setInngestId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inngestRes?.status, trpcUtils]);

  if (isLoadingInngestRunResult || inngestRes?.status === "Running") {
    return (
      <div className="mx-auto p-4 text-center md:max-w-[760px]">Loading...</div>
    );
  }

  return (
    <div className="no-scrollbar relative mt-6 max-h-[calc(100vh-20rem)] overflow-y-auto">
      {ActiveTabComponent}

      <div className="h-[50px]" />
    </div>
  );
};

export default ThreadContent;
