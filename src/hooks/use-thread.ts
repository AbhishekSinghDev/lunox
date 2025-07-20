import { api } from "@/trpc/react";

const useThread = (id: string) => {
  const { data, isLoading, isError } = api.library.getById.useQuery(
    { id },
    {
      refetchInterval(data) {
        if (data.state.data?.id) {
          return false;
        }

        return 1000;
      },
    },
  );

  return {
    thread: data,
    isLoading,
    isError,
  };
};

export default useThread;
