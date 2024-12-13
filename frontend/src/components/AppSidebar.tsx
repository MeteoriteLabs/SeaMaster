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
    <Sidebar className="px-4 bg-background">
      <SidebarHeader className="bg-background text-foreground font-inter">
        <img
          className="mx-auto mt-2 mb-2"
          src={
            theme === "dark"
              ? "sea-master-logo.svg"
              : "sea-master-logo-light.svg"
          }
          alt="logo"
        />
        <div className="flex items-center justify-between gap-3 my-4">
          <Button className="w-full bg-background rounded-xl border border-border hover:bg-muted hover:outline hover:outline-2 hover:outline-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-background focus-visible:ring-0 shadow-none p-2 font-bold text-foreground">
            Chats
          </Button>
          <Button className="w-full bg-background rounded-xl border border-border hover:bg-muted hover:outline hover:outline-2 hover:outline-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-background focus-visible:ring-0 shadow-none p-2 font-bold text-foreground">
            Notes
          </Button>
        </div>
        <Button className="w-full bg-background text-foreground hover:bg-background hover:text-muted-foreground focus-visible:ring-0 focus:outline-none rounded-xl">
          <span>{<Plus />}</span>New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent className="bg-background text-foreground font-inter">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center justify-between mb-1">
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
      <SidebarFooter className="bg-background text-foreground font-inter">
        <div className="my-3 text-base font-normal">
          <Button
            size={"sm"}
            className="w-full bg-background text-foreground hover:bg-background hover:text-muted-foreground focus-visible:ring-0 focus:outline-none text-xs font-semibold rounded-full"
          >
            500/1000 tokens
          </Button>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center justify-between">
              {theme === "light" ? (
                <Moon
                  size={20}
                  className="mr-3 transition-transform duration-300 ease-in-out"
                />
              ) : (
                <Sun
                  size={20}
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
          <div className="flex items-center my-4 cursor-pointer">
            <Settings size={20} className="mr-3" />
            <p>Settings</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
