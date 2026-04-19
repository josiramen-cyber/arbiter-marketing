"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";

export interface WaitlistField {
  key: string;
  label: string;
  type: "text" | "email" | "select";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface Props {
  fields: WaitlistField[];
  source: string;
  ctaLabel?: string;
}

export default function WaitlistInlineForm({ fields, source, ctaLabel = "Request Access" }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Follow-up step
  const [followUp, setFollowUp] = useState("");
  const [followUpLoading, setFollowUpLoading] = useState(false);
  const [followUpDone, setFollowUpDone] = useState(false);

  const set = (key: string, val: string) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source, language: "en" }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("No connection. Check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUp.trim()) { setFollowUpDone(true); return; }
    setFollowUpLoading(true);

    try {
      await fetch("/api/waitlist-followup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, follow_up: followUp, source }),
      });
    } catch {
      // non-blocking
    } finally {
      setFollowUpDone(true);
      setFollowUpLoading(false);
    }
  };

  if (submitted && followUpDone) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 rounded-full bg-[#2ECC8A]/12 flex items-center justify-center mx-auto mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#2ECC8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-serif text-xl font-medium text-[#0C0F14] mb-2">You're in.</p>
        <p className="text-sm text-[#6B7A8D]">Thank you. We'll be in touch when your access is ready.</p>
        <p className="font-serif text-[#C9A84C] font-medium mt-5 text-sm italic">Less admin. Better practice.</p>
      </div>
    );
  }

  if (submitted && !followUpDone) {
    return (
      <div className="space-y-5">
        <div className="text-center pb-4 border-b border-[#E5E4DE]">
          <div className="w-10 h-10 rounded-full bg-[#2ECC8A]/12 flex items-center justify-center mx-auto mb-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#2ECC8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-semibold text-[#0C0F14] text-sm">You're in. We'll reach out when your access is ready.</p>
        </div>

        <form onSubmit={handleFollowUp} className="space-y-3">
          <label className="block text-sm font-semibold text-[#0C0F14]">
            One quick question — what's the most frustrating part of your current workflow?
          </label>
          <textarea
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            placeholder="e.g. rebuilding context across tools, missed deadlines, no visibility..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-[#E5E4DE] text-sm text-[#0C0F14] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2ECC8A] transition-colors resize-none"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={followUpLoading}
              className="flex-1 bg-[#0C0F14] text-white text-sm font-semibold py-3 rounded-lg hover:bg-[#1a1f2e] transition-colors disabled:opacity-60"
            >
              {followUpLoading ? "Sending..." : "Share feedback"}
            </button>
            <button
              type="button"
              onClick={() => setFollowUpDone(true)}
              className="px-4 text-sm text-[#6B7A8D] hover:text-[#0C0F14] transition-colors"
            >
              Skip
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-start gap-2.5 bg-[#FEF2F2] border border-[#E05A5A]/30 rounded-lg px-4 py-3">
          <AlertCircle size={15} className="text-[#E05A5A] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-[#E05A5A]">{error}</p>
            <button type="button" onClick={() => setError(null)} className="text-xs font-semibold text-[#E05A5A] underline mt-1">
              Try again
            </button>
          </div>
        </div>
      )}

      {fields.map((f) => (
        <div key={f.key}>
          <label className="block text-xs font-semibold text-[#0C0F14] mb-1.5">
            {f.label}
            {f.required && <span className="text-[#E05A5A] ml-0.5">*</span>}
          </label>

          {f.type === "select" ? (
            <select
              required={f.required}
              value={values[f.key] ?? ""}
              onChange={(e) => set(f.key, e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#E5E4DE] text-sm text-[#0C0F14] focus:outline-none focus:border-[#2ECC8A] transition-colors bg-white"
            >
              <option value="">Select...</option>
              {f.options?.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          ) : (
            <input
              type={f.type}
              required={f.required}
              value={values[f.key] ?? ""}
              onChange={(e) => set(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="w-full px-4 py-3 rounded-lg border border-[#E5E4DE] text-sm text-[#0C0F14] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2ECC8A] transition-colors"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#2ECC8A] text-white text-sm font-semibold py-3.5 rounded-lg hover:bg-[#27b87a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
      >
        {loading && (
          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        )}
        {loading ? "Submitting..." : ctaLabel}
      </button>

      <p className="text-xs text-[#9CA3AF] text-center">
        Early users get priority onboarding and influence system design.
      </p>
    </form>
  );
}
