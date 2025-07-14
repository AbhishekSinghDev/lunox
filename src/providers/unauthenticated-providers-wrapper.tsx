import { TRPCReactProvider } from "@/trpc/react";
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
      </ThemeProvider>
    </TRPCReactProvider>
  );
};

export default UnAuthenticatedProvidersWrapper;
