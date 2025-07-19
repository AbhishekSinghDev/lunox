import { api } from "@/trpc/react";

const useThread = (id: string) => {
  const [thread] = api.library.getById.useSuspenseQuery({ id });

  return {
    thread: thread,
  };
};

export default useThread;
