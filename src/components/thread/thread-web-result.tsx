import type { ParsedSearchResult } from "@/lib/type";
import Image from "next/image";
import Link from "next/link";

interface ThreadContentProps {
  webResult?: ParsedSearchResult[];
}

const ThreadWebResult = ({ webResult }: ThreadContentProps) => {
  return (
    <div className="no-scrollbar flex flex-wrap items-center gap-3 overflow-x-auto">
      {webResult?.map((item, idx) => (
        <Link
          key={idx}
          href={item.url}
          target="_blank"
          className="bg-accent/80 hover:bg-accent/60 max-w-[220px] min-w-[220px] cursor-pointer rounded-lg p-3"
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
  );
};

export default ThreadWebResult;
