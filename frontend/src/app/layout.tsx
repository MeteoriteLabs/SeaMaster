import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <div className="2xl:container global-parent bg-sea-master-blue border-white">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
