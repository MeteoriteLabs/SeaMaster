"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import AccountDropdown from "@/components/AccountDropdown";
import Image from "next/image";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-screen overflow-hidden">
      <div className="flex h-full">
        <SidebarProvider>
          <AppSidebar />
          <main className={`bg-muted flex-1`}>
            <header className="flex items-center justify-between my-3">
              <SidebarTrigger className="ml-3 mb-[-3px] hover:bg-background h-8 w-8" />
              <Image
                className="dark:hidden"
                src="sea-master-logo-light.svg"
                width={160}
                height={160}
                alt="sea-master-logo-light"
              />
              <Image
                className="hidden dark:block"
                src="sea-master-logo.svg"
                width={160}
                height={160}
                alt="sea-master-logo-dark"
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
  );
}
