import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const ThreadSkeleton = () => {
  return (
    <div className="relative mx-auto h-full w-full max-w-full">
      <div className="z-10 max-h-full overflow-y-auto">
        {/* Render 2-3 conversation skeletons */}
        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx}>
            {/* Query Title Skeleton */}
            <div className="mx-auto md:max-w-[760px]">
              <Skeleton className="mb-2 h-8 w-3/4" />
              <Skeleton className="mb-4 h-6 w-1/2 lg:hidden" />
            </div>

            {/* Tabs Skeleton */}
            <div className="mx-auto mt-6 flex items-center gap-x-2 border-b border-b-gray-700 pb-2 md:max-w-[760px]">
              {Array.from({ length: 3 }).map((_, tabIdx) => (
                <div key={tabIdx} className="flex items-center gap-1 px-2 py-1">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-12" />
                  {tabIdx === 1 && (
                    <Skeleton className="ml-1 h-4 w-6 rounded-full" />
                  )}
                </div>
              ))}
            </div>

            {/* Content Skeleton */}
            <div className="no-scrollbar relative mt-6 max-h-[calc(100vh-20rem)] overflow-y-auto">
              <div className="mx-auto space-y-4 md:max-w-[760px]">
                {/* Response content skeleton */}
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                {/* Code block skeleton */}
                <div className="bg-muted space-y-2 rounded-lg p-4">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/5" />
                </div>

                {/* More content */}
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Sources skeleton (for web search results) */}
                <div className="mt-6 grid gap-3">
                  {Array.from({ length: 3 }).map((_, sourceIdx) => (
                    <div
                      key={sourceIdx}
                      className="space-y-2 rounded-lg border p-3"
                    >
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-5/6" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-[50px]" />
            </div>

            <Separator className="dark:bg-accent bg-accent-foreground mx-auto mb-8 w-full md:max-w-[760px]" />
          </div>
        ))}

        {/* Active typing skeleton */}
        <div className="mx-auto md:max-w-[760px]">
          <Skeleton className="mb-6 h-8 w-2/3" />
          <div className="mx-auto mt-6 flex items-center gap-x-2 border-b border-b-gray-700 pb-2 md:max-w-[760px]">
            {Array.from({ length: 3 }).map((_, tabIdx) => (
              <div key={tabIdx} className="flex items-center gap-1 px-2 py-1">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {/* Typing indicator */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="bg-muted-foreground/50 h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
                <div className="bg-muted-foreground/50 h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
                <div className="bg-muted-foreground/50 h-2 w-2 animate-bounce rounded-full"></div>
              </div>
              <span className="text-muted-foreground text-sm">
                AI is thinking...
              </span>
            </div>
          </div>
        </div>

        <div className="h-[100px]" />
      </div>

      {/* Input Box Skeleton */}
      <div className="absolute bottom-0 left-1/2 z-50 w-full -translate-x-1/2 overflow-hidden md:max-w-[900px]">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden bg-gradient-to-t to-transparent backdrop-blur-sm" />
        <div className="border-border relative mx-auto h-[98px] overflow-hidden rounded-2xl border shadow-lg backdrop-blur-md">
          <div className="h-full p-4">
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadSkeleton;
