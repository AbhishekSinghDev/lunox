import { api } from "@/trpc/react";

const useThread = (id: string) => {
  const { data, isPending, isError } = api.library.getById.useQuery(
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
    },
  );

  return {
    thread: data,
    isPending,
    isError,
  };
};

export default useThread;
