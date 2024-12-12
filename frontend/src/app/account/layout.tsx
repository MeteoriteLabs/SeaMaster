"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/CommonSidebar";
import { Settings, User } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarmenuItems = [
    { name: "My Account", icon: <User /> },
    { name: "Settings", icon: <Settings /> },
  ];

  return (
    <section className="h-screen w-screen overflow-hidden bg-background text-foreground">
      <div className="flex h-full">
        <SidebarProvider>
          <Sidebar menuItems={sidebarmenuItems} footerItems={[]} />
          <main className="flex-1 min-h-screen overflow-y-auto">
            <header className="sticky top-0 z-10 py-3 px-4 flex items-center justify-between">
              <SidebarTrigger className="h-8 w-8 p-1 hover:bg-sea-master-light rounded-full" />
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </header>
            {children}
          </main>
        </SidebarProvider>
      </div>
    </section>
  );
}
