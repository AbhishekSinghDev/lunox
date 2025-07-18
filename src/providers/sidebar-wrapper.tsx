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
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </HydrateClient>
  );
};

export default SidebarWrapper;
