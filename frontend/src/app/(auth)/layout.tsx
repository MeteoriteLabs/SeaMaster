import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <main className={`bg-background min-h-screen w-full text-foreground`}>
        <header className="flex items-center justify-center py-7">
          <Image
            className="dark:hidden"
            src="sea-master-logo-light.svg"
            width={160}
            height={160}
            alt="sea-master-logo-light"
          />
          <Image
            className="hidden dark:block"
            src="sea-master-logo.svg"
            width={160}
            height={160}
            alt="sea-master-logo-dark"
          />
        </header>
        {children}
        <Toaster />
      </main>
    </ThemeProvider>
  );
}
