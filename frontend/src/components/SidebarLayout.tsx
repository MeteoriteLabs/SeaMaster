"use client";

import React from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import Sidebar from "./CommonSidebar";
import AccountDropdown from "./AccountDropdown";

interface SidebarLayoutProps {
  menuItems: { name: string; icon: React.ReactNode }[];
  footerItems?: { name: string; icon: React.ReactNode }[];
  children: React.ReactNode;
  middleContent?: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  menuItems,
  footerItems = [],
  children,
  middleContent,
}) => {
  return (
    <div className="flex h-full">
      <SidebarProvider>
        <Sidebar menuItems={menuItems} footerItems={footerItems} />
        <main className="flex-1">
          <header className="flex items-center justify-between my-2">
            <SidebarTrigger className="ml-3 bg-background hover:bg-muted h-8 w-8" />
            <div className="mx-auto">{middleContent}</div>
            <div className="mr-3">
              <AccountDropdown />
            </div>
          </header>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default SidebarLayout;
