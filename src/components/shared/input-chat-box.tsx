import { CHAT_OPTIONS, CHAT_TABS } from "@/lib/constants";
import TabWrapper from "./tab-wrapper";
import TooltipWrapper from "./tooltip-wrapper";

const InputChatBox = () => {
  return (
    <div className="relative w-full max-w-2xl rounded-2xl border p-3">
      <div className="flex items-end justify-between">
        {/* search and research buttons with input box as tabs content */}
        <TabWrapper tabs={CHAT_TABS} defaultValue="search" />

        {/* options for AI model, language, and file attachment */}
        <div className="absolute right-3 bottom-3">
          {CHAT_OPTIONS.map((item, idx) => (
            <TooltipWrapper
              key={idx}
              trigger={item.trigger}
              content={item.content}
              asChild
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputChatBox;
