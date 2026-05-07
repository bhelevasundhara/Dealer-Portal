import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full h-[420px] flex items-center justify-center overflow-hidden bg-[#071225]">
        {/* Unified Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-unified.png"
            alt="ABC Equipment Loader in Mining Environment"
            fill
            className="object-cover object-[center_right]"
            priority
          />
          {/* Dark left-to-right gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071225]/95 via-[#071225]/75 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[1280px] w-full px-[32px] h-full flex items-center">
          
          {/* Left Column (Text & CTAs) */}
          <div className="flex flex-col justify-center max-w-[440px]">
            <h1 className="text-white text-[42px] font-bold leading-[1.1] tracking-tight mb-[12px]">
              Welcome to<br />Dealer Portal
            </h1>
            <p className="text-[#D1D5DB] text-[15px] leading-[1.5] mb-[20px]">
              Your one-stop platform for support, ordering and business growth.
            </p>
            <div className="flex items-center gap-[12px]">
              <Link href="#" className="bg-[#F97316] text-white h-[46px] px-6 rounded-[6px] font-bold text-[14px] flex items-center justify-center hover:bg-[#EA580C] transition-colors">
                Register as Dealer
              </Link>
              <Link href="#" className="bg-transparent border-[2px] border-white text-white h-[46px] px-6 rounded-[6px] font-bold text-[14px] flex items-center justify-center hover:bg-white/10 transition-colors">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="w-full bg-[#F5F6F8] pt-[48px] pb-[80px] flex justify-center">
        <div className="max-w-[1280px] w-full px-[32px]">
          <h2 className="text-[18px] font-bold text-[#111827] mb-[2px]">Quick Actions</h2>
          <p className="text-[#6B7280] text-[13px] mb-[28px]"></p>

          <div className="grid grid-cols-3 gap-[24px]">
            {/* Card 1 */}
            <Link href="#" className="bg-white rounded-[10px] border border-[#E5E7EB] p-[24px] flex flex-col hover:shadow-md transition-shadow group relative min-h-[180px]">
              <div className="mb-[16px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0B1F3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <line x1="19" x2="19" y1="8" y2="14"/>
                  <line x1="22" x2="16" y1="11" y2="11"/>
                </svg>
              </div>
              <h3 className="text-[15px] font-bold text-[#111827] mb-[6px]">Register as Dealer</h3>
              <p className="text-[#6B7280] text-[13px] leading-[1.4] max-w-[200px]">Create your dealer account and get started</p>
              <div className="absolute bottom-[24px] right-[24px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#111827] transition-colors">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/support" className="bg-white rounded-[10px] border border-[#E5E7EB] p-[24px] flex flex-col hover:shadow-md transition-shadow group relative min-h-[180px]">
              <div className="mb-[16px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0B1F3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
                </svg>
              </div>
              <h3 className="text-[15px] font-bold text-[#111827] mb-[6px]">Raise Support Case</h3>
              <p className="text-[#6B7280] text-[13px] leading-[1.4] max-w-[200px]">Get help from our support team</p>
              <div className="absolute bottom-[24px] right-[24px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#111827] transition-colors">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="#" className="bg-white rounded-[10px] border border-[#E5E7EB] p-[24px] flex flex-col hover:shadow-md transition-shadow group relative min-h-[180px]">
              <div className="mb-[16px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0B1F3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <h3 className="text-[15px] font-bold text-[#111827] mb-[6px]">Knowledge Base</h3>
              <p className="text-[#6B7280] text-[13px] leading-[1.4] max-w-[200px]">Find answers in our self help articles</p>
              <div className="absolute bottom-[24px] right-[24px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#111827] transition-colors">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
