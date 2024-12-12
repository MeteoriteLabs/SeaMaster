import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`bg-background min-h-screen w-full text-foreground`}>
      <header className="flex items-center justify-center py-7">
        <Image
          src="sea-master-logo.svg"
          width={160}
          height={160}
          alt="sea-master-logo"
        />
      </header>
      {children}
    </main>
  );
}
