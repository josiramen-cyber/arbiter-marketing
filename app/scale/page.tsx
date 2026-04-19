import type { Metadata } from "next";
import LandingNav from "@/components/LandingNav";
import SystemFlow from "@/components/SystemFlow";
import WaitlistInlineForm from "@/components/WaitlistInlineForm";
import type { WaitlistField } from "@/components/WaitlistInlineForm";

export const metadata: Metadata = {
  title: "Arbiter Legal — For Larger Organizations",
  description: "Run legal operations without fragmentation. Request access.",
};

const fields: WaitlistField[] = [
  { key: "full_name", label: "Name", type: "text", placeholder: "Your name", required: true },
  { key: "firm_name", label: "Organization", type: "text", placeholder: "Organization name", required: true },
  {
    key: "practice_area",
    label: "Your role",
    type: "select",
    required: true,
    options: [
      { value: "managing-partner", label: "Managing Partner" },
      { value: "head-of-legal", label: "Head of Legal" },
      { value: "operations", label: "Legal Operations" },
      { value: "it-director", label: "IT / Systems Director" },
      { value: "partner", label: "Partner" },
      { value: "other", label: "Other" },
    ],
  },
  {
    key: "firm_size",
    label: "Team size",
    type: "select",
    required: true,
    options: [
      { value: "11-25", label: "11–25 lawyers" },
      { value: "26-50", label: "26–50 lawyers" },
      { value: "51-100", label: "51–100 lawyers" },
      { value: "100+", label: "100+ lawyers" },
    ],
  },
  { key: "email", label: "Email", type: "email", placeholder: "you@organization.com", required: true },
];

const problems = [
  "Processes are not enforced across teams",
  "Case handling varies per team or department",
  "Visibility is fragmented across matters",
  "Errors and inconsistency multiply with volume",
];

export default function ScalePage() {
  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      <LandingNav />

      {/* Above the fold */}
      <section className="max-w-4xl mx-auto px-5 pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 items-start">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9A84C] mb-5">
              For larger organizations · 20+ lawyers
            </p>
            <h1 className="font-serif text-[clamp(28px,4.5vw,46px)] font-medium leading-[1.15] text-[#0C0F14] mb-5">
              Run legal operations without fragmentation
            </h1>
            <p className="text-base text-[#6B7A8D] leading-relaxed max-w-md">
              As volume increases, inconsistency compounds.
              Arbiter Legal enforces structure across every case — regardless of who handles it.
            </p>

            {/* System flow */}
            <div className="mt-10 mb-8">
              <SystemFlow steps={["Teams", "Unified Intake", "Arbiter Engine", "Standardized Outputs"]} />
            </div>

            {/* Positioning statement */}
            <div className="border-l-2 border-[#C9A84C] pl-5 mt-8">
              <p className="text-sm text-[#0C0F14] leading-relaxed font-medium">
                Arbiter Legal is not layered on top of your process.
              </p>
              <p className="text-sm text-[#6B7A8D] leading-relaxed mt-1">
                It becomes the structure your cases run through.
              </p>
            </div>

            {/* What breaks at scale */}
            <div className="mt-10">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0C0F14] mb-4">
                What breaks at scale
              </p>
              <ul className="space-y-2.5">
                {problems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#6B7A8D]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E05A5A] mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form card */}
          <div className="md:sticky md:top-20">
            <div className="bg-white rounded-2xl border border-[#E5E4DE] p-7 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-1">Early partners</p>
              <h2 className="font-serif text-xl font-medium text-[#0C0F14] mb-1">Request access</h2>
              <p className="text-xs text-[#6B7A8D] mb-5">
                Limited onboarding slots for early partners.
              </p>
              <WaitlistInlineForm fields={fields} source="scale" ctaLabel="Request Access" />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-5 text-center">
        <p className="text-xs text-[#9CA3AF]">© {new Date().getFullYear()} Arbiter Legal BV — <span className="text-[#C9A84C] font-serif">Less admin. Better practice.</span></p>
      </footer>
    </div>
  );
}
