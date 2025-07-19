"use client";

import useThread from "@/hooks/use-thread";
import ThreadContent from "./thread-content";
import ThreadInputBox from "./thread-input-box";
import ThreadTabs from "./thread-tabs";

interface ThreadDetailsProps {
  id: string;
}

const ThreadDetails = ({ id }: ThreadDetailsProps) => {
  const { thread } = useThread(id);

  return (
    <div className="mx-auto h-full w-full max-w-full">
      <h1 className="group/query font-display text-textMain selection:bg-super/50 selection:text-textMain dark:selection:bg-super/10 dark:selection:text-super relative mx-auto text-xl font-[475] !text-wrap text-pretty break-words [word-break:break-word] whitespace-pre-line md:max-w-[760px] lg:text-3xl dark:font-[450]">
        {thread.content}
      </h1>

      <ThreadTabs />

      <ThreadContent id={id} />

      <ThreadInputBox />
    </div>
  );
};

export default ThreadDetails;
