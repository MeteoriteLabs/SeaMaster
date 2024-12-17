"use client";

import React, { useEffect } from "react";
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
import useChatStore from "@/store/chatStore";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CHATS } from "@/lib/queries";
import { CREATE_CHAT } from "@/lib/mutations";
import Loader from "./Loader";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";

export default function AppSidebar() {
  const { setTheme, theme } = useTheme();
  const { user } = useAuthStore();
  const { chats, activeChatId, setActiveChat, setChats } = useChatStore();
  const [createChat, { data: createdChat, loading: createChatLoading }] =
    useMutation(CREATE_CHAT);
  const {
    data: chatsData,
    loading: chatsLoading,
    error: chatsError,
    refetch: refetchChats,
  } = useQuery(GET_CHATS);

  useEffect(() => {
    if (chatsData && !chatsLoading && !chatsError) {
      const chats = chatsData.chats;
      setChats(
        chats.map((chat: any) => ({
          id: chat.documentId,
          name: chat.ConversationTitle,
          messages: [],
        }))
      );
    }
  }, [chatsData, chatsLoading, chatsError, refetchChats]);

  const handleCreateChat = async () => {
    try {
      const { data } = await createChat({
        variables: {
          data: {
            ConversationTitle: `Untitled Chat ${chats.length + 1}`,
            account: user?.id || "",
            publishedAt: new Date().toISOString(),
          },
        },
      });
      await refetchChats();
      setActiveChat(data.createChat.documentId);
    } catch (error) {
      console.error("Error creating chat:", error);
      toast.error("Error creating chat");
    }
  };

  if (chatsLoading || createChatLoading) return <Loader />;

  return (
    <Sidebar className="px-4 bg-background">
      {/* Sidebar Header */}
      <SidebarHeader className="bg-background text-foreground font-inter">
        <div className="mx-auto my-2">
          <Image
            className="dark:hidden"
            src="sea-master-logo-light.svg"
            width={120}
            height={120}
            alt="sea-master-logo-light"
          />
          <Image
            className="hidden dark:block"
            src="sea-master-logo.svg"
            width={120}
            height={120}
            alt="sea-master-logo-dark"
          />
        </div>
        <div className="flex items-center justify-between gap-3 my-4">
          <Button className="w-full bg-background rounded-xl border border-border hover:bg-muted hover:outline hover:outline-2 hover:outline-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-background focus-visible:ring-0 shadow-none p-2 font-bold text-foreground">
            Chats
          </Button>
          <Button className="w-full bg-background rounded-xl border border-border hover:bg-muted hover:outline hover:outline-2 hover:outline-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-background focus-visible:ring-0 shadow-none p-2 font-bold text-foreground">
            Notes
          </Button>
        </div>
        <Button
          className="w-full bg-background-reverse text-foreground-reverse hover:text-muted-foreground focus-visible:ring-0 focus:outline-none rounded-xl"
          onClick={handleCreateChat}
        >
          <Plus className="mr-2" />
          New Chat
        </Button>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="bg-background text-foreground font-inter">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton asChild>
                    <div
                      className={`flex items-center justify-between mb-1 p-2 rounded-lg cursor-pointer ${
                        activeChatId === chat.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setActiveChat(chat.id)}
                    >
                      <div className="flex items-center justify-between">
                        <MessageSquareText size={18} className="mr-2" />
                        <p className="text-sm font-light">{chat.name}</p>
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

      {/* Sidebar Footer */}
      <SidebarFooter className="bg-background text-foreground font-inter">
        <div className="my-3 text-base font-normal">
          <Button
            size={"sm"}
            className="w-full bg-background-reverse text-foreground-reverse hover:text-muted-foreground focus-visible:ring-0 focus:outline-none text-xs font-semibold rounded-full cursor-auto"
          >
            500 / 1000 tokens
          </Button>
          <div className="flex items-center justify-between mt-5 mb-4">
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
