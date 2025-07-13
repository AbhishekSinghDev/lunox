import { TRPCReactProvider } from "@/trpc/react";
import SidebarWrapper from "./sidebar-wrapper";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <SidebarWrapper>{children}</SidebarWrapper>
    </TRPCReactProvider>
  );
};

export default Providers;
