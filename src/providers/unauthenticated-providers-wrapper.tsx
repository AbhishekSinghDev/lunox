import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "sonner";
import ThemeProvider from "./theme-provider";

const UnAuthenticatedProvidersWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </TRPCReactProvider>
  );
};

export default UnAuthenticatedProvidersWrapper;
