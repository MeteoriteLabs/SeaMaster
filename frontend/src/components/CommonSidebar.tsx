import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Moon, Sun, ToggleLeft, ToggleRight } from "lucide-react";
import { useTheme } from "next-themes";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
}

interface FooterItem {
  name: string;
  icon: React.ReactNode;
}

interface CommonSidebarProps {
  menuItems: MenuItem[];
  footerItems: FooterItem[];
}

export default function CommonSidebar({
  menuItems,
  footerItems,
}: CommonSidebarProps) {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Sidebar className="px-3 bg-background">
      {/* Sidebar Header */}
      <SidebarHeader className="font-inter px-4">
        <img
          className="mx-auto mt-3 mb-5"
          src={
            theme === "dark"
              ? "sea-master-logo.svg"
              : "sea-master-logo-light.svg"
          }
          alt="sea-master-logo"
        />
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="font-inter">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={index} className="cursor-pointer">
                  <SidebarMenuButton asChild>
                    <div className="flex items-center mb-2">
                      <div className="mr-2">{item.icon}</div>
                      <p className="text-base font-normal">{item.name}</p>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="font-inter px-5">
        <div className="my-3 text-sm font-normal">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center">
              {resolvedTheme === "light" ? (
                <Moon
                  size={22}
                  className="mr-3 transition-transform duration-300 ease-in-out"
                />
              ) : (
                <Sun
                  size={22}
                  className="mr-3 transition-transform duration-300 ease-in-out"
                />
              )}
              {resolvedTheme === "light" ? (
                <p className="transition-colors duration-300 ease-in-out text-base">
                  Dark Mode
                </p>
              ) : (
                <p className="transition-colors duration-300 ease-in-out text-base">
                  Light Mode
                </p>
              )}
            </div>
            <div className="cursor-pointer">
              {resolvedTheme === "light" ? (
                <ToggleLeft
                  size={22}
                  className="transition-transform duration-300 ease-in-out"
                  onClick={() => setTheme("dark")}
                />
              ) : (
                <ToggleRight
                  size={22}
                  className="transition-transform duration-300 ease-in-out"
                  onClick={() => setTheme("light")}
                />
              )}
            </div>
          </div>

          {/* Dynamic Footer Items */}
          {footerItems.map((item, index) => (
            <div key={index} className="flex items-center my-4">
              <div className="mr-2">{item.icon}</div>
              <p className="text-base">{item.name}</p>
            </div>
          ))}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
