import SidebarHeaderWrapper from "@/components/shared/sidebar-header-wrapper";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { api, HydrateClient } from "@/trpc/server";

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  void api.library.getAll.prefetch();

  return (
    <HydrateClient>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background dark:bg-secondary">
          <SidebarHeaderWrapper />
          <div className="flex max-h-[calc(100vh-5rem)] flex-1 flex-col gap-4 overflow-hidden p-4 pt-0 pb-0 lg:pb-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </HydrateClient>
  );
};

export default SidebarWrapper;
