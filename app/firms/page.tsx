import type { Metadata } from "next";
import LandingNav from "@/components/LandingNav";
import SystemFlow from "@/components/SystemFlow";
import WaitlistInlineForm from "@/components/WaitlistInlineForm";
import type { WaitlistField } from "@/components/WaitlistInlineForm";

export const metadata: Metadata = {
  title: "Arbiter Legal — For Law Firms",
  description: "Standardize how your firm runs cases. Join the waitlist.",
};

const fields: WaitlistField[] = [
  { key: "full_name", label: "Name", type: "text", placeholder: "Your name", required: true },
  { key: "firm_name", label: "Firm name", type: "text", placeholder: "Smith & Partners", required: true },
  {
    key: "firm_size",
    label: "Team size",
    type: "select",
    required: true,
    options: [
      { value: "2-3", label: "2–3 lawyers" },
      { value: "4-6", label: "4–6 lawyers" },
      { value: "7-10", label: "7–10 lawyers" },
    ],
  },
  { key: "email", label: "Email", type: "email", placeholder: "you@yourfirm.com", required: true },
];

const problems = [
  "No unified intake structure",
  "Case handling varies per lawyer",
  "Limited visibility across matters",
  "Quality depends on individual habits",
];

const enables = [
  "Shared workflows across your team",
  "Consistent execution regardless of who handles it",
  "Central visibility across all matters",
  "Reduced operational variance",
];

export default function FirmsPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      <LandingNav />

      {/* Above the fold */}
      <section className="max-w-4xl mx-auto px-5 pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 items-start">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9A84C] mb-5">
              For law firms · 2–10 lawyers
            </p>
            <h1 className="font-serif text-[clamp(28px,4.5vw,46px)] font-medium leading-[1.15] text-[#0C0F14] mb-5">
              Standardize how your firm runs cases
            </h1>
            <p className="text-base text-[#6B7A8D] leading-relaxed max-w-md">
              When each lawyer handles cases differently, quality and efficiency drop.
              Arbiter Legal creates a shared execution system across your team.
            </p>

            {/* System flow */}
            <div className="mt-10 mb-8">
              <SystemFlow steps={["Lawyers", "Shared Pipeline", "Arbiter Engine", "Standardized Output"]} />
            </div>

            <p className="text-sm text-[#6B7A8D] leading-relaxed max-w-md">
              Every case flows through the same structure.
              The system enforces consistency without slowing your team down.
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

          {/* Form card */}
          <div className="md:sticky md:top-20">
            <div className="bg-white rounded-2xl border border-[#E5E4DE] p-7 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-1">Waitlist</p>
              <h2 className="font-serif text-xl font-medium text-[#0C0F14] mb-5">Request early access</h2>
              <WaitlistInlineForm fields={fields} source="firms" ctaLabel="Request Early Access" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="border-t border-[#E5E4DE] bg-white py-14 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0C0F14] mb-8">
            Where firms lose consistency
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
