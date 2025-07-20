import type { conversation } from "@/server/db/schema";
import Image from "next/image";
import { memo } from "react";

interface ThreadImagesTabProps {
  conversationData?: typeof conversation.$inferInsert;
}

const ThreadImagesTab = ({ conversationData }: ThreadImagesTabProps) => {
  const images =
    conversationData?.webSearchResult?.filter((item) => item.img) ?? [];

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-black dark:text-white">
            No images found
          </h3>
          <p className="max-w-sm text-gray-500">
            There are no image results available for this conversation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {images.map((item, idx) => (
          <div key={idx} className="w-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={item.img!}
                alt={item.title ?? "Search result image"}
                fill
                className="object-cover"
              />
            </div>
            {item.title && (
              <div className="mt-2">
                <h4 className="line-clamp-2 text-sm font-medium text-gray-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs text-gray-500">{item.source}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ThreadImagesTab);
