"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/AdminSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="h-screen w-screen overflow-hidden">
        <div className="flex h-full">
          <SidebarProvider>
            <AdminSidebar />
            <main className={`bg-sea-master-blue-medium flex-1`}>
              <header className="flex items-center justify-between my-3">
                <SidebarTrigger className="ml-3 mb-[-3px] hover:bg-sea-master-blue h-8 w-8" />
                <img className="mx-auto" src="logo.svg" alt="logo" />
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
