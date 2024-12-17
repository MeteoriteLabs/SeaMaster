import React from "react";
import { MessageCircle, MessageSquareText, Settings, User } from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";
import { link } from "fs";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarmenuItems = [
    { name: "Chat", icon: <MessageSquareText />, link: "/chat" },
    // { name: "My Profile", icon: <User /> },
    { name: "Settings", icon: <Settings />, link: "/settings" },
  ];

  return (
    <section className="h-screen w-screen overflow-hidden bg-background text-foreground">
      <SidebarLayout menuItems={sidebarmenuItems}>{children}</SidebarLayout>
    </section>
  );
}
