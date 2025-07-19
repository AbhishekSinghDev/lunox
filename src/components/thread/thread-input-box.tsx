import { Textarea } from "../ui/textarea";

const ThreadInputBox = () => {
  return (
    <div className="z-20">
      <div className="mx-auto h-[98px] max-w-[760px]">
        <Textarea className="h-full rounded-xl focus-visible:ring-0" />
      </div>
    </div>
  );
};

export default ThreadInputBox;
