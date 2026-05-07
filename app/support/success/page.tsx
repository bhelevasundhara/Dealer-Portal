import Link from "next/link";

interface SuccessPageProps {
  searchParams: Promise<{ id?: string; type?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { id, type } = await searchParams;
  const isOnboarding = type === "onboarding";

  return (
    <main className="w-full bg-[#F5F6F8] min-h-[calc(100vh-64px)] py-[80px] px-[24px] flex justify-center items-center">
      <div className="max-w-[540px] w-full bg-white rounded-[12px] border border-[#E5E7EB] p-[40px] shadow-sm text-center flex flex-col items-center">
        
        {/* Green Checkmark */}
        <div className="w-[72px] h-[72px] rounded-full bg-green-50 flex items-center justify-center mb-[24px]">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#22C55E" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-[#071B34] text-[28px] font-extrabold tracking-tight mb-[12px]">
          Thank You!
        </h1>
        
        {/* Subtitle (Dynamic based on type) */}
        <p className="text-[#4B5563] text-[15px] leading-[1.5] mb-[16px] max-w-[380px]">
          {isOnboarding ? (
            <>
              Your dealer onboarding application has been submitted successfully.<br />
              We will review your documents soon.
            </>
          ) : (
            <>
              Your support case has been submitted successfully.<br />
              We will get back to you soon.
            </>
          )}
        </p>

        {/* Dynamic ID Display */}
        {id && (
          <div className="bg-[#F3F4F6] px-[16px] py-[8px] rounded-[6px] text-[#374151] text-[13px] font-semibold mb-[32px]">
            {isOnboarding ? "Account ID: " : "Case ID: "}
            <span className="text-[#F97316] font-bold">{id}</span>
          </div>
        )}

        {/* Status Steps (Dynamic based on type) */}
        <div className="flex justify-center gap-[36px] mb-[40px]">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-[8px] w-[80px]">
            <div className="w-[44px] h-[44px] rounded-full bg-[#FDF0EB] flex items-center justify-center">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#F97316" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-[11px] text-[#374151] font-bold leading-[1.3]">
              {isOnboarding ? "Submitted" : "Case Submitted"}
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-[8px] w-[80px]">
            <div className="w-[44px] h-[44px] rounded-full bg-[#FDF0EB] flex items-center justify-center">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#F97316" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="text-[11px] text-[#374151] font-bold leading-[1.3]">
              {isOnboarding ? "Under Review" : "Under Review"}
            </span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-[8px] w-[80px]">
            <div className="w-[44px] h-[44px] rounded-full bg-[#FDF0EB] flex items-center justify-center">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#F97316" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-[11px] text-[#374151] font-bold leading-[1.3]">
              {isOnboarding ? "Onboarded!" : "Issue Resolved"}
            </span>
          </div>
        </div>

        {/* Go to Homepage Button */}
        <Link 
          href="/" 
          className="bg-[#F97316] hover:bg-[#EA580C] text-white h-[46px] px-8 rounded-[6px] font-bold text-[14px] flex items-center justify-center transition-colors shadow-sm"
        >
          Go to Homepage
        </Link>
      </div>
    </main>
  );
}
