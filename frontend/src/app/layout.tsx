import "./globals.css"
// import "@/app/"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        <main>
          <div className="2xl:container global-parent bg-sea-master-blue border-white">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
