import { TRPCReactProvider } from "@/trpc/react";
import SidebarWrapper from "./sidebar-wrapper";
import ThemeProvider from "./theme-provider";

import { NuqsAdapter } from "nuqs/adapters/next/app";

const AuthenticatedProvidersWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <TRPCReactProvider>
      <NuqsAdapter>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarWrapper>{children}</SidebarWrapper>
        </ThemeProvider>
      </NuqsAdapter>
    </TRPCReactProvider>
  );
};

export default AuthenticatedProvidersWrapper;
