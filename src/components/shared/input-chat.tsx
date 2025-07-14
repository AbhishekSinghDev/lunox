import type React from "react";

const InputChat = ({
  ...props
}: React.InputHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      {...props}
      className="no-scrollbar max-h-[200px] w-full px-1 pb-4 outline-none"
    />
  );
};

export default InputChat;
