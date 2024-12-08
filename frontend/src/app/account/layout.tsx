"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/CommonSidebar";
import { Settings, User, UserCircleIcon } from "lucide-react";

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
    <>
      <section className="h-screen w-screen overflow-hidden">
        <div className="flex h-full">
          <SidebarProvider>
            <Sidebar menuItems={sidebarmenuItems} footerItems={[]} />
            <main className={`bg-sea-master-blue flex-1`}>
              <header className="flex items-center justify-between my-3">
                <SidebarTrigger className="ml-3 mb-[-3px] hover:bg-sea-master-blue h-8 w-8" />
                <div className="w-10 h-10 rounded-full mr-3 border-gray-300">
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
