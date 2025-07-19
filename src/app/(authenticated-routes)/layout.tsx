import AuthenticatedProvidersWrapper from "@/providers/authenticated-providers-wrapper";
import "@/styles/globals.css";

import { type Metadata } from "next";
import { Outfit } from "next/font/google";

export const metadata: Metadata = {
  title: "Lunox",
  description:
    "A modern, web search engine built with Next.js and TypeScript powered with AI.",
  icons: [{ rel: "icon", url: "/static/logo/lunox.ico" }],
};

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${outfit.className} no-scrollbar`}
      suppressHydrationWarning
    >
      <body>
        <AuthenticatedProvidersWrapper>
          {children}
        </AuthenticatedProvidersWrapper>
      </body>
    </html>
  );
}
