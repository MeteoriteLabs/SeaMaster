import SidebarLayout from "@/components/SidebarLayout";
import { File, FileChartColumn, UserCircleIcon } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarmenuItems = [
    { name: "Training Database", icon: <File /> },
    { name: "Analysis", icon: <FileChartColumn /> },
  ];

  const sidearfooterItems = [{ name: "Super Admin", icon: <UserCircleIcon /> }];

  return (
    <SidebarLayout
      menuItems={sidebarmenuItems}
      footerItems={sidearfooterItems}
      middleContent={
        <h1 className="text-2xl font-bold font-inter">Super Admin</h1>
      }
    >
      {children}
    </SidebarLayout>
  );
}
