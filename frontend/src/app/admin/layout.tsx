"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/CommonSidebar";
import { File, FileChartColumn, UserCircleIcon } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarmenuItems = [
    { name: "Training Database", icon: <File /> },
    { name: "Analysis", icon: <FileChartColumn /> },
  ];

  const sidearfooterItems = [{ name: "Super Admin", icon: <UserCircleIcon /> }];
  return (
    <>
      <section className="h-screen w-screen overflow-hidden">
        <div className="flex h-full">
          <SidebarProvider>
            <Sidebar
              menuItems={sidebarmenuItems}
              footerItems={sidearfooterItems}
            />
            <main className={`bg-background flex-1`}>
              <header className="flex items-center justify-between my-3">
                <SidebarTrigger className="ml-3 mb-[-3px] bg-background hover:bg-muted h-8 w-8" />
                <div>
                  <h1 className="text-2xl font-bold font-inter">Super Admin</h1>
                </div>
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
