import { Textarea } from "../ui/textarea";

const ThreadInputBox = () => {
  return (
    <div className="absolute bottom-0 left-1/2 z-20 w-full max-w-[760px] -translate-x-1/2 px-4 pt-4 pb-2">
      <div className="mx-auto h-[98px] max-w-[760px]">
        <Textarea className="h-full rounded-xl focus-visible:ring-0" />
      </div>
    </div>
  );
};

export default ThreadInputBox;
