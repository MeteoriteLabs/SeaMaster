"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/CommonSidebar";
import { Settings, User } from "lucide-react";
import AccountDropdown from "@/components/AccountDropdown";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarmenuItems = [
    { name: "My Profile", icon: <User /> },
    { name: "Settings", icon: <Settings /> },
  ];

  return (
    <section className="h-screen w-screen overflow-hidden bg-background text-foreground">
      <div className="flex h-full">
        <SidebarProvider>
          <Sidebar menuItems={sidebarmenuItems} footerItems={[]} />
          <main className="flex-1 min-h-screen overflow-y-auto">
            <header className="sticky top-0 z-10 py-3 px-4 flex items-center justify-between">
              <SidebarTrigger className="h-8 w-8 p-1 hover:bg-muted rounded-full" />
              <AccountDropdown />
            </header>
            {children}
          </main>
        </SidebarProvider>
      </div>
    </section>
  );
}
