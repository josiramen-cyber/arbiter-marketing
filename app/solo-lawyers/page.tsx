import type { Metadata } from "next";
import LandingNav from "@/components/LandingNav";
import SystemFlow from "@/components/SystemFlow";
import WaitlistInlineForm from "@/components/WaitlistInlineForm";
import type { WaitlistField } from "@/components/WaitlistInlineForm";

export const metadata: Metadata = {
  title: "Arbiter Legal — For Solo Lawyers",
  description: "Run your cases through a structured system. Join the waitlist.",
};

const fields: WaitlistField[] = [
  { key: "full_name", label: "Name", type: "text", placeholder: "Your name", required: true },
  { key: "email", label: "Email", type: "email", placeholder: "you@yourfirm.com", required: true },
  {
    key: "practice_area",
    label: "Practice area",
    type: "select",
    options: [
      { value: "employment", label: "Employment law" },
      { value: "family", label: "Family law" },
      { value: "corporate", label: "Corporate law" },
      { value: "criminal", label: "Criminal law" },
      { value: "property", label: "Property law" },
      { value: "administrative", label: "Administrative law" },
      { value: "general", label: "General practice" },
      { value: "other", label: "Other" },
    ],
  },
];

const problems = [
  "You reconstruct the same case logic repeatedly",
  "You manually check what's missing",
  "Requirements live in your head, not a system",
  "You spend time managing instead of progressing",
];

const enables = [
  "Consistent case handling",
  "Early detection of missing elements",
  "Reduced rework",
  "Clear progression toward submission",
];

export default function SoloLawyersPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      <LandingNav />

      {/* Above the fold */}
      <section className="max-w-4xl mx-auto px-5 pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 items-start">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9A84C] mb-5">
              For solo lawyers
            </p>
            <h1 className="font-serif text-[clamp(28px,4.5vw,46px)] font-medium leading-[1.15] text-[#0C0F14] mb-5">
              Run your cases through a structured system
            </h1>
            <p className="text-base text-[#6B7A8D] leading-relaxed max-w-md">
              Most legal work is still fragmented — documents, notes, and decisions spread across tools.
              Arbiter Legal brings structure, validation, and execution into one flow.
            </p>

            {/* System flow */}
            <div className="mt-10 mb-8">
              <SystemFlow steps={["Input", "Structuring", "Decision Layer", "Execution", "Output"]} />
            </div>

            <p className="text-sm text-[#6B7A8D] leading-relaxed max-w-md">
              Arbiter Legal turns how you think about a case into a repeatable system.
              Each case follows a structured path from intake to completion.
            </p>

            {/* What this enables */}
            <div className="mt-10">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0C0F14] mb-4">
                What this enables
              </p>
              <ul className="space-y-2.5">
                {enables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#6B7A8D]">
                    <span className="text-[#2ECC8A] font-bold mt-0.5 flex-shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form card — sticky on desktop */}
          <div className="md:sticky md:top-20">
            <div className="bg-white rounded-2xl border border-[#E5E4DE] p-7 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-1">Waitlist</p>
              <h2 className="font-serif text-xl font-medium text-[#0C0F14] mb-5">Get early access</h2>
              <WaitlistInlineForm fields={fields} source="solo-lawyers" ctaLabel="Join Waitlist" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="border-t border-[#E5E4DE] bg-white py-14 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0C0F14] mb-8">
            What slows you down
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {problems.map((p, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#F7F6F2] rounded-xl p-5 border border-[#E5E4DE]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E05A5A] mt-2 flex-shrink-0" />
                <p className="text-sm text-[#6B7A8D] leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-5 text-center">
        <p className="text-xs text-[#9CA3AF]">© {new Date().getFullYear()} Arbiter Legal BV — <span className="text-[#C9A84C] font-serif">Less admin. Better practice.</span></p>
      </footer>
    </div>
  );
}
