"use client";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import { Toaster } from "@/components/ui/sonner";
import Loader from "@/components/Loader";
import useLoadingStore from "@/store/loadingStore";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useLoadingStore();
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ApolloProvider client={client}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main>
              <div className="2xl:container global-parent bg-background border-border">
                {children}
                <Toaster />
                {loading && <Loader />}
              </div>
            </main>
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
