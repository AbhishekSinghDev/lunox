import useThread from "@/hooks/use-thread";
import Image from "next/image";
import Link from "next/link";

interface ThreadAnswerTabProps {
  id: string;
}

const ThreadAnswerTab = ({ id }: ThreadAnswerTabProps) => {
  const { thread } = useThread(id);

  return (
    <div className="mx-auto md:max-w-[760px]">
      {/* sources links  */}
      <div className="flex flex-wrap items-center gap-3">
        {thread.conversations?.webSearchResult?.map((item, idx) => (
          <Link
            key={idx}
            href={item.url}
            target="_blank"
            className="bg-accent/80 hover:bg-accent/60 w-[220px] cursor-pointer rounded-lg p-3"
          >
            <div className="flex items-center gap-2">
              <div className="relative aspect-square w-4 overflow-hidden rounded-[2px]">
                <Image
                  src={item.img ?? "/imgs/placeholder.jpg"}
                  alt={item.source ?? "Placeholder Image"}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="line-clamp-1 text-xs">{item.source}</span>
            </div>
            {item.description && (
              <span
                dangerouslySetInnerHTML={{ __html: item.description }}
                className="line-clamp-2 pt-2 text-xs"
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ThreadAnswerTab;
