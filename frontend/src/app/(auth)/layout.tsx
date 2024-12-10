import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`bg-sea-master-blue min-h-screen w-full`}>
      <header className="flex items-center justify-center py-7">
        <Image src="/logo.svg" width={160} height={160} alt="sea-master-logo" />
      </header>
      {children}
    </main>
  );
}
