"use client";

import type { AiResponse } from "@/lib/type";
import { type conversation } from "@/server/db/schema";

import ThreadAiResponse from "./thread-ai-response";
import ThreadWebResult from "./thread-web-result";

interface ThreadAnswerTabProps {
  conversationData?: typeof conversation.$inferInsert;
}

const ThreadAnswerTab = ({ conversationData }: ThreadAnswerTabProps) => {
  return (
    <div className="mx-auto flex flex-col gap-y-6 md:max-w-[760px]">
      {/* web result  */}
      <ThreadWebResult
        webResult={conversationData?.webSearchResult ?? undefined}
      />

      {/* ai response */}
      <ThreadAiResponse
        AiResponse={
          JSON.parse(conversationData?.aiResponse ?? "{}") as AiResponse
        }
      />
    </div>
  );
};

export default ThreadAnswerTab;
