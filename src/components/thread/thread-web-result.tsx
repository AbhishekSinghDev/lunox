import type { ParsedSearchResult } from "@/lib/type";
import Image from "next/image";
import Link from "next/link";

interface ThreadContentProps {
  webResult?: ParsedSearchResult[];
}

const ThreadWebResult = ({ webResult }: ThreadContentProps) => {
  if (!webResult || webResult.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {webResult.slice(0, 6).map((item, idx) => (
          <Link
            key={idx}
            href={item.url}
            target="_blank"
            className="bg-accent/80 hover:bg-accent/60 w-full cursor-pointer rounded-lg p-3"
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

export default ThreadWebResult;
