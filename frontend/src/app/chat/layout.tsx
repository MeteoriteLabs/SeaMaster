"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useTheme } from "next-themes";

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
                <div className="w-10 h-10 rounded-full mr-3">
                  <img
                    src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
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
