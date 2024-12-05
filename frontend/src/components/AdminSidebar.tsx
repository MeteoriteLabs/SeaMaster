import {
  File,
  FileChartColumn,
  MessageSquareText,
  Moon,
  Sun,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

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
import { useTheme } from "next-themes";

export default function AdminSidebar() {
  const { setTheme, theme } = useTheme();

  return (
    <Sidebar className="px-3">
      <SidebarHeader className="bg-sea-master-blue text-white font-inter px-4">
        <img className="mx-auto mt-3 mb-5" src="logo.svg" alt="logo" />
      </SidebarHeader>
      <SidebarContent className="bg-sea-master-blue text-white font-inter">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div className="flex items-center">
                    <File size={18} className="mr-2" />
                    <p className="text-sm font-light">Training Database</p>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div className="flex items-center">
                    <FileChartColumn size={18} className="mr-2" />
                    <p className="text-sm font-light">Analysis</p>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-sea-master-blue text-white font-inter px-5">
        <div className="my-3 text-sm font-normal">
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center">
              {theme === "light" ? (
                <Moon
                  size={18}
                  className="mr-3 transition-transform duration-300 ease-in-out"
                />
              ) : (
                <Sun
                  size={18}
                  className="mr-3 transition-transform duration-300 ease-in-out"
                />
              )}
              {theme === "light" ? (
                <p className="transition-colors duration-300 ease-in-out">
                  Dark Mode
                </p>
              ) : (
                <p className="transition-colors duration-300 ease-in-out">
                  Light Mode
                </p>
              )}
            </div>
            <div className="cursor-pointer">
              {theme === "light" ? (
                <ToggleLeft
                  size={20}
                  className="transition-transform duration-300 ease-in-out"
                  onClick={() => setTheme("dark")}
                />
              ) : (
                <ToggleRight
                  size={20}
                  className="transition-transform duration-300 ease-in-out"
                  onClick={() => setTheme("light")}
                />
              )}
            </div>
          </div>

          <div className="flex items-center my-4 -ml-1">
            <img
              src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="User Avatar"
              className="w-7 h-7 rounded-full mr-2"
            />
            <p>Super Admin</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
