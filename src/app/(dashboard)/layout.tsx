import Navbar from "../../components/Navbar";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
      <html lang="en">
        <body className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <div>Hello</div>
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </body>
      </html>
    )
  }