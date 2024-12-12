"use client";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              <div className="2xl:container global-parent bg-sea-master-blue border-white">
                {children}
                <Toaster />
              </div>
            </main>
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
