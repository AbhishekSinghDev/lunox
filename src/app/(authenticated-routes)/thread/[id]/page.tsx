import { api, HydrateClient } from "@/trpc/server";

interface ThreadDetailPageProps {
  params: Promise<{ id: string }>;
}

const ThreadDetailPage = async (props: ThreadDetailPageProps) => {
  const { id } = await props.params;

  void api.library.getById.prefetch({ id });

  return (
    <HydrateClient>
      <div>ThreadDetailPage {id}</div>
    </HydrateClient>
  );
};

export default ThreadDetailPage;
