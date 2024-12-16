import React from "react";
import { Settings, User } from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarmenuItems = [
    { name: "My Profile", icon: <User /> },
    { name: "Settings", icon: <Settings /> },
  ];

  return (
    <section className="h-screen w-screen overflow-hidden bg-background text-foreground">
      <SidebarLayout menuItems={sidebarmenuItems}>{children}</SidebarLayout>
    </section>
  );
}
