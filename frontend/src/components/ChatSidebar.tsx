"use client";

import React, { useEffect, useState } from "react";
import {
  Delete,
  Edit,
  Ellipsis,
  MessageSquareText,
  Moon,
  Plus,
  Settings,
  Sun,
  ToggleLeft,
  ToggleRight,
  Check,
  X,
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
import { CREATE_CHAT, DELETE_CHAT, UPDATE_CHAT } from "@/lib/mutations";
import Loader from "./Loader";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function AppSidebar() {
  const { setTheme, theme } = useTheme();
  const { user } = useAuthStore();
  const { chats, activeChatId, setActiveChat, setChats } = useChatStore();
  const [createChat, { loading: createChatLoading }] = useMutation(CREATE_CHAT);
  const [updateChat, { loading: updateChatLoading }] = useMutation(UPDATE_CHAT);
  const [DeleteChat, { loading: deleteChatLoading }] = useMutation(DELETE_CHAT);
  const {
    data: chatsData,
    loading: chatsLoading,
    error: chatsError,
    refetch: refetchChats,
  } = useQuery(GET_CHATS);

  const [editingChatId, setEditingChatId] = useState(null);
  const [editingChatName, setEditingChatName] = useState("");

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
      setActiveChat(chats[chats.length - 1]?.documentId);
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

  const handleEditChat = (chat: any) => {
    setEditingChatId(chat.id);
    setEditingChatName(chat.name);
  };

  const handleSaveEdit = async (chat: any) => {
    console.log("chat", chat);
    try {
      await updateChat({
        variables: {
          data: {
            ConversationTitle: editingChatName,
          },
          documentId: chat.id,
        },
      });
      await refetchChats();
      handleCancel();
    } catch (error) {
      console.error("Error updating chat:", error);
      toast.error("Error updating chat");
    }
  };

  const handleDeleteChat = async (chatId: any) => {
    try {
      await DeleteChat({ variables: { documentId: chatId } });
      await refetchChats();
      handleCancel();
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error("Error deleting chat");
    }
  };

  const handleCancel = () => {
    setEditingChatId(null);
    setEditingChatName("");
  };

  if (
    chatsLoading ||
    createChatLoading ||
    updateChatLoading ||
    deleteChatLoading
  )
    return <Loader />;

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
      <SidebarContent className="bg-background text-foreground font-inter scrollbar-hide">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats
                .slice()
                .reverse()
                .map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton asChild>
                      <div
                        className={`flex items-center justify-between mb-1 p-2 rounded-lg cursor-pointer ${
                          activeChatId === chat.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setActiveChat(chat.id)}
                      >
                        {editingChatId === chat.id ? (
                          <div className="flex items-center justify-between w-full">
                            <input
                              className="bg-transparent border-b border-muted p-1 text-sm focus:outline-none w-4/5"
                              value={editingChatName}
                              onChange={(e) =>
                                setEditingChatName(e.target.value)
                              }
                              autoFocus
                            />
                            <div className="flex gap-2">
                              <Check
                                size={18}
                                className="cursor-pointer text-success"
                                onClick={() =>
                                  editingChatName.trim()
                                    ? handleSaveEdit(chat)
                                    : null
                                }
                              />
                              <X
                                size={18}
                                className="cursor-pointer text-danger"
                                onClick={handleCancel}
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center">
                              <MessageSquareText size={18} className="mr-2" />
                              <p className="text-sm font-light">{chat.name}</p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Ellipsis size={18} />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="min-w-[5rem] font-inter">
                                <DropdownMenuGroup>
                                  <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => handleEditChat(chat)}
                                  >
                                    <Edit />
                                    <span>Edit</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => handleDeleteChat(chat.id)}
                                  >
                                    <Delete />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </>
                        )}
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
