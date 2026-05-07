'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCaseAction } from "@/app/actions/salesforce";

export default function SupportPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await createCaseAction(formData);

    if (result.success) {
      router.push(`/support/success?id=${result.caseId}`);
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  }

  return (
    <main className="w-full bg-[#F5F6F8] min-h-[calc(100vh-64px)] py-[44px] px-[32px] flex justify-center">
      <div className="max-w-[1280px] w-full flex flex-col gap-[28px]">
        
        {/* Title Area */}
        <div>
          <h1 className="text-[#071B34] text-[28px] font-extrabold tracking-tight mb-[2px]">
            Raise Support Case
          </h1>
          <p className="text-[#6B7280] text-[14px] font-medium">
            Let us know how we can help you
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-[55%_45%] gap-[48px] items-center">
          
          {/* Left Column: Form Card */}
          <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-[32px] shadow-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
              {/* Subject */}
              <div>
                <label className="block text-[14px] font-bold text-[#071B34] mb-[6px]">
                  Subject <span className="text-[#F97316]">*</span>
                </label>
                <input
                  name="subject"
                  required
                  placeholder="Enter subject"
                  className="w-full h-[44px] px-[14px] rounded-[6px] border border-[#D1D5DB] text-[14px] font-medium text-[#111827] bg-white focus:outline-none focus:border-[#F97316] placeholder:text-[#9CA3AF]"
                />
              </div>

              {/* Case Type */}
              <div>
                <label className="block text-[14px] font-bold text-[#071B34] mb-[6px]">
                  Case Type <span className="text-[#F97316]">*</span>
                </label>
                <div className="relative">
                  <select
                    name="caseType"
                    required
                    defaultValue=""
                    className="w-full h-[44px] px-[14px] pr-[36px] rounded-[6px] border border-[#D1D5DB] text-[14px] font-medium text-[#111827] bg-white focus:outline-none focus:border-[#F97316] appearance-none"
                  >
                    <option value="" disabled>Select case type</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Structural">Structural</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-[14px] font-bold text-[#071B34] mb-[6px]">
                  Status <span className="text-[#F97316]">*</span>
                </label>
                <div className="relative">
                  <select
                    name="status"
                    required
                    defaultValue="New"
                    className="w-full h-[44px] px-[14px] pr-[36px] rounded-[6px] border border-[#D1D5DB] text-[14px] font-medium text-[#111827] bg-white focus:outline-none focus:border-[#F97316] appearance-none"
                  >
                    <option value="New">New</option>
                    <option value="Working">Working</option>
                    <option value="Escalated">Escalated</option>
                  </select>
                  <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Case Origin */}
              <div>
                <label className="block text-[14px] font-bold text-[#071B34] mb-[6px]">
                  Case Origin <span className="text-[#F97316]">*</span>
                </label>
                <div className="relative">
                  <select
                    name="caseOrigin"
                    required
                    defaultValue="Web"
                    className="w-full h-[44px] px-[14px] pr-[36px] rounded-[6px] border border-[#D1D5DB] text-[14px] font-medium text-[#111827] bg-white focus:outline-none focus:border-[#F97316] appearance-none"
                  >
                    <option value="Web">Web</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                  </select>
                  <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[14px] font-bold text-[#071B34] mb-[6px]">
                  Description <span className="text-[#F97316]">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Describe your issue in detail..."
                  className="w-full p-[14px] rounded-[6px] border border-[#D1D5DB] text-[14px] font-medium text-[#111827] bg-white focus:outline-none focus:border-[#F97316] placeholder:text-[#9CA3AF] resize-none"
                />
              </div>

              {error && (
                <div className="p-[10px_14px] bg-red-50 border border-red-200 rounded-[6px] text-red-600 text-[13px]">
                  {error}
                </div>
              )}

              {/* Horizontal Action Buttons */}
              <div className="flex items-center gap-[12px] mt-[4px]">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="h-[44px] px-[36px] border border-[#D1D5DB] rounded-[6px] bg-white text-[#374151] font-bold text-[14px] cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-[44px] px-[36px] bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-[14px] rounded-[6px] cursor-pointer transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Case'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Illustration */}
          <div className="flex justify-center items-center">
            <svg viewBox="0 0 440 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[340px] h-auto">
              {/* Soft Peach Organic Blob */}
              <path d="M100,160 C100,80 180,60 260,110 C340,160 360,240 300,290 C240,340 140,330 100,280 C60,230 100,240 100,160 Z" fill="#FDF0EB" />
              
              {/* Small Peach circle top-right */}
              <circle cx="330" cy="130" r="15" fill="#FBE3D8" />

              {/* Headset shadow */}
              <ellipse cx="210" cy="295" rx="60" ry="8" fill="#EAD5CB" opacity="0.4" />

              {/* Headset Band */}
              <path d="M150,185 C150,115 190,95 230,95 C270,95 310,115 310,185" stroke="#071B34" strokeWidth="14" strokeLinecap="round" fill="none" />
              
              {/* Left Ear Cup */}
              <rect x="138" y="170" width="24" height="50" rx="12" fill="#071B34" />
              {/* Right Ear Cup */}
              <rect x="298" y="170" width="24" height="50" rx="12" fill="#071B34" />
              
              {/* Mic arm */}
              <path d="M305,205 C305,250 260,260 235,250" stroke="#071B34" strokeWidth="8" strokeLinecap="round" fill="none" />
              <rect x="222" y="243" width="16" height="12" rx="4" fill="#071B34" />

              {/* Orange Chat Bubble on the right */}
              <g transform="translate(325, 155)">
                {/* Unified chat bubble body and tail pointing down-left */}
                <path d="M35,0 C54,0 70,11 70,25 C70,39 54,50 35,50 C31,50 27,49 23,48 L5,55 L11,39 C4,35 0,30 0,25 C0,11 16,0 35,0 Z" fill="#F97316" />
                <circle cx="23" cy="25" r="4" fill="white" />
                <circle cx="35" cy="25" r="4" fill="white" />
                <circle cx="47" cy="25" r="4" fill="white" />
              </g>
            </svg>
          </div>

        </div>
      </div>
    </main>
  );
}
