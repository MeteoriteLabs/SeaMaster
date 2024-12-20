"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ChatSidebar from "@/components/ChatSidebar";
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
          <ChatSidebar />
          <main className={`bg-muted flex-1`}>
            <header className="flex items-center justify-between my-3">
              <SidebarTrigger className="ml-3 mb-[-3px] hover:bg-background h-8 w-8" />
              <Image
                className="dark:hidden"
                src="sea-master-logo-light.svg"
                width={120}
                height={120}
                alt="sea-master-logo-light"
              />
              <Image
                className="hidden dark:block"
                src="sea-master-logo.svg"
                width={120}
                height={120}
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
