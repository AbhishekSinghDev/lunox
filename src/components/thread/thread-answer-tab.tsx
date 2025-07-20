"use client";

import { INNGEST_ID_PARAM } from "@/lib/constants";
import { type conversation } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { skipToken } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import { useQueryState } from "nuqs";
import { useEffect } from "react";

interface ThreadAnswerTabProps {
  id: string;
  conversationData?: typeof conversation.$inferInsert;
}

const ThreadAnswerTab = ({ id, conversationData }: ThreadAnswerTabProps) => {
  const trpcUtils = api.useUtils();
  const [inngestId] = useQueryState(INNGEST_ID_PARAM, {
    clearOnDefault: true,
  });

  const { data: inngestRes, isLoading: isLoadingInngestRunResult } =
    api.inngest.getRunById.useQuery(inngestId ? { inngestId } : skipToken, {
      enabled:
        !!inngestId &&
        !conversationData?.webSearchResult &&
        !conversationData?.aiResponse,
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
    }
  }, [inngestRes?.status, trpcUtils]);

  if (isLoadingInngestRunResult || inngestRes?.status === "Running") {
    return (
      <div className="mx-auto max-w-[760px] p-4 text-center">Loading...</div>
    );
  }

  return (
    <div className="mx-auto md:max-w-[760px]">
      {/* sources links  */}
      <div className="no-scrollbar flex flex-wrap items-center gap-3 overflow-x-auto">
        {conversationData?.webSearchResult?.map((item, idx) => (
          <Link
            key={idx}
            href={item.url}
            target="_blank"
            className="bg-accent/80 hover:bg-accent/60 max-w-[220px] min-w-[220px] cursor-pointer rounded-lg p-3"
          >
            <div className="flex items-center gap-2">
              <div className="relative aspect-square w-4 overflow-hidden rounded-[2px]">
                <Image
                  src={item.img ?? "/imgs/placeholder.jpg"}
                  alt={item.source ?? "Placeholder Image"}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="line-clamp-1 text-xs">{item.source}</span>
            </div>
            {item.description && (
              <span
                dangerouslySetInnerHTML={{ __html: item.description }}
                className="line-clamp-2 pt-2 text-xs"
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ThreadAnswerTab;
