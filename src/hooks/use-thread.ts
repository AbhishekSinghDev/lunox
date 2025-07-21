import { api } from "@/trpc/react";

const useThread = (id: string) => {
  const { data, isPending, isRefetching, isError } =
    api.library.getById.useQuery(
      { id },
      {
        refetchInterval(data) {
          if (
            data?.state?.data?.conversations.at(-1)?.aiResponse &&
            data.state.data.conversations.at(-1)?.webSearchResult?.at(-1)
          ) {
            return false;
          }

          return 1000;
        },
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
      },
    );

  return {
    thread: data,
    isPending,
    isError,
    isRefetching,
  };
};

export default useThread;
