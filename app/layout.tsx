'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

function Navbar() {
  const pathname = usePathname();

  return (
    <header className="h-[64px] bg-[#071B34] flex items-center justify-center w-full sticky top-0 z-50">
      <div className="max-w-[1280px] w-full px-[32px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-[28px] h-[28px] bg-white rounded flex items-center justify-center font-extrabold text-[15px] text-[#071B34]">
            A
          </div>
          <span className="font-bold text-[18px] text-white tracking-tight">ABC Equipment</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-[28px] h-full">
          <Link 
            href="/" 
            className={`text-[13px] font-semibold transition-colors relative py-1 ${
              pathname === "/" ? "text-white" : "text-gray-300 hover:text-white"
            }`}
          >
            Home
            {pathname === "/" && (
              <span className="absolute bottom-[-14px] left-0 right-0 h-[2.5px] bg-[#F97316] rounded-full mx-auto" />
            )}
          </Link>
          <Link 
            href="#" 
            className="text-gray-300 hover:text-white text-[13px] font-semibold transition-colors py-1"
          >
            Products
          </Link>
          <Link 
            href="/support" 
            className={`text-[13px] font-semibold transition-colors relative py-1 ${
              pathname?.startsWith("/support") ? "text-white" : "text-gray-300 hover:text-white"
            }`}
          >
            Support
            {pathname?.startsWith("/support") && (
              <span className="absolute bottom-[-14px] left-0 right-0 h-[2.5px] bg-[#F97316] rounded-full mx-auto" />
            )}
          </Link>
          <Link 
            href="#" 
            className="text-gray-300 hover:text-white text-[13px] font-semibold transition-colors py-1"
          >
            Knowledge Base
          </Link>
        </nav>

        {/* Login / Register */}
        <div className="flex items-center gap-[20px]">
          <Link href="#" className="text-white text-[13px] font-semibold hover:text-[#F97316] transition-colors">Login</Link>
          <Link href="#" className="bg-[#F97316] text-white text-[13px] px-[18px] py-[8px] rounded-[6px] font-bold hover:bg-[#EA580C] transition-colors">Register</Link>
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8] min-h-screen text-[#111827] font-sans antialiased m-0 p-0 flex flex-col" suppressHydrationWarning>
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
