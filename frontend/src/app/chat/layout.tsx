"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useTheme } from "next-themes";
import AccountDropdown from "@/components/AccountDropdown";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <>
      <section className="h-screen w-screen overflow-hidden">
        <div className="flex h-full">
          <SidebarProvider>
            <AppSidebar />
            <main className={`bg-muted flex-1`}>
              <header className="flex items-center justify-between my-3">
                <SidebarTrigger className="ml-3 mb-[-3px] hover:bg-background h-8 w-8" />
                <img
                  className="mx-auto"
                  src={
                    theme === "dark"
                      ? "sea-master-logo.svg"
                      : "sea-master-logo-light.svg"
                  }
                  alt="logo"
                />
                <div className="mr-3">
                  <AccountDropdown />
                </div>
              </header>
              {children}
            </main>
          </SidebarProvider>
        </div>
      </section>
    </>
  );
}
