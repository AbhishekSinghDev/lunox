import { type conversation } from "@/server/db/schema";
import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

interface ThreadSourcesTabProps {
  conversationData?: typeof conversation.$inferInsert;
}

const ThreadSourcesTab = ({ conversationData }: ThreadSourcesTabProps) => {
  const sources = conversationData?.webSearchResult ?? [];

  if (sources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center">
          <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <Globe className="text-muted-foreground h-8 w-8" />
          </div>
          <h3 className="text-foreground mb-2 text-lg font-medium">
            No sources found
          </h3>
          <p className="text-muted-foreground max-w-sm">
            There are no source results available for this conversation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4">
      <div className="space-y-4">
        {sources.map((item, idx) => (
          <div key={idx} className="group">
            <Link href={item.url} target="_blank" className="block">
              <div className="border-border bg-card hover:border-border/80 hover:bg-accent/50 rounded-lg border p-4 transition-all duration-200 hover:shadow-md">
                {/* Favicon and source */}
                <div className="mb-3 flex items-center gap-3">
                  <div className="relative h-5 w-5 flex-shrink-0">
                    {item.img ? (
                      <Image
                        src={item.img}
                        alt={`${item.source} favicon`}
                        fill
                        className="rounded-sm object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.nextElementSibling?.classList.remove("hidden");
                        }}
                      />
                    ) : null}
                    <Globe
                      className={`text-muted-foreground h-5 w-5 ${item.img ? "hidden" : ""}`}
                    />
                  </div>
                  <span className="text-muted-foreground text-sm font-medium">
                    {item.source}
                  </span>
                </div>

                {/* Title */}
                {item.title && (
                  <h3 className="text-foreground group-hover:text-primary mb-2 line-clamp-2 text-lg font-semibold transition-colors">
                    {item.title}
                  </h3>
                )}

                {/* Description */}
                {item.description && (
                  <p
                    className="text-muted-foreground mb-3 line-clamp-3 text-sm"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                )}

                {/* URL */}
                <div className="flex items-center">
                  <span className="text-primary/80 group-hover:text-primary truncate text-sm transition-colors">
                    {new URL(item.url).hostname}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ThreadSourcesTab);
