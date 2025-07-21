"use client";

import useThread from "@/hooks/use-thread";
import React from "react";
import { Separator } from "../ui/separator";
import ThreadContent from "./thread-content";
import ThreadError from "./thread-error";
import ThreadInputBox from "./thread-input-box";
import ThreadSkeleton from "./thread-skeleton";
import ThreadTabs from "./thread-tabs";

interface ThreadDetailsProps {
  id: string;
}

const ThreadDetails = ({ id }: ThreadDetailsProps) => {
  const { thread, isPending, isError } = useThread(id);

  return (
    <div className="relative mx-auto h-full w-full max-w-full">
      <div className="z-10 max-h-full overflow-y-auto">
        {isPending ? (
          <ThreadSkeleton />
        ) : isError ? (
          <ThreadError />
        ) : (
          thread?.conversations.map((item, idx) => (
            <React.Fragment key={idx}>
              <div>
                <h1 className="group/query font-display text-textMain selection:bg-super/50 selection:text-textMain dark:selection:bg-super/10 dark:selection:text-super relative mx-auto text-xl font-[475] !text-wrap text-pretty break-words [word-break:break-word] whitespace-pre-line md:max-w-[760px] lg:text-3xl dark:font-[450]">
                  {item.userQuery}
                </h1>

                <ThreadTabs conversation={item} />

                <ThreadContent id={id} conversation={item} />
              </div>

              <Separator className="dark:bg-accent bg-accent-foreground mx-auto mb-8 w-full md:max-w-[760px]" />
            </React.Fragment>
          ))
        )}

        <div className="h-[100px]" />
      </div>

      <ThreadInputBox />
    </div>
  );
};

export default ThreadDetails;
