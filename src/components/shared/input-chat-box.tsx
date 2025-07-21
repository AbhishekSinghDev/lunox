"use client";

import ChatOptionsButtons from "./chat-options-buttons";
import ChatTypeTabs from "./chat-type-tabs";
import InputChat from "./input-chat";

const InputChatBox = () => {
  return (
    <div className="bg-background relative flex w-full max-w-2xl flex-col gap-y-4 rounded-2xl border p-3">
      {/* Chat type toggle buttons */}
      <div className="flex items-center justify-between">
        <ChatTypeTabs />

        {/* Options buttons */}
        <ChatOptionsButtons />
      </div>

      {/* Main input area */}
      <InputChat />
    </div>
  );
};

export default InputChatBox;
