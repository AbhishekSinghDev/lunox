import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { Copy, Loader2, MoreHorizontal, Share, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TooltipWrapper from "../shared/tooltip-wrapper";
import { SidebarMenuAction, useSidebar } from "../ui/sidebar";

interface ThreadHistoryActionsProps {
  threadId: string;
}

const ThreadHistoryActions = ({ threadId }: ThreadHistoryActionsProps) => {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const trpcUtils = api.useUtils();
  const { mutate: duplicateThread, isPending: isPendingDuplicateThread } =
    api.library.duplicate.useMutation();

  const { mutate: deleteThread, isPending: isPendingDeletingThread } =
    api.library.delete.useMutation();

  const handleDuplicateThread = () => {
    if (isPendingDuplicateThread) return;

    duplicateThread(
      { libId: threadId },
      {
        onSuccess: (opts) => {
          void trpcUtils.library.getAll.invalidate();
          router.push(`/thread/${opts.duplicateThreadId}`);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };

  const handleDeleteThread = () => {
    if (isPendingDeletingThread) return;

    deleteThread(
      { libId: threadId },
      {
        onSuccess: (opts) => {
          toast.success(opts.message);
          void trpcUtils.library.getAll.invalidate();
          router.push("/");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction showOnHover>
          <MoreHorizontal />
          <span className="sr-only">More</span>
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48"
        side={isMobile ? "bottom" : "right"}
        align={isMobile ? "end" : "start"}
      >
        <DropdownMenuItem
          onClick={handleDuplicateThread}
          className="cursor-pointer"
        >
          {isPendingDuplicateThread ? (
            <Loader2 className="text-muted-foreground animate-spin" />
          ) : (
            <Copy className="text-muted-foreground" />
          )}
          <span>Duplicate Thread</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <TooltipWrapper
            trigger={
              <div className="flex items-center gap-2">
                <Share className="text-muted-foreground" />
                <span>Share Thread</span>
              </div>
            }
            content="Coming soon!"
            asChild
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="group cursor-pointer text-red-600 focus:text-white"
          onClick={handleDeleteThread}
        >
          <Trash2 className="text-red-600 group-hover:text-white" />
          <span>Delete Thread</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThreadHistoryActions;
