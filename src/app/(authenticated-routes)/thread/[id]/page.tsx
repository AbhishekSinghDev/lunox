import ThreadDetails from "@/components/thread/thread-details";
import { api, HydrateClient } from "@/trpc/server";
import { Suspense } from "react";

interface ThreadDetailPageProps {
  params: Promise<{ id: string }>;
}

const ThreadDetailPage = async (props: ThreadDetailPageProps) => {
  const { id } = await props.params;

  void api.library.getById.prefetch({ id });

  return (
    <HydrateClient>
      <Suspense fallback={<div>loading...</div>}>
        <ThreadDetails id={id} />
      </Suspense>
    </HydrateClient>
  );
};

export default ThreadDetailPage;
