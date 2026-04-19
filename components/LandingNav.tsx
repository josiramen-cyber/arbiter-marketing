"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LandingNav() {
  return (
    <nav className="w-full border-b border-[#E5E4DE] bg-white/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.svg" alt="Arbiter Legal" width={26} height={26} />
          <span className="font-serif font-bold text-[15px] text-[#0C0F14]">Arbiter Legal</span>
        </Link>
        <Link
          href="/#cta"
          className="flex items-center gap-1.5 text-xs font-medium text-[#6B7A8D] hover:text-[#0C0F14] transition-colors"
        >
          <ArrowLeft size={13} />
          Back to site
        </Link>
      </div>
    </nav>
  );
}
