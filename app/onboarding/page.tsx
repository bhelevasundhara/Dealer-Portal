'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOnboardingAction } from "@/app/actions/salesforce";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Store Step 1 data in plain state so we can pass it to the server action on Step 2 submit
  const [step1Data, setStep1Data] = useState<Record<string, any>>({});
  
  // Toggles for dynamic UI elements
  const [sameAsPrimary, setSameAsPrimary] = useState(true);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  const handleSpecialtyToggle = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty) ? prev.filter(s => s !== specialty) : [...prev, specialty]
    );
  };

  const handleStep1Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Extract values from Step 1
    const companyName = formData.get("companyName") as string;
    const primaryStreet = formData.get("primaryStreet") as string;
    const primaryCity = formData.get("primaryCity") as string;
    const primaryState = formData.get("primaryState") as string;
    const primaryZip = formData.get("primaryZip") as string;
    const primaryCountry = formData.get("primaryCountry") as string;
    
    const billingStreet = sameAsPrimary ? primaryStreet : (formData.get("billingStreet") as string);
    const billingCity = sameAsPrimary ? primaryCity : (formData.get("billingCity") as string);
    const billingState = sameAsPrimary ? primaryState : (formData.get("billingState") as string);
    const billingZip = sameAsPrimary ? primaryZip : (formData.get("billingZip") as string);
    const billingCountry = sameAsPrimary ? primaryCountry : (formData.get("billingCountry") as string);

    const websiteUrl = formData.get("websiteUrl") as string;
    const territory = formData.get("territory") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    setStep1Data({
      companyName,
      primaryStreet,
      primaryCity,
      primaryState,
      primaryZip,
      primaryCountry,
      billingStreet,
      billingCity,
      billingState,
      billingZip,
      billingCountry,
      websiteUrl,
      specialties: selectedSpecialties,
      territory,
      firstName,
      lastName,
      email,
      phone
    });

    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep2Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const termsAccepted = formData.get("termsAccepted") === "on";
    if (!termsAccepted) {
      setError("You must accept the Terms & Conditions to complete onboarding.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const bankName = formData.get("bankName") as string;
    const accountNumber = formData.get("accountNumber") as string;
    const routingNumber = formData.get("routingNumber") as string;

    const mergedData = {
      ...step1Data,
      bankName,
      accountNumber,
      routingNumber
    };

    const result = await createOnboardingAction(mergedData);

    if (result.success) {
      router.push(`/support/success?id=${result.accountId}&type=onboarding`);
    } else {
      setError(result.error || "Onboarding submission failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full bg-[#F5F6F8] min-h-[calc(100vh-64px)] py-[28px] flex justify-center items-start">
      {/* Centered Max-Width Container */}
      <div className="max-w-7xl w-full mx-auto px-[32px] flex flex-col gap-[20px]">
        
        {/* Title Area - Compact & Left-Aligned */}
        <div>
          <h1 className="text-[#071B34] text-[26px] font-extrabold tracking-tight mb-[1px]">
            Dealer Onboarding
          </h1>
          <p className="text-[#6B7280] text-[13px] font-medium">
            Please complete the onboarding process
          </p>
        </div>

        {/* 2-Column Main Layout: [35%_65%] */}
        <div className="grid grid-cols-[35%_65%] gap-[40px] items-start">
          
          {/* Left Column: Compact Illustration aligned with form top */}
          <div className="flex flex-col items-center justify-start pt-[12px]">
            <div className="relative w-[180px] h-[180px] rounded-full bg-[#FDF0EB] flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 200 200" className="w-[90px] h-auto drop-shadow-sm">
                <rect x="40" y="50" width="60" height="110" rx="4" fill="#071B34" />
                <rect x="104" y="80" width="46" height="80" rx="4" fill="#071B34" />
                
                <rect x="52" y="65" width="12" height="16" rx="2" fill="white" />
                <rect x="76" y="65" width="12" height="16" rx="2" fill="white" />
                <rect x="52" y="93" width="12" height="16" rx="2" fill="white" />
                <rect x="76" y="93" width="12" height="16" rx="2" fill="white" />
                <rect x="52" y="121" width="12" height="16" rx="2" fill="white" />
                <rect x="76" y="121" width="12" height="16" rx="2" fill="white" />

                <rect x="114" y="95" width="10" height="14" rx="2" fill="white" />
                <rect x="130" y="95" width="10" height="14" rx="2" fill="white" />
                <rect x="114" y="120" width="10" height="14" rx="2" fill="white" />
                <rect x="130" y="120" width="10" height="14" rx="2" fill="white" />
              </svg>
            </div>
            <div className="text-center mt-[16px]">
              <h3 className="text-[#071B34] text-[15px] font-bold">ABC Equipment Partner Portal</h3>
              <p className="text-[#6B7280] text-[12px] mt-[3px] max-w-[180px] leading-[1.4]">Empowering our authorized dealers globally</p>
            </div>
          </div>

          {/* Right Column: Stepper & Form Card aligned perfectly */}
          <div className="flex flex-col gap-[16px]">
            
            {/* 2-Step Progress Stepper - Aligned to form width */}
            <div className="w-full flex items-center justify-start gap-[16px] bg-white border border-[#E5E7EB] p-[12px_20px] rounded-[8px] shadow-sm">
              {/* Step 1 */}
              <div className="flex items-center gap-[10px]">
                <div className={`w-[24px] h-[24px] rounded-full flex items-center justify-center font-bold text-[12px] ${
                  step === 1 ? "bg-[#F97316] text-white" : "bg-green-500 text-white"
                }`}>
                  {step === 1 ? "1" : "✓"}
                </div>
                <span className={`text-[12px] font-bold ${step === 1 ? "text-[#F97316]" : "text-gray-500"}`}>
                  Company & Contact Information
                </span>
              </div>

              {/* Divider Line */}
              <div className="flex-1 h-[2px] bg-gray-200 max-w-[80px]" />

              {/* Step 2 */}
              <div className="flex items-center gap-[10px]">
                <div className={`w-[24px] h-[24px] rounded-full flex items-center justify-center font-bold text-[12px] ${
                  step === 2 ? "bg-[#F97316] text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  2
                </div>
                <span className={`text-[12px] font-bold ${step === 2 ? "text-[#F97316]" : "text-gray-500"}`}>
                  Financial & Compliance
                </span>
              </div>
            </div>

            {/* Compact Form Card */}
            <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-[24px] shadow-sm">
              {step === 1 ? (
                /* Step 1 Form (Pure Uncontrolled Inputs) */
                <form onSubmit={handleStep1Submit} className="flex flex-col gap-[18px]">
                  <h2 className="text-[#071B34] text-[18px] font-bold pb-[6px] border-b border-gray-100">
                    Step 1: Company & Contact Information
                  </h2>

                  {/* Section 1.1: Company Info */}
                  <div className="flex flex-col gap-[12px]">
                    <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Company Details</h3>
                    
                    {/* Company Name */}
                    <div>
                      <label className="block text-[12px] font-bold text-[#071B34] mb-[4px]">
                        Company Name <span className="text-[#F97316]">*</span>
                      </label>
                      <input
                        name="companyName"
                        required
                        placeholder="Enter company name"
                        className="w-full h-[38px] px-[10px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] focus:outline-none focus:border-[#F97316]"
                      />
                    </div>

                    {/* Primary Business Address */}
                    <div className="flex flex-col gap-[8px]">
                      <span className="text-[12px] font-bold text-[#071B34]">Primary Business Address <span className="text-[#F97316]">*</span></span>
                      <input
                        name="primaryStreet"
                        required
                        placeholder="Street Address"
                        className="w-full h-[38px] px-[10px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] focus:outline-none focus:border-[#F97316]"
                      />
                      <div className="grid grid-cols-4 gap-[8px]">
                        <input
                          name="primaryCity"
                          required
                          placeholder="City"
                          className="w-full h-[38px] px-[10px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] focus:outline-none focus:border-[#F97316]"
                        />
                        <input
                          name="primaryState"
                          required
                          placeholder="State"
                          className="w-full h-[38px] px-[10px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] focus:outline-none focus:border-[#F97316]"
                        />
                        <input
                          name="primaryZip"
                          required
                          placeholder="Zip"
                          className="w-full h-[38px] px-[10px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] focus:outline-none focus:border-[#F97316]"
                        />
                        <input
                          name="primaryCountry"
                          required
                          defaultValue="United States"
                          placeholder="Country"
                          className="w-full h-[38px] px-[10px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] focus:outline-none focus:border-[#F97316]"
                        />
                      </div>
                    </div>

                    {/* Billing Address Checkbox */}
                    <label className="flex items-center gap-[6px] cursor-pointer text-[12px] font-semibold text-[#071B34] select-none">
                      <input
                        type="checkbox"
                        checked={sameAsPrimary}
                        onChange={(e) => setSameAsPrimary(e.target.checked)}
                        className="w-[14px] h-[14px] rounded border-[#D1D5DB] accent-[#F97316]"
                      />
                      Billing address same as primary?
                    </label>

                    {/* Billing Address fields (Shown if sameAsPrimary is unchecked) */}
                    {!sameAsPrimary && (
                      <div className="flex flex-col gap-[8px] p-[12px] bg-gray-50 rounded-[6px] border border-gray-150">
                        <span className="text-[12px] font-bold text-[#071B34]">Billing Address <span className="text-[#F97316]">*</span></span>
                        <input
                          name="billingStreet"
                          required
                          placeholder="Billing Street"
                          className="w-full h-[38px] px-[10px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] focus:outline-none focus:border-[#F97316] bg-white"
                        />
                        <div className="grid grid-cols-4 gap-[8px]">
                          <input
                            name="billingCity"
                            required
                            placeholder="City"
                            className="w-full h-[38px] px-[10px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] focus:outline-none focus:border-[#F97316] bg-white"
                          />
                          <input
                            name="billingState"
                            required
                            placeholder="State"
                            className="w-full h-[38px] px-[10px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] focus:outline-none focus:border-[#F97316] bg-white"
                          />
                          <input
                            name="billingZip"
                            required
                            placeholder="Zip"
                            className="w-full h-[38px] px-[10px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] focus:outline-none focus:border-[#F97316] bg-white"
                          />
                          <input
                            name="billingCountry"
                            required
                            defaultValue="United States"
                            placeholder="Country"
                            className="w-full h-[38px] px-[10px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] focus:outline-none focus:border-[#F97316] bg-white"
                          />
                        </div>
                      </div>
                    )}

                    {/* Website URL */}
                    <div>
                      <label className="block text-[12px] font-bold text-[#071B34] mb-[4px]">
                        Website URL
                      </label>
                      <input
                        name="websiteUrl"
                        type="url"
                        placeholder="https://example.com"
                        className="w-full h-[38px] px-[10px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] focus:outline-none focus:border-[#F97316]"
                      />
                    </div>

                    {/* Equipment Specialties Checkboxes */}
                    <div>
                      <label className="block text-[12px] font-bold text-[#071B34] mb-[6px]">
                        Equipment Specialties <span className="text-[#F97316]">*</span>
                      </label>
                      <div className="grid grid-cols-5 gap-[8px]">
                        {["Skid Steer", "Telehandler", "Backhoe", "Compact Loader", "Excavator"].map(s => (
                          <label key={s} className="flex items-center gap-[6px] cursor-pointer text-[12px] font-medium text-[#374151] select-none">
                            <input
                              type="checkbox"
                              checked={selectedSpecialties.includes(s)}
                              onChange={() => handleSpecialtyToggle(s)}
                              className="w-[14px] h-[14px] rounded border-[#D1D5DB] accent-[#F97316]"
                            />
                            {s}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Territory / Region Dropdown */}
                    <div>
                      <label className="block text-[12px] font-bold text-[#071B34] mb-[4px]">
                        Territory / Region <span className="text-[#F97316]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="territory"
                          defaultValue="Midwest"
                          className="w-full h-[38px] px-[10px] pr-[32px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] bg-white focus:outline-none focus:border-[#F97316] appearance-none"
                        >
                          <option value="Northeast">Northeast</option>
                          <option value="Southeast">Southeast</option>
                          <option value="Midwest">Midwest</option>
                          <option value="Southwest">Southwest</option>
                          <option value="West">West</option>
                        </select>
                        <div className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 1.2: Primary Contact Info */}
                  <div className="flex flex-col gap-[12px] mt-[4px]">
                    <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Primary Contact</h3>
                    
                    <div className="grid grid-cols-2 gap-[12px]">
                      <div>
                        <label className="block text-[12px] font-bold text-[#071B34] mb-[4px]">
                          First Name <span className="text-[#F97316]">*</span>
                        </label>
                        <input
                          name="firstName"
                          required
                          placeholder="First name"
                          className="w-full h-[38px] px-[10px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] focus:outline-none focus:border-[#F97316]"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-[#071B34] mb-[4px]">
                          Last Name <span className="text-[#F97316]">*</span>
                        </label>
                        <input
                          name="lastName"
                          required
                          placeholder="Last name"
                          className="w-full h-[38px] px-[10px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] focus:outline-none focus:border-[#F97316]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-[12px]">
                      <div>
                        <label className="block text-[12px] font-bold text-[#071B34] mb-[4px]">
                          Email <span className="text-[#F97316]">*</span>
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          placeholder="email@example.com"
                          className="w-full h-[38px] px-[10px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] focus:outline-none focus:border-[#F97316]"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-[#071B34] mb-[4px]">
                          Mobile Number <span className="text-[#F97316]">*</span>
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          required
                          placeholder="Mobile number"
                          className="w-full h-[38px] px-[10px] rounded-[6px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] focus:outline-none focus:border-[#F97316]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="flex justify-end pt-[12px] border-t border-gray-100">
                    <button
                      type="submit"
                      className="h-[40px] px-[28px] bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-[13px] rounded-[6px] transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </form>
              ) : (
                /* Step 2 Form (Pure Uncontrolled Inputs) */
                <form onSubmit={handleStep2Submit} className="flex flex-col gap-[18px]">
                  <h2 className="text-[#071B34] text-[18px] font-bold pb-[6px] border-b border-gray-100">
                    Step 2: Financial & Compliance Documents
                  </h2>

                  <div className="flex flex-col gap-[14px]">
                    {/* File Upload 1 */}
                    <div>
                      <label className="block text-[12px] font-bold text-[#071B34] mb-[4px]">
                        Business License Upload
                      </label>
                      <input
                        type="file"
                        className="w-full text-[12px] text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-[4px] file:border-0 file:text-[12px] file:font-semibold file:bg-[#FDF0EB] file:text-[#F97316] hover:file:bg-[#FBE3D8] cursor-pointer"
                      />
                    </div>

                    {/* File Upload 2 */}
                    <div>
                      <label className="block text-[12px] font-bold text-[#071B34] mb-[4px]">
                        Certificate of Insurance Upload
                      </label>
                      <input
                        type="file"
                        className="w-full text-[12px] text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-[4px] file:border-0 file:text-[12px] file:font-semibold file:bg-[#FDF0EB] file:text-[#F97316] hover:file:bg-[#FBE3D8] cursor-pointer"
                      />
                    </div>

                    {/* File Upload 3 */}
                    <div>
                      <label className="block text-[12px] font-bold text-[#071B34] mb-[4px]">
                        Tax Residency Certificate Upload
                      </label>
                      <input
                        type="file"
                        className="w-full text-[12px] text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-[4px] file:border-0 file:text-[12px] file:font-semibold file:bg-[#FDF0EB] file:text-[#F97316] hover:file:bg-[#FBE3D8] cursor-pointer"
                      />
                    </div>

                    {/* Bank Account Details */}
                    <div className="flex flex-col gap-[10px] p-[12px] bg-gray-50 rounded-[6px] border border-gray-100 mt-[4px]">
                      <span className="text-[13px] font-bold text-[#071B34]">Bank Account Information</span>
                      <div className="grid grid-cols-3 gap-[10px]">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-400 mb-[2px]">Bank Name</label>
                          <input
                            name="bankName"
                            required
                            placeholder="Bank name"
                            className="w-full h-[36px] px-[8px] rounded-[4px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] bg-white focus:outline-none focus:border-[#F97316]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-400 mb-[2px]">Account Number</label>
                          <input
                            name="accountNumber"
                            required
                            placeholder="Account number"
                            className="w-full h-[36px] px-[8px] rounded-[4px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] bg-white focus:outline-none focus:border-[#F97316]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-400 mb-[2px]">Routing Number</label>
                          <input
                            name="routingNumber"
                            required
                            placeholder="Routing number"
                            className="w-full h-[36px] px-[8px] rounded-[4px] border border-[#D1D5DB] text-[12px] font-medium text-[#111827] bg-white focus:outline-none focus:border-[#F97316]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Terms & Conditions */}
                    <label className="flex items-start gap-[8px] cursor-pointer text-[12px] font-medium text-[#374151] mt-[4px] select-none">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        required
                        className="w-[14px] h-[14px] rounded border-[#D1D5DB] accent-[#F97316] mt-[2px]"
                      />
                      <span>
                        I certify that all provided documents and bank account details are legally accurate and represent our corporate entity. I accept the ABC Equipment Dealer Network Partnership Terms & Conditions.
                      </span>
                    </label>
                  </div>

                  {error && (
                    <div className="p-[8px_12px] bg-red-50 border border-red-200 rounded-[6px] text-red-600 text-[12px]">
                      {error}
                    </div>
                  )}

                  {/* Horizontal Action Buttons */}
                  <div className="flex items-center justify-between pt-[12px] border-t border-gray-100">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="h-[40px] px-[28px] border border-[#D1D5DB] rounded-[6px] bg-white text-[#374151] font-bold text-[13px] cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-[40px] px-[28px] bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-[13px] rounded-[6px] cursor-pointer transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting Onboarding..." : "Submit Onboarding"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
