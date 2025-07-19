import ThreadDetails from "@/components/thread/thread-details";
import { api, HydrateClient } from "@/trpc/server";

interface ThreadDetailPageProps {
  params: Promise<{ id: string }>;
}

const ThreadDetailPage = async (props: ThreadDetailPageProps) => {
  const { id } = await props.params;

  void api.library.getById.prefetch({ id });

  return (
    <HydrateClient>
      <ThreadDetails id={id} />
    </HydrateClient>
  );
};

export default ThreadDetailPage;
