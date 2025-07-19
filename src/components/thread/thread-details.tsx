"use client";

import { api } from "@/trpc/react";
import ThreadTabs from "./thread-tabs";

interface ThreadDetailsProps {
  id: string;
}

const ThreadDetails = ({ id }: ThreadDetailsProps) => {
  const [thread] = api.library.getById.useSuspenseQuery({ id });

  return (
    <div className="mx-auto mt-7 h-full w-full max-w-5xl">
      <h1 className="group/query font-display text-textMain selection:bg-super/50 selection:text-textMain dark:selection:bg-super/10 dark:selection:text-super relative text-xl font-[475] !text-wrap text-pretty break-words [word-break:break-word] whitespace-pre-line lg:text-3xl dark:font-[450] md:max-w-[760px] mx-auto">
        {thread.content}
      </h1>

      <ThreadTabs />
    </div>
  );
};

export default ThreadDetails;
