import InputChatBox from "@/components/shared/input-chat-box";
import Image from "next/image";

const page = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center gap-4">
        <div className="relative aspect-square w-[60px]">
          <Image
            src="/static/logo/lunox.png"
            alt="lunox.ai"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-6xl font-semibold">Lunox</h1>
      </div>
      <InputChatBox />
    </main>
  );
};

export default page;
