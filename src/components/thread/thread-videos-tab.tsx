import { type conversation } from "@/server/db/schema";
import Image from "next/image";

interface ThreadVideosTabProps {
  conversationData?: typeof conversation.$inferInsert;
}

const ThreadVideosTab = ({ conversationData }: ThreadVideosTabProps) => {
  // Function to extract YouTube video ID from various YouTube URL formats
  const getYouTubeVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1] ?? "";
    }
    return null;
  };

  // Filter and process YouTube videos
  const youtubeVideos =
    conversationData?.webSearchResult
      ?.filter((item) => {
        return item.url.includes("youtube") && getYouTubeVideoId(item.url);
      })
      .map((item) => ({
        ...item,
        videoId: getYouTubeVideoId(item.url),
      })) ?? [];

  if (youtubeVideos.length === 0) {
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
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-black dark:text-white">
            No videos found
          </h3>
          <p className="max-w-sm text-gray-500">
            There are no video results available for this conversation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {youtubeVideos.map((item, idx) => (
          <div key={idx} className="w-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
              {item.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${item.videoId}`}
                  title={item.title || `YouTube video ${idx + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : (
                // Fallback for non-embeddable YouTube content (like channels)
                <div className="relative h-full w-full">
                  {item.img && (
                    <Image
                      src={item.img}
                      alt={item.title ?? "Video thumbnail"}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              )}
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

export default ThreadVideosTab;
