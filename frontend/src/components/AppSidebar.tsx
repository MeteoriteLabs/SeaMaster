import {
  Ellipsis,
  MessageSquareText,
  Moon,
  Plus,
  Settings,
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
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

const items = [
  { name: "Boilers" },
  { name: "What is a hull" },
  { name: "Engine Working" },
];

export default function AppSidebar() {
  const { setTheme, theme } = useTheme();
  return (
    <Sidebar>
      <SidebarHeader className="bg-sea-master-blue text-white font-inter px-4">
        <img className="mx-auto mt-2 mb-2" src="logo.svg" alt="logo" />
        <div className="flex items-center justify-between gap-3 my-4">
          <Button className="w-full bg-inherit rounded-xl border border-white hover:bg-inherit hover:outline hover:outline-2 hover:outline-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:ring-0 shadow-none p-2 font-bold">
            Chats
          </Button>
          <Button className="w-full bg-inherit rounded-xl border border-white hover:bg-inherit hover:outline hover:outline-2 hover:outline-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:ring-0 shadow-none p-2 font-bold">
            Notes
          </Button>
        </div>
        <Button className="w-full bg-white text-gray-900 hover:bg-white hover:text-gray-900 focus-visible:ring-0 focus:outline-none rounded-xl">
          <span>{<Plus />}</span>New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent className="bg-sea-master-blue text-white font-inter">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-between">
                        <MessageSquareText size={18} className="mr-2" />
                        <p className="text-sm font-light">{item?.name}</p>
                      </div>
                      <Ellipsis size={18} />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-sea-master-blue text-white font-inter px-5">
        <div className="my-3 text-sm font-normal">
          <Button
            size={"sm"}
            className="w-full bg-white text-gray-900 hover:bg-white hover:text-gray-900 focus-visible:ring-0 focus:outline-none text-xs font-semibold rounded-full"
          >
            500/1000 tokens
          </Button>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center justify-between">
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
          <div className="flex items-center my-4">
            <Settings size={18} className="mr-3" />
            <p>Settings</p>
          </div>
          <div className="flex items-center my-4 -ml-1">
            <img
              src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="User Avatar"
              className="w-7 h-7 rounded-full mr-2"
            />
            <p>Account</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
