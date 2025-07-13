import { TRPCReactProvider } from "@/trpc/react";
import SidebarWrapper from "./sidebar-wrapper";
import ThemeProvider from "./theme-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarWrapper>{children}</SidebarWrapper>
      </ThemeProvider>
    </TRPCReactProvider>
  );
};

export default Providers;
